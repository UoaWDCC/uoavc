"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const HOVER_BOLD_TEXT_SHADOW = "hover:[text-shadow:0.4px_0_0_currentColor,-0.4px_0_0_currentColor]"

const FOCUS_RING =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

function NavLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group inline-flex items-center gap-1.5 transition-all duration-200 ease-out",
        !isActive && "hover:text-gray-500",
        HOVER_BOLD_TEXT_SHADOW,
        isActive && "text-primary",
        FOCUS_RING,
        className,
      )}
      href={href}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "transition-all duration-200 ease-out",
          isActive
            ? "translate-x-0 opacity-100"
            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
        )}
      >
        &gt;
      </span>
    </Link>
  )
}

export function Navbar() {
  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-50 flex items-center justify-between bg-background py-4 pr-6 pl-6 md:pr-8"
    >
      <Link aria-label="UOAVC home" className={FOCUS_RING} href="/">
        <Image
          alt="UOAVC logo"
          className="transition-transform duration-300 ease-out hover:rotate-20 hover:scale-110"
          height={64}
          priority
          src="/logo.svg"
          width={64}
        />
      </Link>
      <div className="flex items-center gap-16 text-lg md:gap-20 lg:gap-24">
        <NavLink href="/events">Events</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/faq">FAQ</NavLink>
        <NavLink className="text-primary hover:text-brand-yellow" href="/log-in">
          Login
        </NavLink>
      </div>
    </nav>
  )
}
