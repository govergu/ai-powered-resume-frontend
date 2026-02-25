import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description: "Professional, modern AI-powered resume builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen w-full overflow-hidden bg-background max-w-[100vw]">
              <AppSidebar />
              <div className="flex flex-col flex-grow w-full max-w-full overflow-hidden">
                <AppHeader />
                <main className="flex-grow overflow-auto p-6 md:p-8">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    // </ClerkProvider>
  );
}
