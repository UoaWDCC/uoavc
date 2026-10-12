"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/toast" // Just for testing, should swap for real toast import
import { logout, useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { NavArrow, NavLink, navItemClassName } from "./NavLink"

// Placeholder wording - happy to adjust
const MESSAGES = {
  success: "You've been logged out.",
  error: "We couldn't log you out. Please try again.",
}

/**
 * Works as a "Log-in" link when user is logged out, and "Log out" button when logged in.
 */
export function AuthNavItem({ className }: { className?: string }) {
  const auth = useAuth()
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleLogout() {
    setPending(true)
    const ok = await logout()
    setPending(false)

    if (!ok) {
      toast.error(MESSAGES.error)
      return
    }
    toast.success(MESSAGES.success)
    router.refresh()
  }

  if (auth.status === "loading") {
    return (
      // Reserve the space
      <span aria-hidden="true" className={cn("invisible", className)}>
        Login
      </span>
    )
  }

  if (auth.status === "unauthenticated") {
    return (
      <NavLink className={className} href="/log-in">
        Login
      </NavLink>
    )
  }

  return (
    <button
      className={cn(navItemClassName, "cursor-pointer disabled:opacity-60", className)}
      disabled={pending}
      onClick={handleLogout}
      type="button"
    >
      Log out
      <NavArrow />
    </button>
  )
}
