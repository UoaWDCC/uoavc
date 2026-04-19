import type { CollectionConfig } from "payload"

export const EventRegistrations: CollectionConfig = {
  slug: "event-registrations",
  access: {
    read: ({ req }) => {
      const user = req.user

      if (!user) return false // Guests cannot read registrations
      if (user.collection === "admin") return true // Full access for admins
      if (user.collection === "users") {
        return {
          user: { equals: user.id }, // Regular users can only see own registrations
        }
      }
      return false
    },
    create: () => true,
    update: ({ req }) => {
      const user = req.user
      return !!user && user.collection === "admin" // Admins only
    },
    delete: ({ req }) => {
      const user = req.user
      return !!user && user.collection === "admin" // Admins only
    },
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create") {
          return {
            ...data,
            registeredAt: new Date().toISOString(),
          }
        }

        return data // Only set timestamp when record is first created
      },
    ],
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: false,
    },
    {
      name: "guestName",
      type: "text",
      required: false,
    },
    {
      name: "guestEmail",
      type: "text",
      required: false,
    },
    {
      name: "registrationStatus",
      type: "select",
      required: true,
      defaultValue: "registered",
      options: [
        {
          label: "Registered",
          value: "registered",
        },
        {
          label: "Waitlisted",
          value: "waitlisted",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
      ],
    },
    {
      name: "registeredAt",
      type: "date",
      required: true,
    },
    {
      name: "amountPaid",
      type: "number",
      required: false,
    },
    {
      name: "paymentStatus",
      type: "select",
      required: false,
      defaultValue: "free",
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Paid",
          value: "paid",
        },
        {
          label: "Free",
          value: "free",
        },
      ],
    },
  ],
}
