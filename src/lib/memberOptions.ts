// Option lists shared by the Users collection and the Create Account form, so
// the values the form submits always match what Payload accepts.

export type MemberOption = {
  label: string
  value: string
}

export const GENDER_OPTIONS: MemberOption[] = [
  { label: "Woman", value: "woman" },
  { label: "Man", value: "man" },
  { label: "Non-binary", value: "non-binary" },
  { label: "Another identity", value: "another" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
]

export const ETHNICITY_OPTIONS: MemberOption[] = [
  { label: "European", value: "european" },
  { label: "Māori", value: "maori" },
  { label: "Pacific Peoples", value: "pacific" },
  { label: "Asian", value: "asian" },
  { label: "Middle Eastern, Latin American or African", value: "melaa" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
]

export const AFFILIATION_OPTIONS: MemberOption[] = [
  { label: "UoA student, staff or alumni", value: "uoa" },
  { label: "Student at AUT or another tertiary institution", value: "other-tertiary" },
  { label: "Not a student", value: "not-student" },
]

export const FACULTY_OPTIONS: MemberOption[] = [
  { label: "Arts and Education", value: "arts-education" },
  { label: "Business School", value: "business" },
  { label: "Creative Arts and Industries", value: "creative-arts" },
  { label: "Engineering and Design", value: "engineering-design" },
  { label: "Law", value: "law" },
  { label: "Medical and Health Sciences", value: "medical-health" },
  { label: "Science", value: "science" },
  { label: "Other", value: "other" },
]

export const PLAY_INTEREST_OPTIONS: MemberOption[] = [
  { label: "Competitive", value: "competitive" },
  { label: "Social", value: "social" },
  { label: "Both", value: "both" },
]

export const MERCH_INTEREST_OPTIONS: MemberOption[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Maybe", value: "maybe" },
]

export const PAYMENT_METHOD_OPTIONS: MemberOption[] = [
  { label: "Card", value: "card" },
  { label: "Cash", value: "cash" },
]

// Form-only: yes/no questions are stored as checkboxes on the collection.
export const YES_NO_OPTIONS: MemberOption[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
]
