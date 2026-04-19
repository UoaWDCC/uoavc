import type { CollectionConfig } from "payload"

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
      defaultValue: true,
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user?.collection === "admin") {
        return true
      }
      return { published: { equals: true } }
    },
    create: ({ req }) => req.user?.collection === "admin",
    update: ({ req }) => req.user?.collection === "admin",
    delete: ({ req }) => req.user?.collection === "admin",
  },
}
