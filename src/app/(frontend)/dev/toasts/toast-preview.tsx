"use client"

import { useRouter } from "next/navigation"
import { useId, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textbox } from "@/components/ui/textbox"
import { showSignUpError } from "@/lib/toast"

const scenarios = [
  {
    label: "Already signed up this week (409)",
    message: "You have already signed up for a social session this week.",
    status: 409,
  },
  {
    label: "Sign-ups not open (400)",
    message: "Sign-ups for this session haven't opened yet.",
    status: 400,
  },
  {
    label: "Sign-ups closed (400)",
    message: "Sign-ups for this session have closed.",
    status: 400,
  },
  {
    label: "Already registered (409)",
    message: "You are already registered for this social session",
    status: 409,
  },
  {
    label: "Session and waitlist full (409)",
    message: "This social session and its waitlist are full",
    status: 409,
  },
  {
    label: "Waitlist available (409, no toast)",
    message: "This session is full, you can join the waitlist without payment.",
    status: 409,
    code: "WAITLIST_AVAILABLE",
  },
]

export function ToastPreview() {
  const router = useRouter()
  const fieldId = useId()
  const [name, setName] = useState("")
  const [scenario, setScenario] = useState("0")
  const [format, setFormat] = useState("payload")
  const [waitlistAvailable, setWaitlistAvailable] = useState(false)

  async function submitPreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.dismiss()
    const { message, status, code } = scenarios[Number(scenario)]
    const body =
      format === "payload" ? { errors: [{ message, data: { code } }] } : { error: message, code }
    const result = await showSignUpError(Response.json(body, { status }))
    setWaitlistAvailable(result === "waitlist")
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12 text-brand-primary">
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl">Toast preview</h1>
        <p>
          Development only. These buttons simulate responses without creating an account,
          registering for a session, or changing your login state.
        </p>
      </header>

      <Card className="items-stretch gap-5 border-2 border-brand-primary p-6 ring-0">
        <h2 className="font-heading text-2xl text-brand-primary">Login and logout</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast.success("You have successfully logged in.")}>
            Login success
          </Button>
          <Button onClick={() => toast.success("You have successfully logged out.")}>
            Logout success
          </Button>
          <Button
            onClick={() => toast.error("The email or password provided is incorrect.")}
            variant="tertiary"
          >
            Login error
          </Button>
          <Button
            onClick={() => toast.error("We couldn't log you out. Please try again.")}
            variant="tertiary"
          >
            Logout error
          </Button>
          <Button
            onClick={() => {
              toast.success("You have successfully logged out.")
              router.push("/log-in")
            }}
            variant="secondary"
          >
            Toast then navigate
          </Button>
        </div>
      </Card>

      <Card className="items-stretch gap-5 border-2 border-brand-primary p-6 ring-0">
        <h2 className="font-heading text-2xl text-brand-primary">Sign-up errors</h2>
        <form className="flex flex-col gap-5" onSubmit={submitPreview}>
          <label className="flex flex-col gap-2" htmlFor={`${fieldId}-name`}>
            Form answer (should remain after an error)
            <Textbox
              id={`${fieldId}-name`}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your first name"
              value={name}
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor={`${fieldId}-scenario`}>
            Response
            <select
              className="w-full rounded-xl border border-brand-primary bg-white p-3"
              id={`${fieldId}-scenario`}
              onChange={(event) => setScenario(event.target.value)}
              value={scenario}
            >
              {scenarios.map(({ label }, index) => (
                <option key={label} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2" htmlFor={`${fieldId}-format`}>
            API format
            <select
              className="w-full rounded-xl border border-brand-primary bg-white p-3"
              id={`${fieldId}-format`}
              onChange={(event) => setFormat(event.target.value)}
              value={format}
            >
              <option value="payload">Payload registration: errors[0].message</option>
              <option value="checkout">Checkout: error</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Complete sign-up</Button>
            <Button onClick={() => showSignUpError()} type="button" variant="tertiary">
              Network error
            </Button>
            <Button onClick={() => toast.dismiss()} type="button" variant="secondary">
              Dismiss all
            </Button>
          </div>
          {waitlistAvailable && (
            <output className="rounded-xl border-2 border-brand-yellow p-4">
              Waitlist handoff received. No error toast is shown; the registration flow (#167)
              should open its join-waitlist popup here. Your form answer is preserved.
            </output>
          )}
        </form>
      </Card>
    </div>
  )
}
