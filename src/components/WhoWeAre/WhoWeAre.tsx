import { StatsCards } from "@/components/StatsCards/StatsCards"

export function WhoWeAre() {
  return (
    <section className="bg-brand-yellow py-32">
      <div className="mx-auto max-w-[1180px] px-6 text-center text-brand-primary">
        <p className="font-heading text-3xl uppercase leading-[1.1] tracking-[-0.019em] md:text-5xl">
          Who We Are
        </p>

        <h1 className="mt-4 font-heading text-8xl uppercase leading-none tracking-[-0.019em] md:text-8xl">
          Built For Every Player
        </h1>

        <div className="mt-6 text-base md:text-[19px]">
          <p>
            The University of Auckland Volleyball Club caters to players of all skill levels – even
            those outside UoA.
          </p>

          <p>
            Whether you’ve never touched a volleyball or you’re looking for competitive play,
            there’s place for you here.
          </p>
        </div>
      </div>

      <div className="mt-18">
        <StatsCards />
      </div>
    </section>
  )
}
