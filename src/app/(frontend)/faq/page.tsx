import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html"
import type { Metadata } from "next"
import { getPayload } from "payload"
import config from "@/payload.config"
import FaqClient from "./faqclient"

export const metadata: Metadata = {
  title: "FAQ",
}

export default async function FaqPage() {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({ collection: "faqs", sort: "order" })
  const faqs = result.docs.map((faq) => ({
    question: faq.question,
    answer: convertLexicalToHTML({ data: faq.answer }),
    category: faq.category,
  }))

  return (
    <main className="flex flex-col items-center px-6 py-20">
      <h1 className="text-center mb-30 font-heading text-6xl text-brand-primary uppercase tracking-wide sm:text-8xl">
        FAQ
      </h1>
      <FaqClient faqs={faqs} />
    </main>
  )
}
