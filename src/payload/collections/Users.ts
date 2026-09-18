import type { CollectionConfig } from "payload"
import {
  AFFILIATION_OPTIONS,
  ETHNICITY_OPTIONS,
  FACULTY_OPTIONS,
  GENDER_OPTIONS,
  MERCH_INTEREST_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PLAY_INTEREST_OPTIONS,
} from "@/lib/memberOptions"

const isUoa = (data: Partial<{ affiliation: string }>) => data?.affiliation === "uoa"
const isNonUoa = (data: Partial<{ affiliation: string }>) =>
  Boolean(data?.affiliation) && data.affiliation !== "uoa"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    description: "Club member accounts used for social session registration.",
  },
  auth: {
    tokenExpiration: 43200,
  },
  access: {
    create: () => true,
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.collection === "admin") return true
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (req.user.collection === "admin") return true
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => req.user?.collection === "admin",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
      admin: { description: "Member's first name." },
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      admin: { description: "Member's last name." },
    },
    {
      name: "genderIdentity",
      type: "select",
      options: GENDER_OPTIONS,
      admin: { description: "Member's gender identity." },
    },
    {
      name: "ethnicity",
      type: "select",
      options: ETHNICITY_OPTIONS,
      admin: { description: "Member's ethnicity." },
    },
    {
      name: "affiliation",
      type: "select",
      options: AFFILIATION_OPTIONS,
      admin: {
        description:
          "Member's relationship to the University of Auckland. Decides which study fields apply.",
      },
    },
    {
      name: "studentId",
      type: "text",
      admin: {
        condition: isUoa,
        description: "University of Auckland student ID.",
      },
    },
    {
      name: "upi",
      type: "text",
      admin: {
        description: "University of Auckland UPI, if the member is a UoA student, staff or alumni.",
      },
    },
    {
      name: "faculty",
      type: "select",
      options: FACULTY_OPTIONS,
      admin: {
        condition: isUoa,
        description: "University of Auckland faculty.",
      },
    },
    {
      name: "currentlyStudying",
      type: "checkbox",
      admin: {
        condition: isNonUoa,
        description: "Whether a non-UoA member is currently studying.",
      },
    },
    {
      name: "studyDetails",
      type: "text",
      admin: {
        condition: isNonUoa,
        description: "Where and what a non-UoA member is studying.",
      },
    },
    {
      name: "phone",
      type: "text",
      admin: { description: "Contact phone number." },
    },
    {
      name: "hiwaMember",
      type: "checkbox",
      admin: { description: "Whether the member has a HIWA gym membership." },
    },
    {
      name: "refereeQualified",
      type: "checkbox",
      admin: { description: "Whether the member holds volleyball referee qualifications." },
    },
    {
      name: "playInterest",
      type: "select",
      options: PLAY_INTEREST_OPTIONS,
      admin: { description: "Interest in competitive or social volleyball." },
    },
    {
      name: "merchInterest",
      type: "select",
      options: MERCH_INTEREST_OPTIONS,
      admin: { description: "Interest in buying club merch." },
    },
    {
      name: "preferredActivities",
      type: "textarea",
      admin: {
        description: "Events or activities the member would like to see beyond social sessions.",
      },
    },
    {
      name: "paymentMethod",
      type: "select",
      options: PAYMENT_METHOD_OPTIONS,
      admin: { description: "How the member intends to pay their membership." },
    },
    {
      name: "acceptedCodeOfConduct",
      type: "checkbox",
      // Only enforced on sign-up so existing accounts can still be edited.
      validate: (value, { operation }) =>
        operation === "create" && value !== true
          ? "You must agree to the UOAVC Code of Conduct."
          : true,
      admin: { description: "Member agreed to the UOAVC Code of Conduct when signing up." },
    },
  ],
}
