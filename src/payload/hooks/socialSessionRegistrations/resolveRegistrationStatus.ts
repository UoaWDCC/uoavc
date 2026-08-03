import type { PayloadRequest, Where } from "payload"
import { APIError } from "payload"
import type { SocialSession } from "@/payload-types"

interface ResolveRegistrationStatusArgs {
  req: PayloadRequest
  sessionID: string
  /** Authenticated member ID, if any. */
  user?: string | null
  /** Guest contact email, for non-member registrations. */
  guestEmail?: string | null
}

interface ResolveRegistrationStatusResult {
  session: SocialSession
  registrationStatus: "registered" | "waitlisted"
}

// Shared pre-flight for social session registrations. Loads the parent session,
// rejects closed sessions and duplicate sign-ups, and decides whether the next
// registration is confirmed or waitlisted. Both the beforeChange hook and the
// Stripe checkout endpoint call this so capacity rules stay in one place - we do
// not want to take payment for a session the hook would then reject.
export async function resolveRegistrationStatus({
  req,
  sessionID,
  user,
  guestEmail,
}: ResolveRegistrationStatusArgs): Promise<ResolveRegistrationStatusResult> {
  const session = await req.payload.findByID({
    collection: "social-sessions",
    id: sessionID,
  })
  if (!session) {
    throw new APIError("Social session not found", 404)
  }
  if (session.status === "completed" || session.status === "cancelled") {
    throw new APIError("This social session is no longer accepting registrations", 400)
  }
  if (!user && !guestEmail) {
    throw new APIError("Registration must include a user or guest email", 400)
  }

  const whereUser: Where = user
    ? { user: { equals: user } }
    : { guestEmail: { equals: guestEmail } }
  const alreadyRegistered = await req.payload.count({
    collection: "social-session-registrations",
    where: {
      and: [
        { socialSession: { equals: sessionID } },
        { registrationStatus: { not_equals: "cancelled" } },
        whereUser,
      ],
    },
  })
  if (alreadyRegistered.totalDocs !== 0) {
    throw new APIError("You are already registered for this social session", 409)
  }

  const [registeredCount, waitlistCount] = await Promise.all([
    req.payload.count({
      collection: "social-session-registrations",
      where: {
        and: [
          { socialSession: { equals: sessionID } },
          { registrationStatus: { equals: "registered" } },
        ],
      },
    }),
    req.payload.count({
      collection: "social-session-registrations",
      where: {
        and: [
          { socialSession: { equals: sessionID } },
          { registrationStatus: { equals: "waitlisted" } },
        ],
      },
    }),
  ])

  if (registeredCount.totalDocs < session.maxCapacity) {
    return { session, registrationStatus: "registered" }
  }
  if (waitlistCount.totalDocs < session.waitlistCapacity) {
    return { session, registrationStatus: "waitlisted" }
  }
  throw new APIError("This social session and its waitlist are full", 409)
}
