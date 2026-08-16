import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { getPayload } from "payload"

import { Hero } from "@/components/Hero/Hero"
import HomepageFaq from "@/components/HomepageFaq/HomepageFaq"
import UpcomingEvents from "@/components/UpcomingEvents/UpcomingEvents"
import config from "@/payload.config"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: "faqs",
    where: {
      published: {
        equals: true,
      },
    },
    sort: "order",
    limit: 3,
  })

  const faqItems = result.docs.map((faq) => ({
    question: faq.question,
    answer: convertLexicalToHTML({
      data: faq.answer as SerializedEditorState,
    }),
  }))

  return (
    <>
      <Hero />
      <UpcomingEvents />
      <HomepageFaq items={faqItems} />
    </>
  )
}
