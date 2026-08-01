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
        "items-center justify-center gap-[10px] rounded-[10px] px-[30px] py-5 text-center transition-colors duration-300",
        bg,
      )}
    >
      <p
        className={cn(
          "font-heading font-normal text-[128px] uppercase leading-none tracking-[-0.019em]",
          text,
        )}
      >
        {value}
      </p>
      <p className={cn("font-body font-medium text-xl leading-[40px]", text)}>{label}</p>
    </Card>
  )
}
