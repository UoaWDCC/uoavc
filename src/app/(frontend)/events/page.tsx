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

// Three cards per row; "Load more" reveals another row.
const PAST_EVENTS_PAGE_SIZE = 3

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
  const pastPage = Math.max(1, Number.parseInt(past ?? "1", 10) || 1)

  const payload = await getPayload({ config: await config })

  const [upcoming, pastEvents] = await Promise.all([
    payload.find({
      collection: "events",
      where: { status: { equals: "upcoming" } },
      sort: "date",
      limit: 100,
    }),
    payload.find({
      collection: "events",
      where: { status: { equals: "completed" } },
      sort: "-date",
      limit: PAST_EVENTS_PAGE_SIZE * pastPage,
    }),
  ])

  return (
    <div className="flex flex-col items-center gap-8 bg-background px-6 py-6">
      <section className="flex flex-col items-center gap-6">
        <h1 className="mb-8 text-center font-heading text-4xl text-brand-primary uppercase tracking-wide sm:text-6xl lg:text-7xl">
          Upcoming Events
        </h1>

        {upcoming.docs.length === 0 ? (
          <p className="text-center font-body text-brand-primary text-lg">
            No upcoming events right now — check back soon.
          </p>
        ) : (
          <div className="flex max-w-[664px] flex-wrap justify-center gap-8">
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
        <h2 className="m-8 text-center font-heading text-4xl text-brand-primary uppercase tracking-wide sm:text-6xl lg:text-7xl">
          Past Events
        </h2>

        {pastEvents.docs.length === 0 ? (
          <p className="text-center font-body text-brand-primary text-lg">
            No past events to display.
          </p>
        ) : (
          <div className="flex max-w-[664px] flex-wrap justify-center gap-8">
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

        {pastEvents.hasNextPage ? (
          <Button asChild size="sm" variant="primary">
            <Link href={`/events?past=${pastPage + 1}`} scroll={false}>
              Load more
            </Link>
          </Button>
        ) : (
          <Button size="sm" variant="primary">
            Load more
          </Button>
        )}
      </section>
    </div>
  )
}
