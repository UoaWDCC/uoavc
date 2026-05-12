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
            <h3 className="text-4xl font-heading uppercase tracking-wide">Contact Us!</h3>

            <a
              className="mt-10 block text-brand-light-grey/90 text-lg transition hover:text-brand-light-grey"
              href="mailto:uoavolleyball+secretary@gmail.com"
            >
              uoavolleyball+secretary@gmail.com
            </a>

            <div className="mt-6 flex gap-4">{/* Socials */}</div>
          </div>

          {/* Page Links */}
          <div className="flex items-start gap-16 lg:gap-24">
            {/* Events */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold">Events</h4>

              <ul className="space-y-2 text-brand-light-grey/80 text-sm">
                <li>Upcoming Events</li>
                <li>Past Events</li>
              </ul>
            </div>

            {/* About */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold">About</h4>

              <ul className="space-y-2 text-brand-light-grey/80 text-sm">
                <li>Executives</li>
                <li>Comp Team</li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold">FAQ</h4>

              <ul className="space-y-2 text-brand-light-grey/80 text-sm">
                <li>FAQ</li>
              </ul>
            </div>

            {/* Login */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold">Login</h4>

              <ul className="space-y-2 text-brand-light-grey/80 text-sm">
                <li>Sign Up</li>
                <li>Login</li>
              </ul>
            </div>

            {/* Logo */}
            <div className="pt-19">
              <Logo />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-brand-light-grey/70 pt-4">
          <p className="text-brand-light-grey/80 text-lg">&copy;{currentYear} UOAVC + WDCC</p>
        </div>
      </div>
    </footer>
  )
}
