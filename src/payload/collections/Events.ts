import type { CollectionConfig } from "payload"

// Events — display-only event cards. Sign-ups are handled externally via a
// Google Form linked from each card. For registrable on-site sessions with
// capacity, waitlist, and payment, see the SocialSessions collection.

type AdminCheckArgs = {
  req: {
    user?: {
      collection?: string
    } | null
  }
}

const isAdmin = ({ req }: AdminCheckArgs) => req.user?.collection === "admin"

const statusOptions = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
]

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "location", "status", "updatedAt"],
    description:
      "Display-only event cards. Sign-ups go to an external Google Form via googleFormUrl.",
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "Public-facing title of the event." },
    },
    {
      name: "description",
      type: "richText",
      required: true,
      admin: { description: "Full description shown on the event card." },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { description: "Date the event takes place." },
    },
    {
      name: "startTime",
      type: "text",
      required: true,
      admin: { description: "Start time, e.g. '7:00pm'." },
    },
    {
      name: "endTime",
      type: "text",
      admin: { description: "End time, e.g. '9:00pm'." },
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: { description: "Venue or address for the event." },
    },
    {
      name: "price",
      type: "number",
      min: 0,
      admin: { description: "Event price in NZD. Leave blank for a free event." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional cover image for the event card." },
    },
    {
      name: "googleFormUrl",
      type: "text",
      admin: {
        description: "External Google Form URL for sign-ups. Event card will link out to this URL.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "upcoming",
      options: statusOptions,
      admin: { description: "Lifecycle state of the event." },
    },
  ],
}
