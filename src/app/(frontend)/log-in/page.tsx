import type { Metadata } from "next"

import { Login } from "@/components/"

export const metadata: Metadata = {
  title: "Log in",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-96px)] flex-col items-center gap-20 px-6 pt-20 pb-16">
      <h1 className="text-center font-heading text-9xl uppercase tracking-wide text-brand-primary">
        Login
      </h1>
      <Login />
    </main>
  )
}
