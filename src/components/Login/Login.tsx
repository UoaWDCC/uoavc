"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const INPUT_STYLES = cn(
  "w-full rounded-full bg-brand-light-grey px-6 py-3 font-body text-base text-brand-navy",
  "placeholder:text-brand-navy",
  "transition-colors duration-200 ease-out",
  "outline-none",
  "hover:text-brand-light-blue hover:placeholder:text-brand-light-blue",
  "focus:text-brand-light-blue focus:placeholder:text-brand-light-blue",
)

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // actual sign-in logic
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Card
        className="items-stretch gap-5 rounded-3xl bg-brand-light-blue p-8 ring-0"
        size="default"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            autoComplete="email"
            className={INPUT_STYLES}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
            type="email"
            value={email}
          />
          <input
            autoComplete="current-password"
            className={INPUT_STYLES}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
            type="password"
            value={password}
          />

          <div className="flex justify-end">
            <Link className="text-sm text-brand-navy hover:opacity-70" href="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center pt-2">
            <Button type="submit" variant="cta">
              Sign-in
            </Button>
          </div>
        </form>
      </Card>

      <p className="text-center text-sm text-brand-navy">
        Don&apos;t have an account?{" "}
        <Link className="font-bold hover:opacity-70" href="/sign-up">
          Create Account
        </Link>
      </p>
    </div>
  )
}
