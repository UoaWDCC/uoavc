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
        "group h-[199px] w-[280px] items-start justify-center gap-0 rounded-[10px] px-[30px] py-5 text-left ring-0 transition-colors duration-300",
        bg,
      )}
    >
      <div className="flex h-[159px] w-full flex-col">
        <p
          className={cn(
            "font-heading font-normal text-[128px] uppercase leading-none tracking-[-0.019em]",
            text,
          )}
        >
          {value}
        </p>
        <p className={cn("font-body font-medium text-xl leading-none", text)}>{label}</p>
      </div>
    </Card>
  )
}
