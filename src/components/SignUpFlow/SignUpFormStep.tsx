"use client"

import { useEffect, useState } from "react"
import { type SignUpResult, SignupForm } from "@/components/SignUp/Signupform"
import type { SocialSession } from "@/payload-types"
import { CompletionStep } from "./CompletionStep"

type SignUpFormStepProps = {
  session: SocialSession
}

export function SignUpFormStep({ session }: SignUpFormStepProps) {
  const [result, setResult] = useState<SignUpResult | null>(null)

  // The form is long, so jump back up to show the completion step
  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0 })
    }
  }, [result])

  if (result) {
    return <CompletionStep className="w-full" date={session.date} status={result} />
  }

  return <SignupForm onSuccess={setResult} session={session} />
}
