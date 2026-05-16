import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function HomePage() {
  return (
    <div>
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Question one?</AccordionTrigger>
          <AccordionContent>Answer one.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
