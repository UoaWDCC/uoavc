import type { CollectionConfig } from "payload"

// Admin — authentication collection for club executives who manage the CMS.
// Separate from the Users collection (which is for regular club members).

export const Admin: CollectionConfig = {
  slug: "admin",
  admin: {
    useAsTitle: "email",
    description: "Club executive accounts with full CMS access.",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
