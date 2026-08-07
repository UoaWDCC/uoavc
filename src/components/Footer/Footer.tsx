import Link from "next/link"
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa"
import { Logo } from "@/components/Logo/Logo"

export function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-light-grey">
      <div className="mx-auto px-[68px] py-[34px]">
        {/* Main Section */}
        <div className="flex flex-col gap-[41px] md:flex-row md:justify-between">
          {/* Title */}
          <div className="max-w-md">
            <h3 className="inline-block origin-center font-heading text-[34px] uppercase tracking-tight hover:animate-[wiggle_1500ms_ease-out]">
              Contact Us!
            </h3>
            <a
              className="mt-[34px] block text-[17px] text-brand-light-grey/90"
              href="mailto:uoavolleyball+secretary@gmail.com"
            >
              uoavolleyball+secretary@gmail.com
            </a>
            {/* Socials */}
            <div className="mt-[20px] flex gap-[27px]">
              <a
                className="group flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 border-brand-light-grey transition duration-300 ease-in-out hover:bg-white"
                href="https://www.instagram.com/uoavc/?hl=en"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaInstagram
                  className="text-brand-light-grey transition duration-300 ease-in-out group-hover:text-brand-primary"
                  size={27}
                />
              </a>

              <a
                className="group flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 border-brand-light-grey transition duration-300 ease-in-out hover:bg-white"
                href="https://www.tiktok.com/@uoavc"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaTiktok
                  className="text-brand-light-grey transition duration-300 ease-in-out group-hover:text-brand-primary"
                  size={27}
                />
              </a>

              <a
                className="group flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 border-brand-light-grey transition duration-300 ease-in-out hover:bg-white"
                href="https://discord.com/invite/aMDKvsWcyz"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaDiscord
                  className="text-brand-light-grey transition duration-300 ease-in-out group-hover:text-brand-primary"
                  size={27}
                />
              </a>
            </div>
          </div>

          {/* Page Links */}
          <div className="flex items-start gap-[54px] lg:gap-[82px]">
            {/* Events */}
            <div className="pt-[34px]">
              <h4 className="mb-[14px] font-semibold text-[17px]">Events</h4>

              <ul className="space-y-[7px] text-[17px] text-brand-light-grey/90">
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
            <div className="pt-[34px]">
              <h4 className="mb-[14px] font-semibold text-[17px]">About</h4>

              <ul className="space-y-[7px] text-[17px] text-brand-light-grey/90">
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
            <div className="pt-[34px]">
              <h4 className="mb-[14px] font-semibold text-[17px]">FAQ</h4>

              <ul className="space-y-[7px] text-[17px] text-brand-light-grey/90">
                <li>
                  <Link className="transition hover:underline" href="/events/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Login */}
            <div className="pt-[34px]">
              <h4 className="mb-[14px] font-semibold text-[17px]">Login</h4>

              <ul className="space-y-[7px] text-[17px] text-brand-light-grey/90">
                <li>
                  <Link className="transition hover:underline" href="/events/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:underline" href="/log-in">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <div className="pt-[51px]">
              <Logo />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-[34px] border-brand-light-grey/70 border-t pt-[14px]">
          <p className="text-[17px] text-brand-light-grey">&copy;2026 UOAVC + WDCC</p>
        </div>
      </div>
    </footer>
  )
}
