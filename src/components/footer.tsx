import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear() // Get the current year

  return (
    <footer className="bg-[#0047BA] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Contact Section */}
          <div>
            <h3 className="mb-6 text-2xl font-bold uppercase tracking-wide">Contact Us!</h3>

            <a
              className="text-sm text-white/90 transition hover:text-white"
              href="mailto:uoavolleyball+secretary@gmail.com"
            >
              uoavolleyball+secretary@gmail.com {/* Add link later */}
            </a>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">{/* To be added */}</div>
          </div>

          {/* Events */}
          <div>
            <h4 className="pt-16 mb-4 font-semibold">Events</h4>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link className="transition hover:text-white" href="/events/upcoming">
                  Upcoming Events
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-white" href="/events/past">
                  Past Events
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="pt-16 mb-4 font-semibold">About</h4>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link className="transition hover:text-white" href="/executives">
                  Executives
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-white" href="/comp-team">
                  Comp Team
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="pt-16 mb-4 font-semibold">FAQ</h4>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link className="transition hover:text-white" href="/faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Login */}
          <div>
            <h4 className="pt-16 mb-4 font-semibold">Login</h4>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link className="transition hover:text-white" href="/signup">
                  Sign Up
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-white" href="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/30 pt-6">
          <p className="text-sm text-white/80">&copy;{currentYear} UOAVC + WDCC</p>
        </div>
      </div>
    </footer>
  )
}
