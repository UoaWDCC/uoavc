import { cn } from "@/lib/utils"
import { Card } from "../ui/card"

type StatCardProps = {
  variant: "navy" | "light-grey"
  value: string
  label: string
}

export function StatCard({ variant, value, label }: StatCardProps) {
  const isNavy = variant === "navy"
  const bg = isNavy ? "bg-brand-primary" : "bg-brand-white"
  const text = isNavy ? "text-brand-yellow" : "text-brand-primary"

  return (
    <Card
      className={cn(
        "items-center justify-center gap-1 rounded-none p-8 text-center transition-colors duration-300",
        bg,
      )}
    >
      <p className={cn("font-black font-heading text-5xl", text)}>{value}</p>
      <p className={cn("font-body font-normal text-sm", text)}>{label}</p>
    </Card>
  )
}
