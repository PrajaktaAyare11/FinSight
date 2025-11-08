import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import CopilotChatWrapper from "@/components/CopilotChatWrapper"; // ✅ import wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinSight",
  description: "Insights on your Finances",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="min-h-screen">{children}</main>

            {/* ✅ Chat bubble will show if logged in */}
            <CopilotChatWrapper />

            <Toaster richColors />
            <footer className="bg-blue-100 py-8">
              <div className="container mx-auto px-4 text-center">
                <p>Prajakta Ayare</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
