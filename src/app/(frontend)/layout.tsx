import { Inter, Staatliches } from "next/font/google"
import type React from "react"
import "./globals.css"
import { Footer, Navbar } from "@/components"

const staatliches = Staatliches({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-staatliches",
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${staatliches.variable} ${inter.variable} antialiased`} lang="en">
      <body className="flex min-h-screen flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
