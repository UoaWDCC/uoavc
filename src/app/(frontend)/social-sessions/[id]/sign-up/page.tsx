import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import { ImportantInformation } from "@/components"
import config from "@/payload.config"

export const metadata: Metadata = {
  title: "Sign Up",
}

const dayMonthFormatter = new Intl.DateTimeFormat("en-NZ", {
  day: "numeric",
  month: "numeric",
  timeZone: "UTC",
})

const weekdayFormatter = new Intl.DateTimeFormat("en-NZ", {
  weekday: "long",
  timeZone: "UTC",
})

export default async function SocialSessionSignUpPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const payload = await getPayload({ config: await config })

  // Bad ids throw in here too, not just missing ones
  const session = await payload.findByID({ collection: "social-sessions", id }).catch(() => null)

  if (!session) {
    notFound()
  }

  const date = new Date(session.date)
  const dayMonth = dayMonthFormatter.format(date)
  const weekday = weekdayFormatter.format(date)

  return (
    <main className="flex flex-col items-center px-6 pt-12 pb-32">
      <ImportantInformation
        continueHref={`/social-sessions/${id}/sign-up/form`}
        sessionLabel={`${dayMonth} ${weekday} Social Session Sign-up`}
      />
    </main>
  )
}
