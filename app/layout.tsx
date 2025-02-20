import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProfileProvider } from "@/context/ProfileContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile Management",
  description: "Manage your business and personal information",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
