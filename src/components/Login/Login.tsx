"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const INPUT_STYLES = cn(
  "w-full rounded-2xl border-2 border-brand-primary bg-white px-7 py-3 font-body text-2xl text-brand-primary",
  "placeholder:text-brand-primary",
  "transition-colors duration-200 ease-in-out",
  "hover:text-brand-light-blue hover:placeholder:text-brand-light-blue",
  "focus:text-brand-primary focus:placeholder:text-transparent",
)

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // actual sign-in logic
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Card
        className="items-stretch gap-6 rounded-xl border-3 border-brand-primary bg-transparent px-10 py-14 ring-0"
        size="default"
      >
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
            <Link
              className="text-2xl text-brand-primary hover:underline transition-all duration-200 ease-in-out"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center pt-5">
            <Button size="md" type="submit" variant="primary">
              Sign-in
            </Button>
          </div>
        </form>
      </Card>

      <p className="text-center text-2xl text-brand-primary">
        Don&apos;t have an account?{" "}
        <Link
          className="font-bold hover:underline transition-all duration-200 ease-in-out"
          href="/sign-up"
        >
          Create Account
        </Link>
      </p>
    </div>
  )
}
