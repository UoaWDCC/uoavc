import { ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type EventCardProps = {
  variant: "upcoming" | "past"
  name: string
  date: string
  image?: string
  href: string
}

export function EventCard({ variant, name, date, image, href }: EventCardProps) {
  const isPast = variant === "past"
  const headerBg = isPast ? "bg-brand-yellow" : "bg-brand-primary"
  const borderColor = isPast ? "border-brand-yellow" : "border-brand-primary"
  const titleText = isPast ? "text-secondary-foreground" : "text-white"
  const descText = isPast ? "text-secondary-foreground" : "text-white"
  const ctaLabel = isPast ? "view gallery" : "learn more"
  const ctaVariant = isPast ? "secondary" : "tertiary"

  return (
    <Card
      className={cn(
        "group hover:-translate-y-[8px] w-[200px] translate-y-0 gap-0 overflow-hidden rounded-xl border-2 bg-transparent p-0 transition-transform duration-500 ease-in-out",
        borderColor,
      )}
    >
      {/* Corners are clipped by the card's overflow-hidden, so the header only
          needs its own radius on the top edge. */}
      <CardHeader className={cn("rounded-none px-[11px] py-[11px]", headerBg)}>
        <CardTitle
          className={cn("font-black font-heading text-[34px] uppercase leading-none", titleText)}
        >
          {name}
        </CardTitle>
        <CardDescription className={cn("mt-[6px] text-[14px] leading-none", descText)}>
          <p>{date}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-hidden bg-transparent px-0">
        <div className="relative h-[150px] w-full bg-transparent">
          {image ? (
            <Image alt={name} className="object-cover" fill sizes="200px" src={image} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-background text-muted-foreground">
              <ImageIcon aria-hidden="true" className="h-6 w-6" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 ease-out group-focus-within:bg-brand-primary/15 group-focus-within:opacity-100 group-hover:bg-brand-primary/15 group-hover:opacity-100">
            <Button
              asChild
              className="pointer-events-auto h-[30px] rounded-[18px] px-4 py-[6px] text-[12px]"
              variant={ctaVariant}
            >
              <Link href={href}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
