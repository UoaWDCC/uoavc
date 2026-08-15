import type { CollectionConfig } from "payload"

// FAQs — frequently asked questions displayed on the public FAQ page.
// Published FAQs are visible to everyone; unpublished ones are admin-only.

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: {
    description: "Frequently asked questions shown on the public FAQ page.",
  },
  fields: [
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "general",
      options: [
        { label: "General", value: "general" },
        { label: "Sign-Up", value: "sign-up" },
      ],
      admin: {
        description:
          "Category of question, determines which category this FAQ displays under on the FAQ page",
      },
    },
    {
      name: "question",
      type: "text",
      required: true,
      admin: { description: "The question, shown as the FAQ entry heading." },
    },
    {
      name: "answer",
      type: "richText",
      required: true,
      admin: { description: "The answer, supports rich formatting and links." },
    },
    {
      name: "order",
      type: "number",
      required: false,
      admin: {
        description: "Display order on the FAQ page. Lower numbers appear first.",
      },
    },
    {
      name: "published",
      type: "checkbox",
      required: true,
      defaultValue: true,
      admin: {
        description: "If unchecked, this FAQ is hidden from the public and visible only to admins.",
      },
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
