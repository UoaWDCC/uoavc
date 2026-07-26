import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const events = [
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

export default function UpcomingEvents() {
  return (
    <section className="bg-brand-primary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-extrabold text-6xl text-white uppercase md:text-8xl">
          Upcoming Events
        </h2>

        <p className="mx-auto mt-6 text-center text-white">
          The University of Auckland Volleyball Club caters to players of all skill levels, even
          those outside UOA!
        </p>

        <div className="mt-20 grid gap-12 md:grid-cols-2">
          {events.map((event) => (
            <div className="flex flex-col items-center" key={event.title}>
              <div className="w-full max-w-125 overflow-hidden transition-transform duration-300 hover:scale-110">
                <Image
                  alt={event.title}
                  className="h-80 w-full object-cover"
                  height={320}
                  src={event.image}
                  width={500}
                />
              </div>

              <h3 className="mt-8 text-center font-bold text-4xl text-white uppercase">
                {event.title}
              </h3>

              <div className="mt-8">
                <Button
                  asChild
                  className="border-2 border-brand-yellow"
                  size="md"
                  variant="tertiary"
                >
                  <Link href={event.link}>Sign up!</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
