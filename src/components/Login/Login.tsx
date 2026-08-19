"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textbox } from "@/components/ui/textbox"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // actual sign-in logic
  }

  return (
    <div className="flex w-xl max-w-102 flex-col gap-6">
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
            <Button size="md" type="submit" variant="primary">
              Sign-in
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
