import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// These are placeholders for now, add the real links later
const REFUND_POLICY_URL = "#"
const HEALTH_AND_SAFETY_POLICY_URL = "#"
const CODE_OF_CONDUCT_URL = "#"

const policyLinkClass = "underline underline-offset-2 transition hover:no-underline"

const emphasisClass = "font-semibold tracking-normal"

type ImportantInformationProps = {
  sessionLabel: string
  continueHref: string
}

export function ImportantInformation({ continueHref, sessionLabel }: ImportantInformationProps) {
  return (
    <section className="flex w-full max-w-[1120px] flex-col">
      <h1 className="text-center font-heading text-7xl text-brand-primary uppercase sm:text-8xl">
        Sign-up
      </h1>

      <p className="mt-1 text-center font-heading text-brand-yellow text-xl uppercase sm:text-2xl">
        {sessionLabel}
      </p>

      <h2 className="mt-40 font-heading text-4xl text-brand-primary uppercase sm:text-[52px]">
        Important Information ***Please Read***
      </h2>

      <hr className="mt-10 border-brand-yellow border-t-2" />

      <div className="mt-18 space-y-10 font-body text-[20px] text-brand-primary leading-[1.5] tracking-[-0.019em]">
        <div>
          <p>Keep in mind:</p>

          <p>
            →{" "}
            <strong className={emphasisClass}>NO REFUNDS WILL BE ISSUED FOR CHANGE OF MIND</strong>,
            so please only sign up if you are sure you can attend. Please refer to the{" "}
            <Link className={policyLinkClass} href={REFUND_POLICY_URL}>
              Refund Policy
            </Link>{" "}
            for any further enquiries, or reach out to us via Instagram DM for clarification.
          </p>
        </div>

        <div>
          <p className={emphasisClass}>Please bear in mind these things:</p>

          <ul className="list-disc pl-8">
            <li>
              If you <strong className={emphasisClass}>DO NOT</strong> have a gym membership to
              enter the building, and show up late without any notice to the executive team, you
              will be considered a <strong className={emphasisClass}>NO-SHOW</strong>.
            </li>

            <li>
              <strong className={emphasisClass}>Safety:</strong> Respect safety guidelines,
              including warm-ups and avoiding reckless play (especially at the net) that can
              potentially harm yourself and/or others.
            </li>

            <li>
              <strong className={emphasisClass}>Etiquette:</strong> Be courteous and mindful of
              other players and equipment. You may be liable for any damages to any of the HIWA
              property, so PLEASE be mindful of the equipment.
            </li>

            <li>
              Refer to the{" "}
              <Link className={policyLinkClass} href={HEALTH_AND_SAFETY_POLICY_URL}>
                Health and Safety Policy
              </Link>{" "}
              for any further enquiries.
            </li>

            <li>
              <strong className={emphasisClass}>Setting up/Packing down:</strong> We have been
              instructed by HIWA to only allow executives of the club to help set up and pack down
              the nets. We appreciate that you want to help, unfortunately, as the equipment is new,
              the staff are very wary of any damage that could happen, so please be mindful of this.
            </li>
          </ul>
        </div>

        <div>
          <p className={emphasisClass}>There will be potential consequences if you:</p>

          <ul className="list-disc pl-8">
            <li>Try to sign up for both sessions in the same week</li>

            <li>
              Sign up for a session and do not pay in a timely manner or are caught using the same
              proof of payment
            </li>

            <li>Do not show up without notice before the session, and are a continuous no-show</li>
          </ul>
        </div>

        <p className={emphasisClass}>
          For any in-depth view of our policies and consequence, view our{" "}
          <Link className={policyLinkClass} href={CODE_OF_CONDUCT_URL}>
            Code of Conduct
          </Link>
        </p>
      </div>

      <div className="mt-32 flex flex-col items-center gap-7 sm:flex-row sm:justify-end">
        <p className="max-w-[440px] text-center font-semibold text-brand-primary tracking-[-0.019em] sm:text-right">
          By clicking continue, you are agreeing to have read and understand the statements above.
        </p>

        <Button asChild size="md" variant="primary">
          <Link href={continueHref}>
            Continue
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  )
}
