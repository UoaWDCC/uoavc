"use client"

import { AnimatePresence, MotionConfig, motion, useCycle } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId } from "react"
import type { IconType } from "react-icons"
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa"
import { cn } from "@/lib/utils"

const FOCUS_RING =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

const MENU_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
]

const SOCIAL_LINKS: { href: string; label: string; Icon: IconType }[] = [
  { href: "https://www.instagram.com/uoavc/?hl=en", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.tiktok.com/@uoavc", label: "TikTok", Icon: FaTiktok },
  { href: "https://discord.com/invite/aMDKvsWcyz", label: "Discord", Icon: FaDiscord },
]

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -8 },
}

export function MobileMenu() {
  const [mobileNav, toggleMobileNav] = useCycle(false, true)
  const pathname = usePathname()
  const menuId = useId()

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  // Lock page scroll and allow Escape to close while the menu is open
  useEffect(() => {
    if (!mobileNav) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") toggleMobileNav()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [mobileNav, toggleMobileNav])

  return (
    <div className="md:hidden">
      <motion.button
        animate={mobileNav ? "open" : "closed"}
        aria-controls={menuId}
        aria-expanded={mobileNav}
        aria-label={mobileNav ? "Close menu" : "Open menu"}
        className={cn("relative z-10 flex flex-col space-y-1.5 p-1", FOCUS_RING)}
        onClick={() => toggleMobileNav()}
        type="button"
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="block h-0.5 w-7 rounded-full bg-primary"
          variants={{
            open: { rotate: 45, y: 8 },
            closed: { rotate: 0, y: 0 },
          }}
        />
        <motion.span
          className="block h-0.5 w-7 rounded-full bg-primary"
          variants={{
            open: { opacity: 0 },
            closed: { opacity: 1 },
          }}
        />
        <motion.span
          className="block h-0.5 w-7 rounded-full bg-primary"
          variants={{
            open: { rotate: -45, y: -8 },
            closed: { rotate: 0, y: 0 },
          }}
        />
      </motion.button>
      <AnimatePresence>
        {mobileNav && (
          <MotionConfig
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate="open"
              className="fixed inset-x-0 top-0 flex h-dvh flex-col bg-brand-white px-[29px] pt-[147px] pb-[72px] text-primary"
              exit="closed"
              id={menuId}
              initial="closed"
              variants={{
                open: {
                  y: "0%",
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.05,
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                },
                closed: {
                  y: "-100%",
                  transition: {
                    when: "afterChildren",
                    duration: 0.1,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <ul className="border-primary/30 border-t font-semibold text-[17px]">
                {MENU_LINKS.map((link) => (
                  <motion.li
                    className="border-brand-yellow border-b"
                    key={link.href}
                    variants={itemVariants}
                  >
                    <Link
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-[18px] transition-colors duration-200 hover:text-brand-yellow",
                        FOCUS_RING,
                      )}
                      href={link.href}
                      onClick={() => toggleMobileNav()}
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.25} />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div className="mt-[52px] text-[17px]" variants={itemVariants}>
                <Link
                  aria-current={isActive("/log-in") ? "page" : undefined}
                  className={cn(
                    "transition-colors duration-200 hover:text-brand-yellow",
                    FOCUS_RING,
                  )}
                  href="/log-in"
                  onClick={() => toggleMobileNav()}
                >
                  Login
                </Link>
              </motion.div>

              <motion.div className="mt-auto" variants={itemVariants}>
                <h2 className="text-[17px]">Contact Us</h2>
                <a
                  className={cn("mt-[14px] block text-[14px] hover:underline", FOCUS_RING)}
                  href="mailto:uoavolleyball+secretary@gmail.com"
                >
                  uoavolleyball+secretary@gmail.com
                </a>
                <div className="mt-[20px] flex gap-[22px]">
                  {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a
                      aria-label={label}
                      className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1.5px] border-primary transition duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={href}
                      key={href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon aria-hidden="true" size={22} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </div>
  )
}
