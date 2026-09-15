import type { Metadata } from "next"
import { getPayload } from "payload"
import { CompletionStep } from "@/components/SignUpFlow/CompletionStep"
import { formatSessionDateShort } from "@/lib/dates"
import config from "@/payload.config"
import type { SocialSession } from "@/payload-types"

export const metadata: Metadata = {
  title: "Sign Up",
}

type SignUpPageProps = {
  searchParams: Promise<{ session?: string }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { session: sessionId } = await searchParams

  let session: SocialSession | null = null
  if (sessionId) {
    const payload = await getPayload({ config: await config })
    session = await payload.findByID({
      collection: "social-sessions",
      id: sessionId,
      disableErrors: true,
    })
  }

  return (
    <main className="flex flex-col items-center px-6 py-20">
      <h1 className="text-center font-heading text-6xl text-brand-primary uppercase sm:text-8xl">
        Sign Up
      </h1>

      {session && (
        <>
          <h2 className="mt-6 text-center font-heading text-2xl text-brand-yellow uppercase sm:text-4xl">
            {formatSessionDateShort(session.date)} {session.title} sign-up
          </h2>

          {/* TODO(#124): render the important-information (#119) and
              registration-form (#121) steps before the completion step once
              the flow is assembled. */}
          <CompletionStep className="mt-20 w-full max-w-4xl" date={session.date} />
        </>
      )}
    </main>
  )
}
