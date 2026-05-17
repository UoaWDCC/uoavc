import { getPayload } from "payload"

import ExecCard from "@/components/ExecCard"
import config from "@/payload.config"

type ExecutiveCardData = {
  id: string
  role: string
  name: string
  degree?: string | null
  position?: string | null
  yearsOfExperience?: number | null
  photo?:
    | {
        url?: string | null
        alt?: string | null
      }
    | string
    | null
}

export default async function ExecutivesPage() {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: "executives",
    sort: "order",
    limit: 100,
  })

  const executives = result.docs as ExecutiveCardData[]

  return (
    <main className="min-h-screen bg-brand-light-grey px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading mb-10 text-center text-3xl text-brand-primary uppercase sm:text-4xl">
          Executive Team
        </h1>

        {executives.length === 0 ? (
          <p className="font-body text-center text-brand-primary text-lg">
            No executive profiles to display.
          </p>
        ) : (
          <div className="grid justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {executives.map((executive) => (
              <ExecCard
                degree={executive.degree}
                key={executive.id}
                name={executive.name}
                photo={executive.photo}
                position={executive.position}
                role={executive.role}
                yearsOfExperience={executive.yearsOfExperience}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
