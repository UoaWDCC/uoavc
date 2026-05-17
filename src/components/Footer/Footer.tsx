import Link from "next/dist/client/link"
import Logo from "@/components/Logo/Logo"

export default function Footer() {
  const currentYear = new Date().getFullYear() // Get the current year

  return (
    <footer className="bg-brand-primary text-brand-light-grey">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Main Section */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Title */}
          <div className="max-w-md">
            <h3 className="font-heading text-4xl uppercase tracking-wide">Contact Us!</h3>

            <a
              className="mt-10 block text-brand-light-grey/90 text-lg"
              href="mailto:uoavolleyball+secretary@gmail.com"
            >
              uoavolleyball+secretary@gmail.com
            </a>

            <div className="mt-6 flex gap-4">
              {/* Socials */}
              <a
                className=""
                href="https://www.instagram.com/uoavolleyball/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
              <a
                className=""
                href="https://www.tiktok.com/@uoavolleyball"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tiktok
              </a>
              <a
                className=""
                href="https://discord.gg/uoavolleyball"
                rel="noopener noreferrer"
                target="_blank"
              >
                Discord
              </a>
            </div>
          </div>

          {/* Page Links */}
          <div className="flex items-start gap-16 lg:gap-24">
            {/* Events */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold text-lg">Events</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-lg">
                <li>
                  <Link className="transition hover:underline" href="/events/upcoming">
                    Upcoming Events
                  </Link>
                </li>

                <li>
                  <Link className="transition hover:underline" href="/events/past">
                    Past Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold text-lg">About</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-lg">
                <li>
                  <Link className="transition hover:underline" href="/events/executives">
                    Executives
                  </Link>
                </li>

                <li>
                  <Link className="transition hover:underline" href="/events/comp-team">
                    Comp Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold text-lg">FAQ</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-lg">
                <li>
                  <Link className="transition hover:underline" href="/events/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Login */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold text-lg">Login</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-lg">
                <li>
                  <Link className="transition hover:underline" href="/events/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:underline" href="/events/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <div className="pt-15">
              <Logo />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-brand-light-grey/70 border-t pt-4">
          <p className="text-brand-light-grey text-lg">&copy;{currentYear} UOAVC + WDCC</p>
        </div>
      </div>
    </footer>
  )
}
