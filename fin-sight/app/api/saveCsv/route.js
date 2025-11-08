
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { rows } = await req.json();
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), { status: 401 });
    }

    // 1️⃣ Find your app’s User using Clerk’s ID
    const user = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // 2️⃣ Find account for this user
    const account = await db.account.findFirst({
      where: { userId: user.id }, // user.id is the UUID
    });

    if (!account) {
      return new Response(JSON.stringify({ error: "No account found" }), { status: 400 });
    }

    // 3️⃣ Save transactions
    await db.transaction.createMany({
      data: rows.map((row) => ({
        ...row,
        date: new Date(row.date), 
        status: "COMPLETED",
        userId: user.id,
        accountId: account.id,
      })),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Save CSV Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
