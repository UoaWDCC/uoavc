import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
  question: string
  answer: string
}

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="multiple">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            {/* comment below tells the linter to ignore the dangerouslySetInnerHTML */}
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: answer HTML is generated server-side from trusted CMS content */}
            <div dangerouslySetInnerHTML={{ __html: item.answer }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
