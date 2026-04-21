import type { CollectionConfig } from "payload"

// Media — uploaded images used across the site (event cards, executive
// headshots, social session covers, etc.).

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    description: "Uploaded images referenced by events, social sessions, and executives.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Alt text describing the image for screen readers and accessibility.",
      },
    },
  ],
  upload: true,
}
