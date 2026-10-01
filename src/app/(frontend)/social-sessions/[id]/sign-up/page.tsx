import type { Metadata } from "next"
import { ImportantInformation } from "@/components"
import { formatSessionDateShort, formatSessionWeekday } from "@/lib/dates"
import { getSocialSession } from "@/lib/socialSessions"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default async function SocialSessionSignUpPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getSocialSession(id)

  return (
    <main className="flex flex-col items-center px-6 pt-12 pb-32">
      <ImportantInformation
        continueHref={`/social-sessions/${id}/sign-up/form`}
        sessionLabel={`${formatSessionDateShort(session.date)} ${formatSessionWeekday(session.date)} Social Session Sign-up`}
      />
    </main>
  )
}
