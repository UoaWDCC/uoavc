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
  const text = isNavy ? "text-brand-yellow" : "text-brand-primary group-hover:text-brand-white"

  return (
    <Card
      className={cn(
        "group items-center justify-center gap-[10px] rounded-[10px] px-[30px] py-5 text-center transition-colors duration-300",
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
