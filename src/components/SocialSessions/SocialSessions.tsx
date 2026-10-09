import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { SocialSession } from "@/payload-types"

export default function SocialSessions({ sessions }: { sessions: SocialSession[] }) {
  return (
    <section className="bg-brand-primary py-20">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="text-center font-heading text-8xl text-white uppercase md:text-8xl">
          Social Sessions
        </h1>

        <p className="mx-auto mt-7 max-w-5xl text-center text-base text-white">
          The University of Auckland Volleyball Club caters to players of all skill levels, even
          those outside UOA!
        </p>
        <p className="mx-auto mb-18 max-w-5xl text-center text-base text-white">
          Beginners, pros, and everyone in between, come train, compete, and connect with our
          volleyball community.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-14">
          {sessions.length === 0 ? (
            <p className="text-center text-white">
              No upcoming social sessions at the moment. Check back soon!
            </p>
          ) : (
            sessions.map((session) => {
              const image = typeof session.image === "object" ? session.image : null

              return (
                <div className="flex w-full max-w-sm flex-col items-center" key={session.id}>
                  <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-110">
                    <Image
                      alt={image?.alt || session.title}
                      className="h-64 w-full object-cover"
                      height={256}
                      src={image?.url || "/eventimage.avif"}
                      width={427}
                    />
                  </div>

                  <h3 className="mt-7 text-center font-heading text-[40px] text-white uppercase md:text-4xl">
                    {session.title}
                  </h3>

                  <div className="mt-5">
                    <Button
                      asChild
                      className="border-2 border-brand-yellow"
                      size="md"
                      variant="tertiary"
                    >
                      <Link href={`/social-sessions/${session.id}/sign-up`}>Sign up!</Link>
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
