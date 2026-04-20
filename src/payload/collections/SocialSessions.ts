import type { CollectionConfig } from "payload"

// SocialSessions — registrable weekly club sessions with capacity, waitlist,
// and member/non-member pricing. Registrations are made on-site through the
// SocialSessionRegistrations collection (planned) and can be paid via Stripe.

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
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
]

export const SocialSessions: CollectionConfig = {
  slug: "social-sessions",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "location", "maxCapacity", "status", "updatedAt"],
    description: "Weekly club social sessions with registration, capacity limits, and pricing.",
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
      admin: { description: "Public-facing title of the social session." },
    },
    {
      name: "description",
      type: "richText",
      required: true,
      admin: { description: "Full description shown on the social session page." },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { description: "Date the session takes place." },
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
      admin: { description: "Venue or address for the session." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional cover image for the session card." },
    },
    {
      name: "maxCapacity",
      type: "number",
      required: true,
      defaultValue: 40,
      admin: {
        description:
          "Maximum number of confirmed registrations before new sign-ups go to the waitlist.",
      },
    },
    {
      name: "waitlistCapacity",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        description:
          "Maximum number of waitlisted registrations. Set to 0 to disable the waitlist.",
      },
    },
    {
      name: "memberPrice",
      type: "number",
      admin: {
        description: "Price charged to authenticated club members. Leave blank for free.",
      },
    },
    {
      name: "nonMemberPrice",
      type: "number",
      admin: {
        description: "Price charged to guests (non-members). Leave blank for free.",
      },
    },
    {
      name: "registrationOpenAt",
      type: "date",
      admin: {
        description: "When registration opens. Registrations before this time are rejected.",
      },
    },
    {
      name: "registrationCloseAt",
      type: "date",
      admin: {
        description: "When registration closes. Registrations after this time are rejected.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "upcoming",
      options: statusOptions,
      admin: { description: "Lifecycle state of the session." },
    },
  ],
}
