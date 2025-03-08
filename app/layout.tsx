import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

// Optimize font loading
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Wireframe to Code",
  description: "Convert your wireframes to code automatically",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geist.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          <ErrorBoundary>
            {children}
            <Toaster position="top-center" richColors />
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
