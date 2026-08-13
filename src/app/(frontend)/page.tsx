import { Hero } from "@/components/Hero/Hero"
import UpcomingEvents from "@/components/UpcomingEvents/UpcomingEvents"
import { WhoWeAre } from "@/components/WhoWeAre/WhoWeAre"

export default function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <WhoWeAre />
    </>
  )
}
