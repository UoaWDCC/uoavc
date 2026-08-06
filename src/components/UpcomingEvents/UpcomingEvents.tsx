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
        <h1 className="text-center font-heading text-7xl text-white uppercase md:text-9xl">
          Upcoming Events
        </h1>

        <p className="mx-auto mt-8 max-w-5xl text-center text-base text-white md:text-xl mb-30">
          The University of Auckland Volleyball Club caters to players of all skill levels, even
          those outside UOA!
        </p>

        <div className="mt-20 flex flex-wrap justify-center gap-20">
          {events.map((event) => (
            <div className="flex w-full max-w-lg flex-col items-center" key={event.title}>
              <div className="w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-110">
                <Image
                  alt={event.title}
                  className="h-96 w-full object-cover"
                  height={384}
                  src={event.image}
                  width={576}
                />
              </div>

              <h3 className="mt-8 text-center font-heading text-4xl text-white uppercase md:text-5xl">
                {event.title}
              </h3>

              <div className="mt-10">
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
