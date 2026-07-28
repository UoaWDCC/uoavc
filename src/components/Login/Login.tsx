"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const INPUT_STYLES = cn(
  "w-full rounded-2xl bg-white px-7 py-4 font-body text-xl text-brand-primary",
  "placeholder:text-brand-primary",
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
    <div className="flex w-full max-w-lg flex-col gap-8">
      <Card
        className="items-stretch gap-6 rounded-xl bg-brand-light-blue p-12 ring-0"
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
            <Link className="text-xl text-brand-primary hover:opacity-70" href="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center pt-2">
            <Button size="md" type="submit" variant="primary">
              Sign-in
            </Button>
          </div>
        </form>
      </Card>

      <p className="text-center text-xl text-brand-primary">
        Don&apos;t have an account?{" "}
        <Link className="font-bold hover:opacity-70" href="/sign-up">
          Create Account
        </Link>
      </p>
    </div>
  )
}
