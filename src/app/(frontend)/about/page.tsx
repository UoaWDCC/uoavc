import type { Metadata } from "next"
import { getPayload } from "payload"
import config from "@/payload.config"
import type { CompTeam, Executive } from "@/payload-types"
import AboutClient from "./aboutclient"

export const metadata: Metadata = {
  title: "About",
}

export default async function AboutPage() {
  const payload = await getPayload({ config: await config })

  const [executivesResult, compTeamsResult] = await Promise.all([
    payload.find({ collection: "executives", sort: "order", limit: 100 }),
    payload.find({ collection: "comp-teams", sort: "order", limit: 100 }),
  ])

  return (
    <div className="flex flex-col items-center bg-brand-white px-[35px] pt-12 pb-24 sm:px-6">
      <section className="flex w-full max-w-[974px] flex-col items-center gap-10 sm:gap-6">
        <h1 className="text-center font-heading text-[clamp(4.5rem,23vw,5.625rem)] text-brand-primary uppercase leading-none md:text-8xl">
          About
        </h1>
        {/* Placeholder hardcoded text - no payload collection for about page text */}
        <p className="w-full max-w-[320px] text-center font-body text-base text-brand-primary leading-6 sm:max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>

        <AboutClient
          compTeams={compTeamsResult.docs as CompTeam[]}
          executives={executivesResult.docs as Executive[]}
        />
      </section>
    </div>
  )
}
