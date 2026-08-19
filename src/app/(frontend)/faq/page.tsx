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
    <main className="flex flex-col items-center gap-6 px-6 pt-12 pb-20">
      <h1 className="mb-0 text-center font-heading text-8xl text-brand-primary uppercase tracking-wide md:text-8xl">
        FAQ
      </h1>
      <p className="mb-16 max-w-lg text-center font-body text-brand-primary text-sm md:text-base">
        Answers to the questions we get asked most, so you know exactly what to expect and feel
        ready before you join us.
      </p>
      <FaqClient faqs={faqs} />
    </main>
  )
}
