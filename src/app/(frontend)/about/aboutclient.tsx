"use client"

import { useState } from "react"
import CompTeam from "@/components/about/CompTeam/CompTeam"
import ExecutivesGrid from "@/components/ExecutivesGrid/ExecutivesGrid"
import { TogglePillGroup } from "@/components/TogglePillGroup/TogglePillGroup"
import type { CompTeam as CompTeamDoc, Executive } from "@/payload-types"

type AboutClientProps = {
  executives: Executive[]
  compTeams: CompTeamDoc[]
}

const CompTeamsView = ({ compTeams }: { compTeams: CompTeamDoc[] }) => {
  if (compTeams.length === 0) {
    return (
      <p className="text-center font-body text-5xl text-brand-primary">
        No comp team rosters to display.
      </p>
    )
  }

  return (
    <div className="flex w-full flex-col items-center">
      {compTeams.map((team) => (
        <CompTeam
          coach={team.coach}
          key={team.id}
          photo={
            team.photo && typeof team.photo !== "string"
              ? { url: team.photo.url, alt: team.photo.alt }
              : null
          }
          players={team.players ?? []}
          teamName={team.name}
        />
      ))}
    </div>
  )
}

const AboutClient = ({ executives, compTeams }: AboutClientProps) => {
  const [selected, setSelected] = useState("executives")

  return (
    <div className="my-8 flex w-full max-w-[974px] flex-col items-center gap-16">
      <TogglePillGroup
        aria-label="About"
        onChange={setSelected}
        options={[
          { label: "EXECUTIVES", value: "executives" },
          { label: "COMP TEAM", value: "comp-team" },
        ]}
        value={selected}
      />

      {selected === "executives" ? (
        <ExecutivesGrid executives={executives} />
      ) : (
        <CompTeamsView compTeams={compTeams} />
      )}
    </div>
  )
}

export default AboutClient
