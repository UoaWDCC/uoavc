import Image from "next/image"
import Link from "next/link"
import type * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-card-foreground text-sm ring-1 ring-foreground/10 has-[>img:first-child]:pt-0 has-data-[slot=card-footer]:pb-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className,
      )}
      data-size={size}
      data-slot="card"
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className,
      )}
      data-slot="card-header"
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-heading font-medium text-base leading-snug group-data-[size=sm]/card:text-sm",
        className,
      )}
      data-slot="card-title"
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="card-description"
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      data-slot="card-action"
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      data-slot="card-content"
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className,
      )}
      data-slot="card-footer"
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }

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

function EventCard({ variant, name, date, time, image, href }: EventCardProps) {
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
        <CardDescription className={cn("mt-3 text-2xl leading-none", descText)}>
          {date} {time}
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

export { EventCard }
