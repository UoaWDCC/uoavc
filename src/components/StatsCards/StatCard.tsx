import { cn } from "@/lib/utils"
import { Card } from "../ui/card"

type StatCardProps = {
  variant: "navy" | "light-grey"
  value: string
  label: string
  className?: string
}

export function StatCard({ variant, value, label, className }: StatCardProps) {
  const isNavy = variant === "navy"
  const bg = isNavy
    ? "bg-brand-primary hover:bg-brand-white"
    : "bg-brand-white hover:bg-brand-primary"
  const text = cn(
    "transition-colors duration-500",
    isNavy ? "text-brand-yellow" : "text-brand-primary group-hover:text-brand-white",
  )

  const multiplierIndex = value.indexOf("x")
  const valueContent =
    multiplierIndex === -1 ? (
      value
    ) : (
      <>
        {value.slice(0, multiplierIndex)}
        <span className="ml-1.5 inline-block scale-x-175 align-middle text-3xl md:ml-2.5 md:text-5xl">
          x
        </span>
        {value.slice(multiplierIndex + 1)}
      </>
    )

  return (
    <Card
      className={cn(
        "group min-h-32 w-full max-w-52 items-start justify-center gap-0 rounded-lg px-4 py-3 text-left ring-0 transition-colors duration-500 md:h-42 md:w-52 md:px-5",
        bg,
        className,
      )}
    >
      <div className="flex w-full flex-col md:h-28">
        <p
          className={cn(
            "font-heading font-normal text-6xl uppercase leading-none tracking-tight md:text-8xl",
            text,
          )}
        >
          {valueContent}
        </p>
        <p
          className={cn(
            "font-body font-medium text-sm leading-tight md:text-base md:leading-none",
            text,
          )}
        >
          {label}
        </p>
      </div>
    </Card>
  )
}
