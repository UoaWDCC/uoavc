import type { CollectionBeforeChangeHook } from "payload"
import { APIError } from "payload"

export const handleCancellation: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (operation !== "update") return data // Skip if the operation is not update

  if (data.registrationStatus !== "cancelled") return data // Skip if data.registrationStatus is not 'cancelled'

  const user = req.user

  if (!user) {
    throw new APIError("You must be logged in to cancel a registration", 403)
  }

  if (user.collection === "admin") return data // Allow admins to cancel any registration

  let registrationUser: string | undefined
  if (typeof originalDoc.user === "string") {
    registrationUser = originalDoc.user
  } else {
    registrationUser = originalDoc.user?.id
  }

  if (registrationUser !== user.id) {
    throw new APIError("You are not allowed to cancel this registration", 403) // Only allow users to cancel their own registrations
  }

  return data
}
