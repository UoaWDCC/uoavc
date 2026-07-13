import CompTeam from "@/components/about/CompTeam/CompTeam"
export default function HomePage() {
  return (
    <div>
      <CompTeam
        photo="/team-a.jpg"
        players={[
          { name: "Alice", position: "Forward" },
          { name: "Bob", position: "Midfielder" },
          { name: "Charlie", position: "Defender" },
        ]}
        teamName="UOACS MEN"
      />
      <CompTeam
        photo="/team-b.jpg"
        players={[
          { name: "Alice", position: "Forward" },
          { name: "Bob", position: "Midfielder" },
          { name: "Charlie", position: "Defender" },
        ]}
        teamName="UOACS WOMEN"
      />
    </div>
  )
}
