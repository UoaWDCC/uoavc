import type { CollectionConfig } from "payload"

// Executives — club committee profiles displayed on the executive team page.

export const Executives: CollectionConfig = {
  slug: "executives",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order", "updatedAt"],
    description: "Club executive profiles shown on the public Executive Team page.",
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.collection === "admin",
    update: ({ req }) => req.user?.collection === "admin",
    delete: ({ req }) => req.user?.collection === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Full name of the executive." },
    },
    {
      name: "role",
      type: "text",
      required: true,
      admin: {
        description: "Role title, e.g. 'President', 'Treasurer', 'Social Coordinator'.",
      },
    },
    {
      name: "bio",
      type: "textarea",
      required: false,
      admin: {
        description: "Short biography displayed on the executive's profile card.",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: { description: "Profile photo for the executive's card." },
    },
    {
      name: "order",
      type: "number",
      required: false,
      admin: {
        description: "Display order on the executive team page. Lower numbers appear first.",
      },
    },
  ],
}
