"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textbox } from "@/components/ui/textbox"
import { login } from "@/lib/auth"
import { getSafeRedirect } from "@/lib/safeRedirect"

// const MESSAGES = {
//   success: "You're logged in.",
//   invalidCredentials: "Incorrect email or password.",
//   error: "We couldn't log you in. Please try again.",
// }

export function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)

    const result = await login(email.trim(), password)

    if (!result.ok) {
      setSubmitting(false)
      // toast.error
      return
    }

    // toast.success(MESSAGES.success)
    const redirect = new URLSearchParams(window.location.search).get("redirect") // Avoids a Suspense boundary
    router.replace(getSafeRedirect(redirect, window.location.origin)) // Redirect back to homepage instead of login page
    router.refresh()
  }

  return (
    <div className="flex w-full max-w-102 flex-col gap-6">
      <Card
        className="items-stretch gap-6 rounded-xl border-2 border-brand-primary bg-transparent px-6 py-6 ring-0"
        size="default"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Textbox
            autoComplete="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
            type="email"
            value={email}
          />
          <Textbox
            autoComplete="current-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
            type="password"
            value={password}
          />

          <div className="flex justify-end">
            <Link
              className="text-base text-brand-primary opacity-80 transition-all duration-200 ease-in-out hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center pt-3">
            <Button disabled={submitting} size="md" type="submit" variant="primary">
              {submitting ? "Signing in..." : "Sign-in"}
            </Button>
          </div>
        </form>
      </Card>

      <p className="text-center text-base text-brand-primary opacity-80">
        Don&apos;t have an account?{" "}
        <Link
          className="font-semibold transition-all duration-200 ease-in-out hover:underline"
          href="/sign-up"
        >
          Create Account
        </Link>
      </p>
    </div>
  )
}
