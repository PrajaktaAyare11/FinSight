"use server";

import { parse } from "csv-parse/sync";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Decimal } from "@prisma/client/runtime/library";

// Auto category mapping (basic version)
const autoMapCategory = (desc = "") => {
  desc = desc.toLowerCase();
  if (desc.includes("salary")) return "Salary";
  if (desc.includes("rent")) return "Rent";
  if (desc.includes("grocery")) return "Groceries";
  return "Miscellaneous";
};

export async function previewCSV(formData) {
  const file = formData.get("file");
  if (!file) throw new Error("No file uploaded");

  const text = await file.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });

  return {
    rows: records.map((row) => ({
      type: row.type || "EXPENSE",
      amount: parseFloat(row.amount),
      description: row.description || "",
      date: row.date ? new Date(row.date).toISOString().split("T")[0] : "",
      category: row.category || autoMapCategory(row.description),
    })),
  };
}

export async function saveCSVTransactions(rows) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the user's default account
    const account = await db.account.findFirst({
      where: { userId },
    });

    if (!account) {
      throw new Error("No account found for this user.");
    }

    if (!rows || rows.length === 0) {
      return { success: false, error: "No rows to import" };
    }

    // 🔧 FIX 1: Simple duplicate detection (check if similar transactions exist recently)
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const recentTransactions = await db.transaction.findMany({
      where: {
        accountId: account.id,
        createdAt: { gte: oneMonthAgo }
      }
    });

    // Filter out likely duplicates
    const newRows = rows.filter(row => {
      return !recentTransactions.some(existing => 
        Math.abs(parseFloat(existing.amount) - parseFloat(row.amount)) < 0.01 &&
        existing.description?.toLowerCase().includes(row.description?.toLowerCase()) &&
        Math.abs(new Date(existing.date) - new Date(row.date)) < 24 * 60 * 60 * 1000 // same day
      );
    });

    if (newRows.length === 0) {
      return { success: false, error: "All transactions appear to be duplicates" };
    }

    // 🔧 FIX 2: Use database transaction for consistency
    const result = await db.$transaction(async (tx) => {
      // Create transactions
      await tx.transaction.createMany({
        data: newRows.map((row) => ({
          type: row.type,
          amount: parseFloat(row.amount), // Keep as is to avoid breaking existing code
          description: row.description,
          date: new Date(row.date),
          category: row.category,
          status: "COMPLETED",
          userId,
          accountId: account.id,
        })),
      });

      // 🔧 FIX 3: Update account balance
      const balanceChange = newRows.reduce((total, row) => {
        const amount = parseFloat(row.amount);
        return row.type === "INCOME" ? total + amount : total - amount;
      }, 0);

      // Get current balance and update
      const currentAccount = await tx.account.findUnique({
        where: { id: account.id }
      });
      
      await tx.account.update({
        where: { id: account.id },
        data: {
          balance: currentAccount.balance + balanceChange
        }
      });

      return { imported: newRows.length, skipped: rows.length - newRows.length };
    });

    return { 
      success: true, 
      message: `Imported ${result.imported} transactions, skipped ${result.skipped} duplicates` 
    };

  } catch (error) {
    console.error("CSV Save Error:", error);
    return { success: false, error: error.message };
  }
}