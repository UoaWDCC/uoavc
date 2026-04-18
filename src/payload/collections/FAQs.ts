import type { CollectionConfig } from "payload"
import type { User } from "@/payload-types"

export const FAQs: CollectionConfig = {
  slug: "faqs",
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "richText",
      required: true,
    },
    {
      name: "order",
      type: "number",
      required: false,
    },
    {
      name: "published",
      type: "checkbox",
      required: true,
    },
  ],
  access: {
    read: () => ({
      published: {
        equals: true,
      },
    }),
    create: ({ req }) => (req.user as User | null)?.role === "admin",
    update: ({ req }) => (req.user as User | null)?.role === "admin",
    delete: ({ req }) => (req.user as User | null)?.role === "admin",
  },
}
