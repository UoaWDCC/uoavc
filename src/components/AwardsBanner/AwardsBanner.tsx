import { cn } from "@/lib/utils"

interface AwardsBannerProps {
  awards: string[]
  /** Seconds for one full loop. Lower is faster. */
  durationSeconds?: number
  className?: string
}

function AwardsTrack({ awards }: { awards: string[] }) {
  return (
    <ul className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24">
      {awards.map((award) => (
        <li className="whitespace-nowrap" key={award}>
          {award}
        </li>
      ))}
    </ul>
  )
}

export function AwardsBanner({ awards, durationSeconds = 30, className }: AwardsBannerProps) {
  if (awards.length === 0) return null

  return (
    <section aria-label="Club awards" className={cn("overflow-hidden bg-brand-yellow", className)}>
      <div
        className="flex w-max animate-marquee font-heading text-brand-primary text-2xl py-4 px-2 uppercase motion-reduce:animate-none md:text-5xl"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <AwardsTrack awards={awards} />
        {/* Duplicate track so the -50% translate loops seamlessly. */}
        <div aria-hidden="true">
          <AwardsTrack awards={awards} />
        </div>
      </div>
    </section>
  )
}
