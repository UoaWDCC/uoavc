import type { PayloadHandler } from "payload"

export const socialSessionAvailability: PayloadHandler = async (req) => {
  const id = req.routeParams?.id as string | undefined

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 })
  }

  const session = await req.payload
    .findByID({
      collection: "social-sessions",
      id,
      req,
    })
    .catch(() => null)

  if (!session) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  const [registeredResult, waitlistedResult] = await Promise.all([
    req.payload.count({
      collection: "social-session-registrations",
      where: {
        and: [{ socialSession: { equals: id } }, { registrationStatus: { equals: "registered" } }],
      },
      req,
    }),
    req.payload.count({
      collection: "social-session-registrations",
      where: {
        and: [{ socialSession: { equals: id } }, { registrationStatus: { equals: "waitlisted" } }],
      },
      req,
    }),
  ])

  const registeredCount = registeredResult.totalDocs
  const waitlistCount = waitlistedResult.totalDocs

  const now = new Date()
  let registrationOpen = true
  let opensAt: string | null = null

  if (session.registrationOpenAt) {
    const openAt = new Date(session.registrationOpenAt)
    if (openAt > now) {
      registrationOpen = false
      opensAt = openAt.toISOString()
    }
  }

  if (registrationOpen && session.registrationCloseAt) {
    const closeAt = new Date(session.registrationCloseAt)
    if (closeAt < now) {
      registrationOpen = false
    }
  }

  let userStatus: "registered" | "waitlisted" | "not-registered" | null = null

  if (req.user?.collection === "users") {
    const userReg = await req.payload.find({
      collection: "social-session-registrations",
      where: {
        and: [
          { socialSession: { equals: id } },
          { user: { equals: req.user.id } },
          {
            registrationStatus: {
              in: ["registered", "waitlisted"],
            },
          },
        ],
      },
      limit: 1,
      req,
    })

    if (userReg.docs.length > 0) {
      const status = userReg.docs[0].registrationStatus
      userStatus = status === "registered" || status === "waitlisted" ? status : "not-registered"
    } else {
      userStatus = "not-registered"
    }
  }

  return Response.json({
    socialSessionId: id,
    maxCapacity: session.maxCapacity,
    registeredCount,
    spotsLeft: Math.max(0, session.maxCapacity - registeredCount),
    waitlistCapacity: session.waitlistCapacity,
    waitlistCount,
    registrationOpen,
    opensAt,
    userStatus,
  })
}
