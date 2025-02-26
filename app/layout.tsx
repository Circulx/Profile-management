import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ProfileProvider } from "@/context/ProfileContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Profile Management",
  description: "Manage your business and personal information",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  )
}

