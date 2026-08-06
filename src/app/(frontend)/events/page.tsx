import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events",
}

export default function EventsPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20">
      <h1 className="text-center font-heading text-6xl text-brand-primary uppercase tracking-wide sm:text-8xl">
        Events
      </h1>
    </main>
  )
}
