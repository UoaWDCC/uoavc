"use client"

import { useEffect } from "react"
import { clearSignUpDraft } from "@/lib/signUpDraft"

// They've paid, so the saved answers can go
export function ClearSignUpDraft({ sessionId }: { sessionId: string }) {
  useEffect(() => {
    clearSignUpDraft(sessionId)
  }, [sessionId])

  return null
}
