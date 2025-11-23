# 💰 FinSight — AI-Powered Personal Finance Management System  

**An intelligent, automated finance management platform built with Next.js, Tailwind, and PostgreSQL.**  
Track expenses, visualize insights, automate recurring transactions, and get personalized financial advice powered by Gemini AI.

---

## 🌐 Live Demo  
> 🚀 **Deployed on Vercel**  
👉 [View Live Site](https://fin-sight-nwnk.vercel.app/)

---

## 🖼️ Project Preview  

### 🏠 Dashboard  
Visualize income, expenses, and category-wise spending using interactive charts.  
![Dashboard Preview](public/screenshots/dashboard.png)

### 📊 Budget Goals  
Set, track, and monitor your savings goals with real-time progress indicators.  
![Budget Preview](public/screenshots/budget.png)

### 🧾 Receipt Scanner  
Upload receipts and let Gemini AI automatically extract and categorize your transactions.  
![Receipt OCR Preview](public/screenshots/receipt.png)

### 🤖 AI Copilot  
Chat with an AI assistant to get personalized insights and budgeting tips.  
![AI Copilot Preview](public/screenshots/copilot.png)

---

## ✨ Features  

- 🔐 **Modern Authentication:** Secure login/signup using Clerk.  
- 🧾 **AI Receipt Scanning:** Extract structured data from receipts with Gemini API (OCR).  
- 📈 **Interactive Dashboards:** Track monthly expenses, savings, and insights visually.  
- 🎯 **Goal-Based Budgeting:** Create, monitor, and evaluate financial goals.  
- 🔁 **Recurring Transactions:** Automate monthly rent, subscriptions, and financial reports.  
- 📬 **Smart Alerts:** Get email notifications when budgets cross thresholds (via Resend).  
- 🤖 **AI Copilot:** Receive personalized, data-driven financial advice using Gemini API.  
- 🧠 **Secure Architecture:** API protection with Arcjet to block malicious requests.  

---

## 🧠 Tech Stack  

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js 14 (App Router), React, Tailwind CSS |
| **Backend** | Node.js, Prisma ORM |
| **Database** | PostgreSQL (via Supabase) |
| **AI & Automation** | Gemini API (LLM + OCR), Inngest (Event Jobs), Resend (Emails) |
| **Auth & Security** | Clerk (Authentication), Arcjet (API Protection) |
| **Hosting** | Vercel |

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/fin-sight.git
cd fin-sight
