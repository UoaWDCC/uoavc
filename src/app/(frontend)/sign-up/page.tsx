import type { Metadata } from "next"
import { CreateAccountForm } from "@/components"

export const metadata: Metadata = {
  title: "Create Account",
}

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20">
      <h1 className="text-center font-heading text-6xl text-brand-primary uppercase sm:text-8xl">
        Create Account
      </h1>

      <div className="mt-12 flex w-full flex-col items-center">
        <CreateAccountForm />
      </div>
    </main>
  )
}
