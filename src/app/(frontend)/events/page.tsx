import type { Metadata } from "next"
import Link from "next/link"
import { getPayload } from "payload"
import { EventCard } from "@/components"
import { Button } from "@/components/ui/button"
import config from "@/payload.config"
import type { Event } from "@/payload-types"

export const metadata: Metadata = {
  title: "Events",
}

const EVENTS_PER_ROW = 3

const dateFormatter = new Intl.DateTimeFormat("en-NZ", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

function getImageUrl(image: Event["image"]) {
  return typeof image === "object" ? (image?.url ?? undefined) : undefined
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ past?: string }>
}) {
  const { past } = await searchParams
  const showAllPast = past === "all"

  const payload = await getPayload({ config: await config })

  const [upcoming, pastEvents] = await Promise.all([
    payload.find({
      collection: "events",
      where: { status: { equals: "upcoming" } },
      sort: "date",
      limit: EVENTS_PER_ROW,
    }),
    payload.find({
      collection: "events",
      where: { status: { equals: "completed" } },
      sort: "-date",
      // A limit of 0 tells Payload to return every matching doc.
      limit: showAllPast ? 0 : EVENTS_PER_ROW,
    }),
  ])

  return (
    <div className="flex flex-col items-center gap-8 bg-background px-6 py-6">
      <section className="flex flex-col items-center gap-6">
        <h1 className="mb-18 text-center font-heading text-[110px] text-brand-primary uppercase tracking-wide">
          Upcoming Events
        </h1>

        {upcoming.docs.length === 0 ? (
          <p className="text-center font-body text-brand-primary text-lg">
            No upcoming events right now — check back soon.
          </p>
        ) : (
          <div className="flex max-w-[982px] flex-wrap justify-center gap-8 md:justify-start">
            {upcoming.docs.map((event) => (
              <EventCard
                date={dateFormatter.format(new Date(event.date))}
                href={event.googleFormUrl || `/events/${event.id}`}
                image={getImageUrl(event.image)}
                key={event.id}
                name={event.title}
                variant="upcoming"
              />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col items-center gap-6">
        <h2 className="m-18 text-center font-heading text-[110px] text-brand-primary uppercase tracking-wide">
          Past Events
        </h2>

        {pastEvents.docs.length === 0 ? (
          <p className="text-center font-body text-brand-primary text-lg">
            No past events to display.
          </p>
        ) : (
          <div className="flex max-w-[982px] flex-wrap justify-center gap-8 md:justify-start">
            {pastEvents.docs.map((event) => (
              <EventCard
                date={dateFormatter.format(new Date(event.date))}
                href={event.googleFormUrl || `/events/${event.id}`}
                image={getImageUrl(event.image)}
                key={event.id}
                name={event.title}
                variant="past"
              />
            ))}
          </div>
        )}

        {!showAllPast && pastEvents.hasNextPage ? (
          <Button asChild className="mt-7 mb-18" size="md" variant="primary">
            <Link href="/events?past=all" scroll={false}>
              Load more
            </Link>
          </Button>
        ) : null}

        {showAllPast && pastEvents.docs.length > EVENTS_PER_ROW ? (
          <Button asChild className="mt-7 mb-18" size="md" variant="primary">
            <Link href="/events" scroll={false}>
              Show less
            </Link>
          </Button>
        ) : null}
      </section>
    </div>
  )
}
