import { StatCard } from "./StatCard"

const STATS = [
  { value: "10+", label: "Years Running", variant: "navy" },
  { value: "2x", label: "Weekly Sessions", variant: "light-grey" },
  {
    value: "ALL",
    label: "Skill levels welcome",
    variant: "navy",
    className: "order-last md:order-none",
  },
  { value: "3x", label: "Award winner", variant: "light-grey" },
] as const

export function StatsCards() {
  return (
    <div className="mx-auto grid w-full grid-cols-2 gap-4 px-6 md:w-fit md:gap-11 md:px-0 xl:grid-cols-4">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
