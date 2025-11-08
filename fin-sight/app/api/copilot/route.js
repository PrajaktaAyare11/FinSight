import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message, userId } = await req.json();

    // 1. Get last 30 days transactions (with account info)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Example inside route.js

// 1. Fetch last 30 days transactions
const transactions = await db.transaction.findMany({
  where: {
    date: {
      gte: new Date(new Date().setDate(new Date().getDate() - 30)),
    },
    account: {
      name: "Personal",  // hardcode or pass dynamically
    }, // or your account filter
  },
});

// 2. Compute stats
let totalIncome = 0;
let totalExpenses = 0;
let byCategory = {};

transactions.forEach((t) => {
  const amt = Number(t.amount); // ✅ convert Prisma Decimal -> JS number

  if (t.type === "INCOME") {
    totalIncome += amt;
  } else {
    totalExpenses += amt;
  }

  if (!byCategory[t.category]) {
    byCategory[t.category] = 0;
  }
  byCategory[t.category] += amt;
});

const stats = {
  totalIncome,
  totalExpenses,
  netSavings: totalIncome - totalExpenses,
  byCategory,
};

// 3. Pass stats into AI prompt


    // 4. Ask Gemini with context
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  
const prompt = `
You are my financial copilot. Analyze the past 30 days.

Financial data (last 30 days):
- Total Income: ₹${stats.totalIncome.toFixed(2)}
- Total Expenses: ₹${stats.totalExpenses.toFixed(2)}
- Net Savings: ₹${stats.netSavings.toFixed(2)}
- Expenses by category: ${JSON.stringify(stats.byCategory)}

Now provide insights and suggestions.
Please make them concise
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return new Response(JSON.stringify({ answer: response }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Copilot API error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
