"use client"

import { toast } from "sonner"

const SIGN_UP_ERROR = "We couldn't complete your sign-up. Please try again."

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function getPayloadError(body: Record<string, unknown>) {
  const firstError = Array.isArray(body.errors) ? body.errors[0] : undefined
  return isRecord(firstError) ? firstError : undefined
}

function getErrorMessage(body: unknown, fallback: string): string {
  if (!isRecord(body)) return fallback

  const message = getPayloadError(body)?.message ?? body.error

  return typeof message === "string" && message.trim() ? message : fallback
}

function isWaitlistAvailable(body: unknown): boolean {
  if (!isRecord(body)) return false

  const error = getPayloadError(body)
  const data = isRecord(error?.data) ? error.data : undefined
  return [body.code, error?.code, data?.code].includes("WAITLIST_AVAILABLE")
}

/** Supports Payload's errors[0].message and checkout's error response formats. */
export async function readApiErrorMessage(response: Response, fallback: string): Promise<string> {
  const body: unknown = await response.json().catch(() => null)
  return getErrorMessage(body, fallback)
}

/**
 * Call on a failed registration/checkout request, or without a response for a network error.
 * Returns "waitlist" without a toast so #167 can open its opt-in dialog instead.
 * This never resets the form or navigates away from the user's answers.
 */
export async function showSignUpError(response?: Response): Promise<"error" | "waitlist" | null> {
  if (response?.ok) return null

  const body: unknown = response ? await response.json().catch(() => null) : null
  const message = getErrorMessage(body, SIGN_UP_ERROR)

  // #147 introduces WAITLIST_AVAILABLE. Also support the current checkout API's
  // exact message until it lands. Other 409s must still show an error.
  if (
    response?.status === 409 &&
    (isWaitlistAvailable(body) ||
      message === "This session is full, you can join the waitlist without payment.")
  ) {
    return "waitlist"
  }

  toast.error(message)
  return "error"
}
