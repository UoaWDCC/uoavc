import { getPayload } from "payload"

import ExecutivesGrid from "@/components/ExecutivesGrid/ExecutivesGrid"
import config from "@/payload.config"
import type { Executive } from "@/payload-types"

export default async function ExecutivesPage() {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: "executives",
    sort: "order",
    limit: 100,
  })

  const executives = result.docs as Executive[]

  return (
    <main className="min-h-screen bg-brand-light-grey px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-center font-heading text-3xl text-brand-primary uppercase sm:text-4xl">
          Executive Team
        </h1>

        <ExecutivesGrid executives={executives} />
      </div>
    </main>
  )
}
