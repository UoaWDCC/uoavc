import { AwardsBanner } from "@/components"

const AWARDS = ["2025 Sports Club of the Year (Runner-up)", "2021 Supreme Club of the Year"]

export default function HomePage() {
  return (
    <div>
      <AwardsBanner awards={AWARDS} />
    </div>
  )
}
