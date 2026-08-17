import Image from "next/image"

type CompTeamPlayer = {
  id?: string | null
  name: string
  position: string
}

interface CompTeamProps {
  teamName: string
  photo?: {
    url?: string | null
    alt?: string | null
  } | null
  coach?: string | null
  players: CompTeamPlayer[]
}

const CompTeam = ({ teamName, photo, coach, players }: CompTeamProps) => {
  const photoUrl = photo?.url ?? null
  const photoAlt = photo?.alt || `${teamName} team photo`

  return (
    <section className="mx-4 flex w-full flex-col items-center gap-8 py-12">
      <h2 className="text-center font-heading text-3xl text-brand-primary uppercase sm:text-4xl">
        {teamName}
      </h2>

      <div className="relative aspect-video w-full max-w-[922px] overflow-hidden rounded-xl bg-[#D9D9D9]">
        {photoUrl ? (
          <Image
            alt={photoAlt}
            className="object-cover"
            fill
            sizes="(max-width: 922px) 100vw, 922px"
            src={photoUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-body text-slate-500 text-sm">
            No team photo
          </div>
        )}
      </div>

      {players.length > 0 ? (
        <ul className="flex flex-col items-center gap-1 font-body text-brand-navy">
          {players.map((player) => (
            <li key={player.id ?? `${player.name}-${player.position}`}>
              {player.name} - {player.position}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-body text-brand-navy">Roster to be announced.</p>
      )}

      {coach ? (
        <p className="font-body font-semibold text-brand-primary uppercase tracking-wide">
          Coached by {coach}
        </p>
      ) : null}
    </section>
  )
}

export default CompTeam
