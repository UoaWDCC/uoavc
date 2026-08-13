import { StatCard } from "./StatCard"

const STATS = [
  { value: "10+", label: "Years Running", variant: "navy" },
  { value: "2x", label: "Weekly Sessions", variant: "light-grey" },
  { value: "ALL", label: "Skill levels welcome", variant: "navy" },
  { value: "3x", label: "Award winner", variant: "light-grey" },
] as const

export function StatsCards() {
  return (
    <div className="flex flex-wrap justify-center gap-[50px]">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
