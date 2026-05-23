import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type EventCardProps = {
  variant: "upcoming" | "past"
  name: string
  date: string
  time: string
  description: string
  location: string
  signUpLink?: string
  image?: string
  href: string
}

export function EventCard({
  variant,
  name,
  date,
  time,
  image,
  href,
  description,
  location,
  signUpLink,
}: EventCardProps) {
  const isPast = variant === "past"
  const headerBg = isPast ? "bg-brand-yellow" : "bg-brand-primary"
  const borderColor = isPast ? "border-brand-yellow" : "border-brand-primary"
  const titleText = isPast ? "text-secondary-foreground" : "text-white"
  const descText = isPast ? "text-secondary-foreground" : "text-white"

  return (
    <Card
      className={cn(
        "group hover:-translate-y-3 w-90 translate-y-0 gap-0 overflow-hidden rounded-none border-3 bg-transparent p-0 transition-transform duration-500 ease-in-out",
        borderColor,
      )}
    >
      <CardHeader className={cn("rounded-none px-5 py-5", headerBg)}>
        <CardTitle className={cn("font-black font-heading text-6xl uppercase", titleText)}>
          {name}
        </CardTitle>
        <CardDescription className={cn("mt-3 flex flex-col gap-4 text-2xl leading-none", descText)}>
          <p>
            {date} {time}
          </p>
          <p>{description}</p>
          <p>{location}</p>
          <p>{signUpLink}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-hidden bg-transparent px-0">
        <div className="relative h-72 w-full bg-transparent">
          {image ? (
            <Image alt={name} className="object-cover" fill sizes="360px" src={image} />
          ) : (
            <div className="h-full w-full bg-transparent" />
          )}

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 ease-out group-hover:bg-brand-primary/15 group-hover:opacity-100">
            <Button asChild className="pointer-events-auto" variant="default">
              <Link href={href}>learn more</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
