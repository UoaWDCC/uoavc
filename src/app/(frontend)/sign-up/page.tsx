import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20">
      <h1 className="text-center font-heading text-6xl text-brand-primary uppercase sm:text-8xl">
        Sign Up
      </h1>
    </main>
  )
}
