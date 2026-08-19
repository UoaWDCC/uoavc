import Link from "next/link"

import { Faq } from "@/components/FAQ/FAQ"
import { Button } from "@/components/ui/button"

interface FaqItem {
  question: string
  answer: string
}

interface HomepageFaqProps {
  items: FaqItem[]
}

export default function HomepageFaq({ items }: HomepageFaqProps) {
  return (
    <section className="relative overflow-hidden bg-brand-white px-6 py-16 sm:px-8 xl:min-h-[820px] xl:px-0">
      <div className="pointer-events-none absolute top-0 right-0 hidden h-[333px] w-[572px] xl:block">
        <div className="absolute inset-0 bg-[#F8E4A8] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        <div className="absolute inset-0 bg-[#FADA7A] [clip-path:polygon(27%_0,100%_0,100%_73%)]" />
        <div className="absolute inset-0 bg-[#FBD45E] [clip-path:polygon(54%_0,100%_0,100%_48%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl pt-30 pb-30">
        <div className="xl:mx-auto xl:w-fit">
          <h2 className="mb-12 font-heading text-8xl text-brand-primary uppercase md:text-8xl xl:leading-none">
            FAQ
          </h2>

          <div className="grid gap-12 xl:grid-cols-[800px_257px] xl:gap-30">
            <div className="min-w-0">
              <div className="[&_[data-slot=accordion]]:!w-full [&_[data-slot=accordion]]:!px-0 [&_[data-slot=accordion-content]_div]:break-words">
                <Faq items={items} />
              </div>

              <div className="mt-6 flex justify-end">
                <Button asChild size="md" variant="primary">
                  <Link href="/faq">More questions &gt;</Link>
                </Button>
              </div>
            </div>

            <div className="max-w-[257px] text-brand-primary">
              <h3 className="mb-9 font-black text-xl uppercase">Still have questions?</h3>

              <p className="mb-6 text-sm leading-normal md:text-base">
                If there's anything we haven't covered that you would like to ask, please reach out!
              </p>

              <p className="text-sm leading-normal md:text-base">
                Message us through Email, Instagram, TikTok or Discord provided below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
