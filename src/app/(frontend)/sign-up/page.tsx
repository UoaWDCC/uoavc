import type { Metadata } from "next"
import { getPayload } from "payload"
import { CreateAccountForm } from "@/components"
import { CompletionStep } from "@/components/SignUpFlow/CompletionStep"
import { formatSessionDateShort } from "@/lib/dates"
import config from "@/payload.config"
import type { SocialSession } from "@/payload-types"

type SignUpPageProps = {
  searchParams: Promise<{ session?: string }>
}

// Without a session the route is the account sign-up form, so the title follows.
export async function generateMetadata({ searchParams }: SignUpPageProps): Promise<Metadata> {
  const { session } = await searchParams
  return { title: session ? "Sign Up" : "Create Account" }
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
        {session ? "Sign Up" : "Create Account"}
      </h1>

      {session ? (
        <>
          <h2 className="mt-6 text-center font-heading text-2xl text-brand-yellow uppercase sm:text-4xl">
            {formatSessionDateShort(session.date)} {session.title} sign-up
          </h2>

          {/* TODO(#124): render the important-information (#119) and
              registration-form (#121) steps before the completion step once
              the flow is assembled. */}
          <CompletionStep className="mt-20 w-full max-w-4xl" date={session.date} />
        </>
      ) : (
        <div className="mt-12 flex w-full flex-col items-center">
          <CreateAccountForm />
        </div>
      )}
    </main>
  )
}
