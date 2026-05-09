import type { CollectionBeforeChangeHook, Where } from "payload"
import { APIError } from "payload"

export const checkCapacity: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== "create") {
    return data
  }
  const sessionID =
    typeof data.socialSession === "string" ? data.socialSession : data.socialSession?.id
  if (!sessionID) {
    throw new APIError("socialSession is required", 400)
  }
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
  if (!data.user && !data.guestEmail) {
    throw new APIError("Registration must include a user or guest email", 400)
  }
  const whereUser: Where = data.user
    ? { user: { equals: data.user } }
    : { guestEmail: { equals: data.guestEmail } }
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
  const registeredCount = await req.payload.count({
    collection: "social-session-registrations",
    where: {
      and: [
        {
          socialSession: { equals: sessionID },
        },
        {
          registrationStatus: { equals: "registered" },
        },
      ],
    },
  })
  const waitlistCount = await req.payload.count({
    collection: "social-session-registrations",
    where: {
      and: [
        {
          socialSession: { equals: sessionID },
        },
        {
          registrationStatus: { equals: "waitlisted" },
        },
      ],
    },
  })
  if (registeredCount.totalDocs < session.maxCapacity) {
    data.registrationStatus = "registered"
  } else if (waitlistCount.totalDocs < session.waitlistCapacity) {
    data.registrationStatus = "waitlisted"
  } else {
    throw new APIError("This social session and its waitlist are full", 409)
  }
  return data
}
