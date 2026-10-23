"use client"

import { useSyncExternalStore } from "react"

/**
 * Shared auth state for the current user.
 * Keeps track of who is logged in, so the Navbar, hamburger menu and login forms all show the same thing and update instantly.
 */

export type AuthUser = {
  id: string | number
  email: string
  firstName?: string
  lastName?: string
}

export type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: AuthUser }
  | { status: "unauthenticated" }

type UserResponse = { user?: AuthUser | null }

const LOADING: AuthState = { status: "loading" }
const LOGGED_OUT: AuthState = { status: "unauthenticated" }

let state: AuthState = LOADING
let loadStarted = false
// Goes up by 1 every time the state changes to catch mismacthes
let version = 0
const listeners = new Set<() => void>()

// Saves the new state and tells listening components to update
function commit(next: AuthState) {
  version++
  state = next
  for (const listener of listeners) listener()
}

// Function to ask the server who is logged in and save the answer
export async function refreshAuth(): Promise<AuthState> {
  const startedAt = version
  let next: AuthState = LOGGED_OUT

  try {
    const response = await fetch("/api/users/me", { credentials: "include", cache: "no-store" })
    const body = response.ok ? ((await response.json()) as UserResponse) : null
    if (body?.user) next = { status: "authenticated", user: body.user }
  } catch {
    // If theres a network error, show logged-out UI
  }

  // Check if the state is diffirent than when we started, if not save the answer
  if (startedAt === version) commit(next)
  return next
}

export type LoginResult = { ok: true } | { ok: false; reason: "invalid-credentials" | "error" }

// Function to log in and save the user
export async function login(email: string, password: string): Promise<LoginResult> {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      return { ok: false, reason: response.status === 401 ? "invalid-credentials" : "error" } // 401 error for invalid credentials
    }

    const body = (await response.json().catch(() => null)) as UserResponse | null
    if (body?.user) commit({ status: "authenticated", user: body.user })
    else await refreshAuth()
    return { ok: true }
  } catch {
    return { ok: false, reason: "error" }
  }
}

// Function to log out and save the user
export async function logout(): Promise<boolean> {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
    if (response.ok) {
      commit(LOGGED_OUT)
      return true
    }
    return (await refreshAuth()).status === "unauthenticated" // Even if server returns an error we want to refresh the auth state e.g. session expired
  } catch {
    return false
  }
}

// Function to subscribe to auth state changes
function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!loadStarted) {
    loadStarted = true
    void refreshAuth()
  }
  return () => {
    listeners.delete(listener) // Unsubscribe the listener when the component isn't needed
  }
}

// Hook to use the auth state in a component
export function useAuth(): AuthState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => LOADING, // While the page is pre-rendered on the server
  )
}
