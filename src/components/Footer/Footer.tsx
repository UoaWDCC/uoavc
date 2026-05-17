"use client"

import Link from "next/link"
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa"
import Logo from "@/components/Logo/Logo"

export default function Footer() {
  const currentYear = new Date().getFullYear() // Get current year

  return (
    <footer className="bg-brand-primary text-brand-light-grey">
      <div className="mx-auto px-20 py-10">
        {/* Main Section */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Title */}
          <div className="max-w-md">
            <h3 className="inline-block origin-center font-heading text-[2.5rem] uppercase tracking-thin hover:animate-[wiggle_1500ms_ease-out]">
              Contact Us!
            </h3>
            <a
              className="mt-10 block text-brand-light-grey/90 text-xl"
              href="mailto:uoavolleyball+secretary@gmail.com"
            >
              uoavolleyball+secretary@gmail.com
            </a>
            {/* Socials */}
            <div className="mt-6 flex gap-8">
              <a
                className="group flex h-13 w-13 items-center justify-center rounded-full border-2 border-e-brand-light-grey transition duration-300 ease-in-out hover:bg-white"
                href="https://www.instagram.com/uoavc/?hl=en"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaInstagram
                  className="text-brand-light-grey transition duration-300 ease-in-out group-hover:text-brand-primary"
                  size={36}
                />
              </a>

              <a
                className="group flex h-13 w-13 items-center justify-center rounded-full border-2 border-e-brand-light-grey transition duration-300 ease-in-out hover:bg-white"
                href="https://www.tiktok.com/@uoavc"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaTiktok
                  className="text-brand-light-grey transition duration-300 ease-in-out group-hover:text-brand-primary"
                  size={28}
                />
              </a>

              <a
                className="group flex h-13 w-13 items-center justify-center rounded-full border-2 border-e-brand-light-grey transition duration-300 ease-in-out hover:bg-white"
                href="https://discord.com/invite/aMDKvsWcyz"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaDiscord
                  className="text-brand-light-grey transition duration-300 group-hover:text-brand-primary"
                  size={40}
                />
              </a>
            </div>
          </div>

          {/* Page Links */}
          <div className="flex items-start gap-16 px-20 lg:gap-24">
            {/* Events */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold text-xl">Events</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-xl">
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
              <h4 className="mb-4 font-semibold text-xl">About</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-xl">
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
              <h4 className="mb-4 font-semibold text-xl">FAQ</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-xl">
                <li>
                  <Link className="transition hover:underline" href="/events/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Login */}
            <div className="pt-10">
              <h4 className="mb-4 font-semibold text-xl">Login</h4>

              <ul className="space-y-2 text-brand-light-grey/90 text-xl">
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
          <p className="text-brand-light-grey text-xl">&copy;{currentYear} UOAVC + WDCC</p>
        </div>
      </div>
    </footer>
  )
}
