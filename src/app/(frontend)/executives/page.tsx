import { getPayload } from "payload"

import ExecCard from "@/components/ExecCard/ExecCard"
import config from "@/payload.config"
import type { Executive } from "@/payload-types"

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

export default async function ExecutivesPage() {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: "executives",
    sort: "order",
    limit: 100,
  })

  const executives = result.docs as Executive[]
  const groupedExecutives: Record<string, Executive[]> = {}

  for (const executive of executives) {
    const section = getRoleSection(executive.role)

    if (!groupedExecutives[section]) {
      groupedExecutives[section] = []
    }

    groupedExecutives[section].push(executive)
  }

  const sectionOrder = ["CO-PRESIDENTS", "ADMIN TEAM", "SOCIAL MEDIA & MARKETING", "EXECUTIVE TEAM"]

  return (
    <main className="min-h-screen bg-brand-light-grey px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-center font-heading text-3xl text-brand-primary uppercase sm:text-4xl">
          Executive Team
        </h1>

        {executives.length === 0 ? (
          <p className="text-center font-body text-brand-primary text-lg">
            No executive profiles to display.
          </p>
        ) : (
          <div className="space-y-16">
            {sectionOrder.map((section) => {
              const peopleInSection = groupedExecutives[section]

              if (!peopleInSection || peopleInSection.length === 0) {
                return null
              }

              return (
                <section className="mx-auto max-w-fit" key={section}>
                  <h2 className="mb-8 text-center font-heading text-2xl text-brand-primary uppercase sm:text-3xl">
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
        )}
      </div>
    </main>
  )
}
