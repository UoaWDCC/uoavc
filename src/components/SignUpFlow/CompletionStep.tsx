import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { SignUpResult } from "@/components/SignUp/Signupform"
import { Button } from "@/components/ui/button"
import { formatSessionDateLong } from "@/lib/dates"
import { cn } from "@/lib/utils"

// CompletionStep — step 3 of the social session sign-up flow. Confirms the
// registration (or waitlist spot), names the session date, and notes the
// confirmation email.

type CompletionStepProps = {
  /** ISO date of the social session registered for (`SocialSession["date"]`). */
  date: string
  status?: SignUpResult
  className?: string
}

export function CompletionStep({ date, status = "registered", className }: CompletionStepProps) {
  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className="font-heading text-4xl text-brand-primary uppercase sm:text-5xl">
        Complete&nbsp;!
      </h2>

      <hr className="mt-4 border-brand-yellow border-t-2" />

      <div className="mt-10 text-brand-primary text-sm md:text-base">
        {status === "waitlisted" ? (
          <>
            <p>Added to the waitlist!</p>
            <p>
              Keep an eye on your inbox for confirmation that you've made it into the social session
              on <strong>{formatSessionDateLong(date)}</strong>.
            </p>
          </>
        ) : (
          <>
            <p>Thank you for signing up!</p>
            <p>
              You will receive a confirmation email for your social session on{" "}
              <strong>{formatSessionDateLong(date)}</strong>.
            </p>
          </>
        )}
        <p className="mt-6">If you have any problems, please DM us via Instagram.</p>
      </div>

      <div className="mt-10 flex justify-end">
        <Button asChild size="md" variant="primary">
          <Link href="/">
            Back to home
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  )
}
