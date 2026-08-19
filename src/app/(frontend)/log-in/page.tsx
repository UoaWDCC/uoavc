import type { Metadata } from "next"

import { Login } from "@/components/"

export const metadata: Metadata = {
  title: "Log in",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100svh-82px)] flex-col items-center justify-center gap-12 px-6 pt-12 pb-28">
      <h1 className="text-center font-heading text-8xl text-brand-primary uppercase md:text-8xl">
        Login
      </h1>
      <Login />
    </div>
  )
}
