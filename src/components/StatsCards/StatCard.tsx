import { cn } from "@/lib/utils"
import { Card } from "../ui/card"

type StatCardProps = {
  variant: "navy" | "light-grey"
  value: string
  label: string
}

export function StatCard({ variant, value, label }: StatCardProps) {
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
        <span className="ml-2.5 inline-block scale-x-175 align-middle text-5xl">x</span>
        {value.slice(multiplierIndex + 1)}
      </>
    )

  return (
    <Card
      className={cn(
        "group h-42 w-52 items-start justify-center gap-0 rounded-lg px-5 py-3 text-left ring-0 transition-colors duration-500",
        bg,
      )}
    >
      <div className="flex h-28 w-full flex-col">
        <p
          className={cn(
            "font-heading font-normal text-8xl uppercase leading-none tracking-tight",
            text,
          )}
        >
          {valueContent}
        </p>
        <p className={cn("font-body font-medium text-base leading-none", text)}>{label}</p>
      </div>
    </Card>
  )
}
