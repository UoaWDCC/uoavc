"use client"

/*
Shared component for navigation links
*/

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const HOVER_BOLD_TEXT_SHADOW = "hover:[text-shadow:0.4px_0_0_currentColor,-0.4px_0_0_currentColor]"

export const FOCUS_RING =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export const navItemClassName = cn(
  "group inline-flex items-center gap-[5px] text-primary transition-all duration-200 ease-out hover:text-brand-yellow",
  HOVER_BOLD_TEXT_SHADOW,
  FOCUS_RING,
)

export function NavArrow() {
  return (
    <span
      aria-hidden="true"
      className="-translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
    >
      &gt;
    </span>
  )
}

export function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(navItemClassName, className)}
      href={href}
    >
      {children}
      <NavArrow />
    </Link>
  )
}
