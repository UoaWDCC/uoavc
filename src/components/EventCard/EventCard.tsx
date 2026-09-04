"use client"

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dialog } from "radix-ui"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const SIGN_UP_HREF = "/sign-up"

// Matches the events grid: three 260px cards with a 32px gap between them, so
// the dialog lines up with the row of cards behind it.
const DIALOG_WIDTH = "max-w-[844px]"

// A blank price in Payload means the event is free for that audience.
function formatPrice(amount?: number | null) {
  return amount ? `$${amount}` : "Free"
}

type EventCardProps = {
  variant: "upcoming" | "past"
  name: string
  date: string
  image?: string
  href: string
  startTime?: string
  endTime?: string | null
  location?: string
  description?: SerializedEditorState
  memberPrice?: number | null
  nonMemberPrice?: number | null
}

export function EventCard({
  variant,
  name,
  date,
  image,
  href,
  startTime,
  endTime,
  location,
  description,
  memberPrice,
  nonMemberPrice,
}: EventCardProps) {
  const isPast = variant === "past"
  const headerBg = isPast ? "bg-brand-yellow" : "bg-brand-primary"
  const borderColor = isPast ? "border-brand-yellow" : "border-brand-primary"
  const titleText = isPast ? "text-brand-primary" : "text-white"
  const descText = isPast ? "text-brand-primary" : "text-white"

  const card = (
    <Card
      className={cn(
        "group hover:-translate-y-2 w-65 translate-y-0 gap-0 overflow-hidden rounded-xl border-2 bg-transparent p-0 transition-transform duration-500 ease-in-out",
        borderColor,
      )}
    >
      <CardHeader className={cn("rounded-none px-4 py-4", headerBg)}>
        <CardTitle
          className={cn("font-heading font-normal text-5xl uppercase leading-none", titleText)}
        >
          {name}
        </CardTitle>
        <CardDescription className={cn("mt-2 text-base leading-none", descText)}>
          <p>{date}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden bg-transparent px-0">
        <div className="relative h-52 w-full bg-transparent">
          {image ? (
            <Image alt={name} className="object-cover" fill sizes="260px" src={image} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <ImageIcon aria-hidden="true" className="h-7 w-7" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 ease-out group-focus-within:bg-brand-primary/15 group-focus-within:opacity-100 group-hover:bg-brand-primary/15 group-hover:opacity-100">
            <Button
              asChild
              className="pointer-events-auto h-9 rounded-full px-6 py-2 text-sm"
              variant={isPast ? "secondary" : "tertiary"}
            >
              {isPast ? (
                <Link href={href}>view gallery</Link>
              ) : (
                <Dialog.Trigger>learn more</Dialog.Trigger>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isPast) return card

  const priceLabel = `${formatPrice(memberPrice)} members / ${formatPrice(nonMemberPrice)} non-members`

  return (
    <Dialog.Root>
      {card}
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-white/50 backdrop-blur-[1px] data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content
          // Radix warns when a dialog has no Description; events without one
          // opt out explicitly instead.
          aria-describedby={description ? undefined : ""}
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 max-h-[calc(100vh-3rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-lg border-2 border-brand-primary bg-white px-6 py-7 text-brand-primary shadow-lg outline-none data-[state=closed]:animate-out data-[state=open]:animate-in md:px-10 md:py-9",
            DIALOG_WIDTH,
          )}
        >
          <Dialog.Title className="pr-10 font-heading text-3xl uppercase md:text-4xl">
            {name}
          </Dialog.Title>
          <Dialog.Close
            aria-label="Close event details"
            className="absolute top-5 right-5 cursor-pointer rounded-sm p-1 outline-none transition-colors hover:bg-brand-light-grey focus-visible:ring-3 focus-visible:ring-ring/50 md:top-8 md:right-8"
          >
            <X className="size-6" strokeWidth={1.5} />
          </Dialog.Close>

          <div className="mt-3 grid gap-x-10 gap-y-1 text-sm md:grid-cols-2 md:text-base">
            <p>
              <strong>Date:</strong> {date}
            </p>
            {location ? (
              <p>
                <strong>Location:</strong> {location}
              </p>
            ) : null}
            {startTime ? (
              <p>
                <strong>Time:</strong> {startTime}
                {endTime ? ` - ${endTime}` : ""}
              </p>
            ) : null}
            <p>
              <strong>Price:</strong> {priceLabel}
            </p>
          </div>

          <div className="mt-6 grid gap-y-6 md:grid-cols-2 md:items-start md:gap-x-10">
            {image ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  alt={name}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 400px, calc(100vw - 5rem)"
                  src={image}
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <ImageIcon aria-hidden="true" className="size-8" />
              </div>
            )}
            <div className="flex h-full flex-col items-end gap-6">
              {description ? (
                <Dialog.Description asChild>
                  <RichText
                    className="w-full text-sm leading-relaxed md:text-base [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
                    data={description}
                  />
                </Dialog.Description>
              ) : null}
              <Button asChild className="mt-auto" size="md" variant="tertiary">
                <Link href={SIGN_UP_HREF}>Sign up!</Link>
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
