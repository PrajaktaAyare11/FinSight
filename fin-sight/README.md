# 💰 FinSight — AI-Powered Personal Finance Management System  

**An intelligent, automated finance management platform built with Next.js, Tailwind, and PostgreSQL.**  
Track expenses, visualize insights, automate recurring transactions, and get personalized financial advice powered by Gemini AI.

---

## 🌐 Live Demo  
> 🚀 **Deployed on Vercel**  
👉 [View Live Site](https://fin-sight-nwnk.vercel.app/)

---

## 🖼️ Project Preview  

### Landing page
<img width="1919" height="964" alt="image" src="https://github.com/user-attachments/assets/c3a90469-8499-47a5-9564-7ec44917e5e4" />

### 🏠 Dashboard (visible after logging in)
Visualize income, expenses, and category-wise spending using interactive charts.  
<img width="1908" height="954" alt="image" src="https://github.com/user-attachments/assets/fb94dfe8-5794-4228-abfd-e4a85f0da8b3" />
<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/df7902f1-007a-4455-96f4-ad841ae2163e" />

### Dashboard for individual accounts 
<img width="1915" height="863" alt="image" src="https://github.com/user-attachments/assets/f86013b7-56a4-4d74-848f-5baa33cc5c10" />
<img width="1699" height="868" alt="image" src="https://github.com/user-attachments/assets/4babcd24-a76e-40c9-9fae-5565ef5394db" />

### 📊 Budget Goals  
Set, track, and monitor your savings goals with real-time progress indicators.  
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/f4a8e706-7cf2-4516-a5ed-bd4f8214bad3" />

### 🧾 Creating Tranaction Page with OCR Receipt scanning and CSV uploads
Upload receipts and let Gemini AI automatically extract and categorize your transactions.  
<img width="1919" height="955" alt="image" src="https://github.com/user-attachments/assets/f33f83f8-962b-4907-bae3-782cbef1bcdf" />

### 🤖 AI Copilot  
Chat with an AI assistant to get personalized insights and budgeting tips.  
<img width="816" height="333" alt="image" src="https://github.com/user-attachments/assets/f5b57b4a-9f8e-451d-9b1d-b38edebb357a" />

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
