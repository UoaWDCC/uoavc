import type { Metadata } from "next"

import { CreateAccountForm } from "@/components"

export const metadata: Metadata = {
  title: "Create Account",
}

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center gap-12 px-6 pt-12 pb-32">
      <h1 className="text-center font-heading text-6xl text-brand-primary uppercase sm:text-8xl">
        Create Account
      </h1>
      <CreateAccountForm />
    </main>
  )
}
