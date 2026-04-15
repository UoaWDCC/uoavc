import type { CollectionConfig } from "payload"

export const Executives: CollectionConfig = {
  slug: "executives",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order", "updatedAt"],
  },
  access: {
    read: () => true,
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
