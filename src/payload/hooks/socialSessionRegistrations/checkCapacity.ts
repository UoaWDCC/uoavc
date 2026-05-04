import type { CollectionBeforeChangeHook, Where } from "payload"

export const beforeChangeHook: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== "create") {
    return data
  }
  const sessionID = data.socialSession
  const session = await req.payload.findByID({
    collection: "social-sessions",
    id: sessionID,
  })
  if (!session) {
    throw new Error("Social session not found")
  }
  if (session.status === "completed" || session.status === "cancelled") {
    throw new Error("This social session is no longer accepting registrations")
  }
  const whereUser: Where = data.user
    ? { user: { equals: data.user } }
    : { guestEmail: { equals: data.guestEmail } }
  const alreadyRegistered = await req.payload.count({
    collection: "social-session-registrations",
    where: {
      and: [
        {
          socialSession: { equals: sessionID },
        },
        whereUser,
      ],
    },
  })
  if (alreadyRegistered.totalDocs !== 0) {
    throw new Error("You are already registered for this social session")
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
    throw new Error("This social session is full and its waitlist is full")
  }
  return data
}
