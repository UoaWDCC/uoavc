import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { getPayload } from "payload"

import { Hero } from "@/components/Hero/Hero"
import HomepageFaq from "@/components/HomepageFaq/HomepageFaq"
import SocialSessions from "@/components/SocialSessions/SocialSessions"
import { WhoWeAre } from "@/components/WhoWeAre/WhoWeAre"
import config from "@/payload.config"

export const dynamic = "force-dynamic"

const aucklandDateFormatter = new Intl.DateTimeFormat("en", {
  timeZone: "Pacific/Auckland",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

function formatAucklandDate(date: Date) {
  const parts = aucklandDateFormatter.formatToParts(date)
  let year = ""
  let month = ""
  let day = ""

  for (const part of parts) {
    if (part.type === "year") year = part.value
    if (part.type === "month") month = part.value
    if (part.type === "day") day = part.value
  }

  return `${year}-${month}-${day}`
}

export default async function HomePage() {
  const payload = await getPayload({ config: await config })
  const todayDate = formatAucklandDate(new Date())

  const [result, sessionResult] = await Promise.all([
    payload.find({
      collection: "faqs",
      where: {
        published: {
          equals: true,
        },
      },
      sort: "order",
      limit: 3,
    }),
    payload.find({
      collection: "social-sessions",
      where: { status: { equals: "upcoming" } },
      sort: "date",
      limit: 0,
    }),
  ])

  const sessions = sessionResult.docs.filter(
    (session) => formatAucklandDate(new Date(session.date)) >= todayDate,
  )

  const faqItems = result.docs.map((faq) => ({
    question: faq.question,
    answer: convertLexicalToHTML({
      data: faq.answer as SerializedEditorState,
    }),
  }))

  return (
    <>
      <Hero />
      <SocialSessions sessions={sessions} />
      <WhoWeAre />
      <HomepageFaq items={faqItems} />
    </>
  )
}
