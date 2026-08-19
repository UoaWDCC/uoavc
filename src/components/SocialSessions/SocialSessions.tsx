import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const socialSessions = [
  {
    title: "MONDAY SOCIAL SESSION",
    image: "/eventimage.avif",
    link: "#",
  },
  {
    title: "FRIDAY SOCIAL SESSION",
    image: "/eventimage.avif",
    link: "#",
  },
]

export default function SocialSessions() {
  return (
    <section className="bg-brand-primary py-20">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="text-center font-heading text-8xl text-white uppercase md:text-8xl">
          Social Sessions
        </h1>

        <p className="mx-auto mt-7 max-w-5xl text-center text-sm text-white md:text-base">
          The University of Auckland Volleyball Club caters to players of all skill levels, even
          those outside UOA!
        </p>
        <p className="mx-auto mb-18 max-w-5xl text-center text-sm text-white md:text-base">
          Beginners, pros, and everyone in between, come train, compete, and connect with our
          volleyball community.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-14">
          {socialSessions.map((session) => (
            <div className="flex w-full max-w-sm flex-col items-center" key={session.title}>
              <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-110">
                <Image
                  alt={session.title}
                  className="h-64 w-full object-cover"
                  height={256}
                  src={session.image}
                  width={427}
                />
              </div>

              <h3 className="mt-7 text-center font-heading text-3xl text-white uppercase md:text-4xl">
                {session.title}
              </h3>

              <div className="mt-5">
                <Button
                  asChild
                  className="border-2 border-brand-yellow"
                  size="md"
                  variant="tertiary"
                >
                  <Link href={session.link}>Sign up!</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
