import type { Metadata } from "next"
import { ClearSignUpDraft } from "@/components/SignUpFlow/ClearSignUpDraft"
import { CompletionStep } from "@/components/SignUpFlow/CompletionStep"
import { getSocialSession } from "@/lib/socialSessions"

export const metadata: Metadata = {
  title: "Checkout Successful",
}

export default async function CheckoutSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSocialSession(id)

  return (
    <main className="flex flex-col items-center px-6 pt-12 pb-32">
      <section className="flex w-full max-w-[1120px] flex-col">
        <CompletionStep date={session.date} />
        <ClearSignUpDraft sessionId={id} />
      </section>
    </main>
  )
}
