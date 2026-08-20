import ExecCard from "@/components/ExecCard/ExecCard"
import type { Executive } from "@/payload-types"

// Executives are stored with a free-text role, so the page sections are derived
// from that role rather than from a field on the collection.
function getRoleSection(role: string) {
  const upperRole = role.trim().toUpperCase()

  if (upperRole === "CO-PRESIDENT") {
    return "CO-PRESIDENTS"
  }

  if (
    upperRole === "SECRETARY" ||
    upperRole === "TREASURER" ||
    upperRole === "SENIOR ADVISOR" ||
    upperRole === "COMPETITION CO-ORDINATOR"
  ) {
    return "ADMIN TEAM"
  }

  if (upperRole === "SENIOR EVENT CO" || upperRole === "EVENT CO-ORDINATOR") {
    return "EVENT CO-ORDINATORS"
  }

  if (
    upperRole === "SOCIAL MEDIA MANAGER" ||
    upperRole === "MARKETING & MEDIA" ||
    upperRole === "GRAPHIC DESIGNER" ||
    upperRole === "PUBLIC RELATIONS"
  ) {
    return "SOCIAL MEDIA & MARKETING"
  }

  return "EXECUTIVE TEAM"
}

const sectionOrder = [
  "CO-PRESIDENTS",
  "ADMIN TEAM",
  "SOCIAL MEDIA & MARKETING",
  "EVENT CO-ORDINATORS",
  "EXECUTIVE TEAM",
]

export default function ExecutivesGrid({ executives }: { executives: Executive[] }) {
  if (executives.length === 0) {
    return (
      <p className="text-center font-body text-brand-primary text-lg">
        No executive profiles to display.
      </p>
    )
  }

  const groupedExecutives: Record<string, Executive[]> = {}

  for (const executive of executives) {
    const section = getRoleSection(executive.role)

    if (!groupedExecutives[section]) {
      groupedExecutives[section] = []
    }

    groupedExecutives[section].push(executive)
  }

  return (
    <div className="w-full space-y-16">
      {sectionOrder.map((section) => {
        const peopleInSection = groupedExecutives[section]

        if (!peopleInSection || peopleInSection.length === 0) {
          return null
        }

        return (
          <section className="mx-auto max-w-fit" key={section}>
            <h2 className="mb-4 text-center font-heading text-[2.75rem] text-brand-primary uppercase">
              {section}
            </h2>

            <div className="mx-auto flex max-w-[952px] flex-wrap justify-center gap-x-6 gap-y-10">
              {peopleInSection.map((executive) => (
                <ExecCard
                  degree={executive.degree}
                  key={executive.id}
                  name={executive.name}
                  photo={
                    executive.photo && typeof executive.photo !== "string"
                      ? {
                          url: executive.photo.url,
                          alt: executive.photo.alt,
                        }
                      : null
                  }
                  position={executive.position}
                  role={executive.role}
                  yearsOfExperience={executive.yearsOfExperience}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
