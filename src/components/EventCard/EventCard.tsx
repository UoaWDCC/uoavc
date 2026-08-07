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
        "group hover:-translate-y-[10px] w-[306px] translate-y-0 gap-0 overflow-hidden rounded-none border-[3px] bg-transparent p-0 transition-transform duration-500 ease-in-out",
        borderColor,
      )}
    >
      <CardHeader className={cn("rounded-none px-[17px] py-[17px]", headerBg)}>
        <CardTitle
          className={cn("font-black font-heading text-[51px] uppercase leading-none", titleText)}
        >
          {name}
        </CardTitle>
        <CardDescription className={cn("mt-[10px] text-[20px] leading-none", descText)}>
          <p>{date}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-hidden bg-transparent px-0">
        <div className="relative h-[245px] w-full bg-transparent">
          {image ? (
            <Image alt={name} className="object-cover" fill sizes="306px" src={image} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <ImageIcon aria-hidden="true" className="h-[34px] w-[34px]" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 ease-out group-focus-within:bg-brand-primary/15 group-focus-within:opacity-100 group-hover:bg-brand-primary/15 group-hover:opacity-100">
            <Button
              asChild
              className="pointer-events-auto h-[43px] rounded-[26px] px-[26px] py-[9px] text-[17px]"
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
