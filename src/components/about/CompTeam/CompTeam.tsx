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
    <section className="flex w-full flex-col items-center sm:gap-8 sm:py-12">
      <h2 className="mb-[37px] text-center font-heading text-[40px] text-brand-primary uppercase leading-[1.1] tracking-[-0.019em] sm:mb-0 sm:text-4xl sm:leading-10 sm:tracking-normal">
        {teamName}
      </h2>

      <div className="relative mb-[45px] aspect-[5/3] w-full max-w-[922px] overflow-hidden bg-[#D9D9D9] sm:mb-0 sm:aspect-video sm:rounded-xl">
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
        <ul className="mb-6 flex flex-col items-center text-center font-body text-brand-primary tracking-[-0.019em] sm:mb-0 sm:gap-1 sm:text-brand-navy sm:tracking-normal">
          {players.map((player) => (
            <li key={player.id ?? `${player.name}-${player.position}`}>
              {player.name} - {player.position}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-6 text-center font-body text-brand-primary tracking-[-0.019em] sm:mb-0 sm:text-brand-navy sm:tracking-normal">
          Roster to be announced.
        </p>
      )}

      {coach ? (
        <p className="text-center font-body text-brand-primary tracking-[-0.019em] sm:font-semibold sm:uppercase sm:tracking-wide">
          Coach: {coach}
        </p>
      ) : null}
    </section>
  )
}

export default CompTeam
