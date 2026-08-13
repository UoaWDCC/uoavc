"use client"

import { useState } from "react"
import { Faq } from "../../../components/FAQ/FAQ"
import { TogglePillGroup } from "../../../components/TogglePillGroup/TogglePillGroup"

type ClientFaq = {
  question: string
  answer: string
  category: "general" | "sign-up"
}

export default function FaqClient({ faqs }: { faqs: ClientFaq[] }) {
  const [selected, setSelected] = useState("general")
  const selectedFaqs = faqs.filter((faq) => faq.category === selected)

  return (
    <div className="flex flex-col items-center gap-12 mb-8">
      <TogglePillGroup
        aria-label="FAQ"
        onChange={setSelected}
        options={[
          { label: "GENERAL", value: "general" },
          { label: "SIGN-UP", value: "sign-up" },
        ]}
        value={selected}
      />
      <Faq items={selectedFaqs} key={selected} />
    </div>
  )
}
