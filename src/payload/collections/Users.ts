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
      name: "upiOrEmail",
      type: "text",
    },
    {
      name: "membershipStatus",
      type: "select",
      options: [
        { label: "Member", value: "member" },
        { label: "Non-member", value: "non-member" },
      ],
      defaultValue: "non-member",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
  ],
}
