import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
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
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "upi",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
  ],
}
