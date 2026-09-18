"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ReactNode, useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textbox } from "@/components/ui/textbox"
import {
  ETHNICITY_OPTIONS,
  FACULTY_OPTIONS,
  GENDER_OPTIONS,
  MERCH_INTEREST_OPTIONS,
  type MemberOption,
  PAYMENT_METHOD_OPTIONS,
  PLAY_INTEREST_OPTIONS,
  YES_NO_OPTIONS,
} from "@/lib/memberOptions"
import { cn } from "@/lib/utils"

// This is a placeholder for now
const CODE_OF_CONDUCT_URL = "#"

const GENERIC_ERROR = "We couldn't create your account. Please try again."

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  genderIdentity: string
  ethnicity: string
  studentId: string
  upi: string
  faculty: string
  currentlyStudying: string
  studyDetails: string
  hiwaMember: string
  refereeQualified: string
  playInterest: string
  merchInterest: string
  preferredActivities: string
  paymentMethod: string
  acceptedCodeOfConduct: boolean
}

type TextKey = Exclude<keyof FormValues, "acceptedCodeOfConduct">
type FieldErrors = Partial<Record<keyof FormValues, string>>

type PayloadErrorResponse = {
  errors?: { message?: string; data?: { errors?: { message?: string }[] } }[]
}

const INITIAL_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  genderIdentity: "",
  ethnicity: "",
  studentId: "",
  upi: "",
  faculty: "",
  currentlyStudying: "",
  studyDetails: "",
  hiwaMember: "",
  refereeQualified: "",
  playInterest: "",
  merchInterest: "",
  preferredActivities: "",
  paymentMethod: "",
  acceptedCodeOfConduct: false,
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  const requireValue = (key: TextKey, message: string) => {
    if (!values[key].trim()) errors[key] = message
  }

  requireValue("firstName", "Enter your first name.")
  requireValue("lastName", "Enter your last name.")
  requireValue("email", "Enter your email.")
  requireValue("password", "Enter a password.")
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match."
  }
  requireValue("hiwaMember", "Let us know if you have a HIWA membership.")
  if (!values.acceptedCodeOfConduct) {
    errors.acceptedCodeOfConduct = "You must agree to the UOAVC Code of Conduct."
  }

  return errors
}

const optional = (value: string) => value.trim() || undefined
const yesNo = (value: string) => (value ? value === "yes" : undefined)

// Works out which of the two study sections the member filled in, since the
// form signposts them instead of asking for the affiliation directly.
function toAffiliation(values: FormValues) {
  if (values.studentId.trim() || values.upi.trim() || values.faculty) return "uoa"
  if (values.currentlyStudying === "yes") return "other-tertiary"
  if (values.currentlyStudying === "no") return "not-student"
  return undefined
}

// Maps form state onto the Users collection, dropping the study fields for
// whichever branch the member didn't fill in.
function toUserData(values: FormValues) {
  const affiliation = toAffiliation(values)
  const isUoa = affiliation === "uoa"

  return {
    email: values.email.trim(),
    password: values.password,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    genderIdentity: optional(values.genderIdentity),
    ethnicity: optional(values.ethnicity),
    affiliation,
    studentId: isUoa ? optional(values.studentId) : undefined,
    upi: isUoa ? optional(values.upi) : undefined,
    faculty: isUoa ? optional(values.faculty) : undefined,
    currentlyStudying: isUoa ? undefined : yesNo(values.currentlyStudying),
    studyDetails: isUoa ? undefined : optional(values.studyDetails),
    hiwaMember: yesNo(values.hiwaMember),
    refereeQualified: yesNo(values.refereeQualified),
    playInterest: optional(values.playInterest),
    merchInterest: optional(values.merchInterest),
    preferredActivities: optional(values.preferredActivities),
    paymentMethod: optional(values.paymentMethod),
    acceptedCodeOfConduct: values.acceptedCodeOfConduct,
  }
}

async function readErrorMessage(response: Response) {
  const body = (await response.json().catch(() => null)) as PayloadErrorResponse | null
  const error = body?.errors?.[0]
  return error?.data?.errors?.[0]?.message ?? error?.message ?? GENERIC_ERROR
}

export function CreateAccountForm() {
  const router = useRouter()
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const fieldId = useId()

  function setValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const bind = (key: TextKey) => ({
    id: `${fieldId}-${key}`,
    value: values[key],
    error: errors[key],
    onChange: (value: string) => setValue(key, value),
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFormError("Please fix the highlighted fields.")
      return
    }

    setFormError(null)
    setSubmitting(true)

    try {
      const createResponse = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toUserData(values)),
      })

      if (!createResponse.ok) {
        setFormError(await readErrorMessage(createResponse))
        setSubmitting(false)
        return
      }

      // Sign the new member straight in so they can register for sessions.
      const loginResponse = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email.trim(), password: values.password }),
      })

      router.push(loginResponse.ok ? "/" : "/log-in")
    } catch {
      setFormError(GENERIC_ERROR)
      setSubmitting(false)
    }
  }

  return (
    <Card
      className="w-full max-w-5xl items-stretch rounded-xl border-2 border-brand-primary bg-transparent px-6 py-10 ring-0 sm:px-12"
      size="default"
    >
      <form className="flex flex-col gap-16" noValidate onSubmit={handleSubmit}>
        <FormSection title="Personal Information">
          <FieldGrid>
            <TextField
              {...bind("firstName")}
              autoComplete="given-name"
              label="First name"
              placeholder="Enter your first name"
              required
            />
            <TextField
              {...bind("lastName")}
              autoComplete="family-name"
              label="Last name"
              placeholder="Enter your last name"
              required
            />
            <SelectField
              {...bind("genderIdentity")}
              label="Gender Identity"
              options={GENDER_OPTIONS}
              placeholder="Select gender"
            />
            <SelectField
              {...bind("ethnicity")}
              label="Ethnicity"
              options={ETHNICITY_OPTIONS}
              placeholder="Select your ethnicity"
            />
          </FieldGrid>

          <div className="flex flex-col gap-5 text-brand-primary text-sm">
            <p className="font-medium">
              Are you a current student or a recent alumni (up to 3 years) of the University of
              Auckland?*
            </p>
          </div>
        </FormSection>

        <FormSection
          note="*Only fill this section if you are a current or past ATTENDEE of the UNIVERSITY OF AUCKLAND"
          title="UoA Student, Staff, Alumni"
        >
          <FieldGrid>
            <TextField
              {...bind("studentId")}
              label="What is your Student ID?"
              placeholder="Student ID"
            />
            <TextField {...bind("upi")} label="What is your UPI?" placeholder="UPI / Login" />
            <SelectField
              {...bind("faculty")}
              label="What faculty are you a part of?"
              options={FACULTY_OPTIONS}
              placeholder="Select your faculty"
            />
          </FieldGrid>
        </FormSection>

        <FormSection
          note="*Only fill this section if you are NOT a current or past ATTENDEE of the UNIVERSITY OF AUCKLAND"
          title="Non-UoA Students and Community"
        >
          <FieldGrid>
            <SelectField
              {...bind("currentlyStudying")}
              label="Are you currently studying?"
              options={YES_NO_OPTIONS}
            />
            <TextField {...bind("studyDetails")} label="If yes, where and what are you studying?" />
          </FieldGrid>
        </FormSection>

        <FormSection title="General">
          <FieldGrid>
            <SelectField
              {...bind("hiwaMember")}
              label="Do you have HIWA membership?"
              options={YES_NO_OPTIONS}
              required
            />
            <SelectField
              {...bind("refereeQualified")}
              label="Do you have referee qualifications for volleyball?"
              options={YES_NO_OPTIONS}
            />
            <SelectField
              {...bind("playInterest")}
              label="Are you interested in competitive or social volleyball?"
              options={PLAY_INTEREST_OPTIONS}
            />
            <SelectField
              {...bind("merchInterest")}
              label="Would you be interested in buying club merch?"
              options={MERCH_INTEREST_OPTIONS}
            />
            <TextField
              {...bind("preferredActivities")}
              label="Other than the weekly social sessions and the mini-tournaments, what kind of event/activities would you like to see from the club?"
            />
          </FieldGrid>
        </FormSection>

        <FormSection title="Payment">
          <FieldGrid>
            <SelectField
              {...bind("paymentMethod")}
              label="Would you like to pay by card or cash?"
              options={PAYMENT_METHOD_OPTIONS}
            />
            <div className="text-brand-primary text-sm">
              <p className="font-medium">*If you are paying by cash:</p>
              <p>please give your cash payment to either:</p>
              <ol className="list-decimal pl-5">
                <li>one of the execs at the club expo stall</li>
                <li>to an exec when you come to one of the social sessions</li>
              </ol>
            </div>
          </FieldGrid>
        </FormSection>

        <FormSection title="Account Details">
          <FieldGrid>
            <TextField
              {...bind("email")}
              autoComplete="email"
              className="sm:col-span-2"
              label="Email"
              placeholder="Enter your email"
              required
              type="email"
            />
            <TextField
              {...bind("password")}
              autoComplete="new-password"
              label="Password"
              placeholder="Enter a password"
              required
              type="password"
            />
            <TextField
              {...bind("confirmPassword")}
              autoComplete="new-password"
              label="Confirm password"
              placeholder="Re-enter your password"
              required
              type="password"
            />
          </FieldGrid>
        </FormSection>

        <FormSection title="Terms & Conditions">
          <div className="text-brand-primary text-sm">
            <p>Refer to the UOAVC Code of Conduct:</p>
            <Link
              className="underline underline-offset-2 transition hover:no-underline"
              href={CODE_OF_CONDUCT_URL}
            >
              UOAVC Code of conduct.pdf
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-brand-primary text-sm">
              <input
                aria-describedby={
                  errors.acceptedCodeOfConduct
                    ? `${fieldId}-acceptedCodeOfConduct-error`
                    : undefined
                }
                aria-invalid={Boolean(errors.acceptedCodeOfConduct)}
                checked={values.acceptedCodeOfConduct}
                className="size-4 accent-brand-primary"
                name="acceptedCodeOfConduct"
                onChange={(event) => setValue("acceptedCodeOfConduct", event.target.checked)}
                type="checkbox"
              />
              I agree to the UOAVC Code of Conduct
            </label>
            <FieldError
              error={errors.acceptedCodeOfConduct}
              id={`${fieldId}-acceptedCodeOfConduct`}
            />
          </div>
        </FormSection>

        <div className="flex flex-col items-center gap-3">
          {formError && (
            <p className="text-center text-destructive text-sm" role="alert">
              {formError}
            </p>
          )}
          <Button disabled={submitting} size="md" type="submit" variant="primary">
            {submitting ? "Creating account..." : "Complete sign-up"}
          </Button>
        </div>
      </form>
    </Card>
  )
}

const FormSection = ({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: ReactNode
}) => {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-3xl text-brand-primary uppercase sm:text-4xl">{title}</h2>
        <hr className="mt-3 border-brand-yellow border-t-2" />
      </div>
      {note && <p className="text-brand-primary text-sm">{note}</p>}
      {children}
    </section>
  )
}

const FieldGrid = ({ children }: { children: ReactNode }) => {
  return <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">{children}</div>
}

type FieldProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  className?: string
}

const Field = ({
  id,
  label,
  required,
  error,
  className,
  children,
}: FieldProps & { children: ReactNode }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="font-medium text-brand-primary text-sm" htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      {children}
      <FieldError error={error} id={id} />
    </div>
  )
}

const FieldError = ({ id, error }: { id: string; error?: string }) => {
  if (!error) return null
  return (
    <p className="text-destructive text-sm" id={`${id}-error`}>
      {error}
    </p>
  )
}

type ControlProps = FieldProps & {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const TextField = ({
  value,
  onChange,
  placeholder = "Enter answer",
  type = "text",
  autoComplete,
  ...field
}: ControlProps & { type?: string; autoComplete?: string }) => {
  return (
    <Field {...field}>
      <Textbox
        aria-describedby={field.error ? `${field.id}-error` : undefined}
        aria-invalid={Boolean(field.error)}
        autoComplete={autoComplete}
        error={Boolean(field.error)}
        id={field.id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </Field>
  )
}

const SelectField = ({
  value,
  onChange,
  placeholder = "Select answer",
  options,
  ...field
}: ControlProps & { options: MemberOption[] }) => {
  return (
    <Field {...field}>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          aria-describedby={field.error ? `${field.id}-error` : undefined}
          aria-invalid={Boolean(field.error)}
          className={cn(field.error && "border-brand-yellow")}
          id={field.id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}
