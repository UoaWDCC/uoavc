import CompTeam from "@/components/about/CompTeam/CompTeam"
import Faq from "@/components/FAQ/FAQ"
export function HomePage() {
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

export default function FaqPage() {
  return (
    <Faq
      items={[
        {
          question: "QUESTION 1",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        },
        {
          question: "QUESTION 2",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        },
      ]}
    ></Faq>
  )
}
