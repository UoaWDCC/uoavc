import type { Access, CollectionConfig } from "payload"

type UserWithRole = {
  role?: string | null
}

const isAdmin: Access = ({ req }) => {
  const user = req.user as UserWithRole | null | undefined
  return user?.role === "admin"
}

export const Executives: CollectionConfig = {
  slug: "executives",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order", "updatedAt"],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      required: false,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "order",
      type: "number",
      required: false,
    },
  ],
}
