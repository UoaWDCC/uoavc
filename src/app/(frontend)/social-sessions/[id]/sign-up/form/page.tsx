import type { Metadata } from "next"
import { SignUpFormStep } from "@/components"
import { formatSessionDateShort, formatSessionWeekday } from "@/lib/dates"
import { getSocialSession } from "@/lib/socialSessions"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default async function SocialSessionSignUpFormPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getSocialSession(id)

  return (
    <main className="flex flex-col items-center px-6 pt-12 pb-32">
      <section className="flex w-full max-w-[1120px] flex-col">
        <h1 className="text-center font-heading text-7xl text-brand-primary uppercase sm:text-8xl">
          Sign-up
        </h1>

        <p className="mt-1 text-center font-heading text-brand-yellow text-xl uppercase sm:text-2xl">
          {formatSessionDateShort(session.date)} {formatSessionWeekday(session.date)} Social Session
          Sign-up
        </p>

        <div className="mt-20">
          <SignUpFormStep session={session} />
        </div>
      </section>
    </main>
  )
}
