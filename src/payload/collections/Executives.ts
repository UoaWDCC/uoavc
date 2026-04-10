import type { CollectionConfig } from "payload"

export const Executive: CollectionConfig = {
  slug: "executives",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "position",
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
