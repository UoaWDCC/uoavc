import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    tokenExpiration: 43200,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
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
      name: "email",
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
