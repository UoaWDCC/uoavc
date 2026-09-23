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
    <section className="flex w-full min-w-0 flex-col items-center gap-10 text-center [overflow-wrap:anywhere] sm:gap-8 sm:py-12">
      <h2 className="w-full text-center font-heading text-4xl text-brand-primary uppercase">
        {teamName}
      </h2>

      <div className="relative aspect-[5/3] w-full max-w-[922px] overflow-hidden bg-[#D5D5D5] sm:aspect-video sm:rounded-xl">
        {photoUrl ? (
          <Image
            alt={photoAlt}
            className="object-cover"
            fill
            sizes="(max-width: 639px) calc(100vw - 70px), (max-width: 970px) calc(100vw - 48px), 922px"
            src={photoUrl}
          />
        ) : (
          <span className="sr-only">No team photo for {teamName}</span>
        )}
      </div>

      {players.length > 0 ? (
        <ul className="flex w-full flex-col font-body text-base text-brand-primary leading-6 sm:gap-1">
          {players.map((player) => (
            <li key={player.id ?? `${player.name}-${player.position}`}>
              {player.name} - {player.position}
            </li>
          ))}
        </ul>
      ) : (
        <p className="w-full font-body text-base text-brand-primary">Roster to be announced.</p>
      )}

      {coach ? (
        <p className="w-full font-body text-base text-brand-primary">Coach: {coach}</p>
      ) : null}
    </section>
  )
}

export default CompTeam
