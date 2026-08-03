import Image from "next/image"

interface CompTeamProps {
  teamName: string
  photo?: string
  players: {
    name: string
    position: string
  }[]
}

const CompTeam = ({ teamName, photo, players }: CompTeamProps) => {
  return (
    <div className="mx-4 flex flex-col items-center gap-8 py-12">
      <h1 className="font-bold text-4xl text-brand-navy">{teamName}</h1>

      {photo && (
        <div className="relative aspect-video w-full max-w-6xl">
          <Image alt={teamName} className="bg-gray-300" fill src={photo} />
        </div>
      )}

      <div className="flex flex-col text-black">
        {players.map((player) => (
          <div key={`${player.name}-${player.position}`}>
            <p>
              {player.name} - {player.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompTeam
