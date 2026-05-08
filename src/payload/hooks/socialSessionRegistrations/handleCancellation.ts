import type { CollectionBeforeChangeHook } from "payload"
import { APIError, Forbidden } from "payload"

export const handleCancellation: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (operation !== "update") return data // Skip if the operation is not update

  const prev = originalDoc.registrationStatus
  const next = data.registrationStatus
  if (prev === next) return data

  const user = req.user
  if (!user) return data

  if (user.collection === "admin") return data // Allow admins to cancel any registration

  if (next !== "cancelled") {
    throw new Forbidden()
  }

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
