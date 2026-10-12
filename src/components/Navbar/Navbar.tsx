"use client"

import Image from "next/image"
import Link from "next/link"
import { AuthNavItem } from "./AuthNavItem"
import { MobileMenu } from "./MobileMenu"
import { FOCUS_RING, NavLink } from "./NavLink"

export function Navbar() {
  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-50 flex items-center justify-between bg-background py-3.5 pr-5 pl-5 md:pr-6.75"
    >
      <Link aria-label="UOAVC home" className={FOCUS_RING} href="/">
        <Image
          alt="UOAVC logo"
          className="transition-transform duration-300 ease-out hover:rotate-20 hover:scale-110"
          height={54}
          priority
          src="/logo.svg"
          width={54}
        />
      </Link>
      <div className="flex items-center gap-13.5 text-[15px] md:gap-17 lg:gap-20.5">
        <NavLink href="/events">Events</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/faq">FAQ</NavLink>
        <AuthNavItem />
      </div>
      <MobileMenu />
    </nav>
  )
}
