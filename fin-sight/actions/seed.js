"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

const ACCOUNT_ID = "20431036-313c-40a1-a1c8-4b25951cc249";
const USER_ID = "daa48fde-40a8-41c9-9180-1c6d7567ebd0";

// Categories with rupee-style realistic amount ranges + frequencies
const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [60000, 80000], frequency: "monthly" },
    { name: "freelance", range: [10000, 25000], frequency: "weekly" },
    { name: "investments", range: [2000, 15000], frequency: "monthly" },
    { name: "other-income", range: [1000, 8000], frequency: "monthly" },
  ],
  EXPENSE: [
    { name: "housing", range: [20000, 25000], frequency: "monthly" },
    { name: "transportation", range: [20, 100], frequency: "daily" },
    { name: "groceries", range: [2000, 3000], frequency: "weekly" },
    { name: "utilities", range: [1500, 5000], frequency: "monthly" },
    { name: "entertainment", range: [300, 1500], frequency: "weekly" },
    { name: "food", range: [100, 2000], frequency: "daily" },
    { name: "shopping", range: [500, 6000], frequency: "weekly" },
    { name: "healthcare", range: [1000, 5000], frequency: "monthly" },
    { name: "education", range: [5000, 20000], frequency: "monthly" },
    { name: "travel", range: [10000, 60000], frequency: "quarterly" },
  ],
};

function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to decide if a transaction should occur today based on its frequency
function shouldOccurToday(frequency, dayIndex) {
  switch (frequency) {
    case "daily":
      return Math.random() < 0.6; // 60% chance
    case "weekly":
      return dayIndex % 7 === 0 && Math.random() < 0.8;
    case "monthly":
      return dayIndex % 30 === 0; // once a month
    case "quarterly":
      return dayIndex % 90 === 0; // once in 3 months
    default:
      return false;
  }
}

export async function seedTransactions() {
  try {
    const transactions = [];
    let totalBalance = 0;

    // Generate 90 days of transactions
    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Go through each category and decide if it happens today
      for (const type of ["INCOME", "EXPENSE"]) {
        for (const cat of CATEGORIES[type]) {
          if (shouldOccurToday(cat.frequency, i)) {
            const amount = getRandomAmount(cat.range[0], cat.range[1]);
            const transaction = {
              id: crypto.randomUUID(),
              type,
              amount,
              description: `${
                type === "INCOME" ? "Received" : "Paid for"
              } ${cat.name}`,
              date,
              category: cat.name,
              status: "COMPLETED",
              userId: USER_ID,
              accountId: ACCOUNT_ID,
              createdAt: date,
              updatedAt: date,
            };

            totalBalance += type === "INCOME" ? amount : -amount;
            transactions.push(transaction);
          }
        }
      }
    }

    // Save to DB
    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({ where: { accountId: ACCOUNT_ID } });
      await tx.transaction.createMany({ data: transactions });
      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });
    });

    return {
      success: true,
      message: `Created ${transactions.length} smart transactions with realistic frequencies and rupee ranges`,
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: error.message };
  }
}
