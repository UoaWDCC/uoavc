import type { CollectionConfig } from "payload"
import { checkCapacity } from "../hooks/socialSessionRegistrations/checkCapacity"
import { handleCancellation } from "../hooks/socialSessionRegistrations/handleCancellation"

// SocialSessionRegistrations — on-site registrations for a social session.
// Members register via their authenticated account; guests register with a
// name and email. Capacity, waitlist, and pricing are defined on the parent
// SocialSessions record and enforced in hooks (planned in separate tickets).

export const SocialSessionRegistrations: CollectionConfig = {
  slug: "social-session-registrations",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["socialSession", "user", "registrationStatus", "registeredAt"],
    description: "Member and guest registrations for social sessions.",
  },
  access: {
    read: ({ req }) => {
      const user = req.user

      if (!user) return false
      if (user.collection === "admin") return true
      if (user.collection === "users") {
        return {
          user: { equals: user.id },
        }
      }
      return false
    },
    create: () => true,
    update: ({ req }) => {
      const user = req.user
      if (!user) return false
      if (user.collection === "admin") return true
      return {
        user: { equals: user.id }, // (FIX) Allow updates if the registration belongs to the user
      }
    },
    delete: ({ req }) => {
      const user = req.user
      return !!user && user.collection === "admin"
    },
  },
  hooks: {
    beforeChange: [
      handleCancellation,
      ({ data, operation, req }) => {
        if (operation === "create") {
          if (req.user?.collection === "users") {
            data.user = req.user.id
          }
          return {
            ...data,
            registeredAt: new Date().toISOString(),
          }
        }

        return data
      },
      checkCapacity,
    ],
  },
  fields: [
    {
      name: "socialSession",
      type: "relationship",
      relationTo: "social-sessions",
      required: true,
      access: {
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: { description: "The social session being registered for." },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: false,
      access: {
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: {
        description: "Authenticated member, if any. Left blank for guest registrations.",
      },
    },
    {
      name: "guestName",
      type: "text",
      required: false,
      access: {
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: { description: "Full name for guest (non-member) registrations." },
    },
    {
      name: "guestEmail",
      type: "text",
      required: false,
      access: {
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: { description: "Contact email for guest (non-member) registrations." },
    },
    {
      name: "registrationStatus",
      type: "select",
      required: true,
      defaultValue: "registered",
      options: [
        { label: "Registered", value: "registered" },
        { label: "Waitlisted", value: "waitlisted" },
        { label: "Cancelled", value: "cancelled" },
      ],
      admin: { description: "Current state of this registration." },
    },
    {
      name: "registeredAt",
      type: "date",
      required: true,
      access: {
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: { description: "Timestamp the registration was created." },
    },
    {
      name: "amountPaid",
      type: "number",
      required: false,
      access: {
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: { description: "Amount paid (NZD). Null for free or pending registrations." },
    },
    {
      name: "paymentStatus",
      type: "select",
      required: false,
      defaultValue: "free",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Free", value: "free" },
      ],
      access: {
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: { description: "Payment state for paid social sessions." },
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      required: false,
      access: {
        read: ({ req }) => req.user?.collection === "admin",
        update: ({ req }) => req.user?.collection === "admin",
      },
      admin: {
        description:
          "Stripe Checkout Session ID used to reconcile webhook events to this registration.",
        readOnly: true,
      },
    },
  ],
}
