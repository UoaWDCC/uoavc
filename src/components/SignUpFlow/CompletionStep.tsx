import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatSessionDateLong } from "@/lib/dates"
import { cn } from "@/lib/utils"

// CompletionStep — step 3 of the social session sign-up flow. Confirms the
// registration, names the session date, and notes the confirmation email.
// Step orchestration (intro -> form -> complete) is assembled in #124.

type CompletionStepProps = {
  /** ISO date of the social session registered for (`SocialSession["date"]`). */
  date: string
  className?: string
}

export function CompletionStep({ date, className }: CompletionStepProps) {
  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className="font-heading text-4xl text-brand-primary uppercase sm:text-5xl">
        Complete&nbsp;!
      </h2>

      <hr className="mt-4 border-brand-yellow border-t-2" />

      <div className="mt-10 text-brand-primary text-sm md:text-base">
        <p>Thank you for signing up!</p>
        <p>
          You will receive a confirmation email for your social session on{" "}
          <strong>{formatSessionDateLong(date)}</strong>.
        </p>
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
