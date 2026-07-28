import type { Metadata } from "next"

import { Login } from "@/components/"

export const metadata: Metadata = {
  title: "Log in",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-16">
      <Login />
    </main>
  )
}
