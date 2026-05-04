import type { CollectionConfig } from "payload"

// Users — authentication collection for regular club members who register
// through the website frontend. Members cannot access the CMS; for that see
// the Admin collection.

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    description: "Club member accounts used for social session registration.",
  },
  auth: {
    tokenExpiration: 43200,
  },
  access: {
    create: () => true,
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.collection === "admin") return true
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (req.user.collection === "admin") return true
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => req.user?.collection === "admin",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
      admin: { description: "Member's first name." },
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      admin: { description: "Member's last name." },
    },
    {
      name: "upi",
      type: "text",
      admin: {
        description: "University of Auckland UPI, if the member is a UoA student.",
      },
    },
    {
      name: "phone",
      type: "text",
      admin: { description: "Contact phone number." },
    },
  ],
}
