import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "./ReduxProvider";
import "./globals.css";
import 'react-tooltip/dist/react-tooltip.css'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poststack",
  description: "This is nextjs assessment task, built with App Router.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <header className="header">
            <img src="/img/poststack-logo.png" alt="" />
            <h1>POSTSTACK</h1>
          </header>

          <main className="children-div">
            <div className="container">
              {children}
            </div>
          </main>

          <footer className="footer">
            © Copyright 2025 Poststack | All Rights Reserved.
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
