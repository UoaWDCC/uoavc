import type { CollectionConfig } from "payload"

// CompTeams — competitive squads (e.g. UOAVC Mens, UOAVC Womens) shown on the
// About page's Comp Team tab. Each document is one squad: its team photo, coach
// credit, and full player roster. The roster lives here as an array rather than
// in its own collection so a squad's photo, coach, and players stay editable on
// a single admin screen.

export const CompTeams: CollectionConfig = {
  slug: "comp-teams",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "coach", "order", "updatedAt"],
    description: "Competitive squads and their rosters, shown on the public About page.",
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
      admin: { description: "Squad name, e.g. 'UOAVC Mens'." },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: { description: "Team photo shown above the roster." },
    },
    {
      name: "coach",
      type: "text",
      required: false,
      admin: {
        description: "Coach's name. Displayed under the roster as 'Coached by <name>'.",
      },
    },
    {
      name: "players",
      type: "array",
      required: false,
      labels: { singular: "Player", plural: "Players" },
      admin: {
        description: "Squad roster, listed in the order set here.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          admin: { description: "Player name as displayed, e.g. 'C. Kevin'." },
        },
        {
          name: "position",
          type: "text",
          required: true,
          admin: { description: "Playing position, e.g. 'Setter', 'Outside', 'Libero'." },
        },
      ],
    },
    {
      name: "order",
      type: "number",
      required: false,
      admin: {
        description: "Display order on the About page. Lower numbers appear first.",
      },
    },
  ],
}
