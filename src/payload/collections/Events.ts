import type { CollectionConfig } from "payload"

type AdminCheckArgs = {
  req: {
    user?: {
      collection?: string
    } | null
  }
}

const isAdmin = ({ req }: AdminCheckArgs) => req.user?.collection === "admin"

const eventTypeOptions = [
  { label: "Social Session", value: "social-session" },
  { label: "Event", value: "event" },
]

const statusOptions = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
]

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventType", "date", "location", "status", "updatedAt"],
  },
  access: {
    // Anyone can see events, only admins can add, edit, or remove them
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
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "eventType",
      type: "select",
      required: true,
      options: eventTypeOptions,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "startTime",
      type: "text",
      required: true,
    },
    {
      name: "endTime",
      type: "text",
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "maxCapacity",
      type: "number",
      required: true,
    },
    {
      name: "waitlistCapacity",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "memberPrice",
      type: "number",
    },
    {
      name: "nonMemberPrice",
      type: "number",
    },
    {
      name: "registrationOpenAt",
      type: "date",
    },
    {
      name: "registrationCloseAt",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "upcoming",
      options: statusOptions,
    },
  ],
}
