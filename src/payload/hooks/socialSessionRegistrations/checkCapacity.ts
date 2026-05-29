import type { CollectionBeforeChangeHook } from "payload"
import { APIError } from "payload"
import sendRegistrationConfirmation from "@/lib/email/registrationConfirmation"
import { resolveRegistrationStatus } from "./resolveRegistrationStatus"

export const checkCapacity: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
  context,
}) => {
  if (operation !== "create") {
    return data
  }
  const sessionID =
    typeof data.socialSession === "string" ? data.socialSession : data.socialSession?.id
  if (!sessionID) {
    throw new APIError("socialSession is required", 400)
  }

  const { session, registrationStatus } = await resolveRegistrationStatus({
    req,
    sessionID,
    user: typeof data.user === "string" ? data.user : data.user?.id,
    guestEmail: data.guestEmail,
  })
  data.registrationStatus = registrationStatus

  // Paid registrations are created in a "pending" state by the Stripe checkout
  // endpoint; their confirmation email fires on payment success instead, so the
  // endpoint sets this flag to suppress the email here.
  if (context?.skipConfirmationEmail) {
    return data
  }

  let recipientEmail: string | undefined
  if (data.user) {
    const userID = typeof data.user === "string" ? data.user : data.user.id
    try {
      const user = await req.payload.findByID({ collection: "users", id: userID })
      recipientEmail = user.email
    } catch {
      recipientEmail = undefined
    }
  } else if (data.guestEmail) {
    recipientEmail = data.guestEmail
  }

  if (recipientEmail) {
    await sendRegistrationConfirmation({
      to: recipientEmail,
      sessionTitle: session.title,
      sessionDate: new Date(session.date).toLocaleDateString("en-NZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      sessionTime: `${session.startTime} - ${session.endTime}`,
      sessionLocation: session.location,
      isWaitlisted: data.registrationStatus === "waitlisted",
    })
  }

  return data
}
