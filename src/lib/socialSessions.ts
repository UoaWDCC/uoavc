import { notFound } from "next/navigation"
import { getPayload } from "payload"
import { cache } from "react"
import config from "@/payload.config"

// Bad ids throw in findByID too, not just missing ones, so both end up as a 404
export const getSocialSession = cache(async (id: string) => {
  const payload = await getPayload({ config: await config })
  const session = await payload.findByID({ collection: "social-sessions", id }).catch(() => null)

  if (!session) {
    notFound()
  }

  return session
})
