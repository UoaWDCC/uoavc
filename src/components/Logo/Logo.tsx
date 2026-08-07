import Image from "next/image"
import Link from "next/link"

const FOCUS_RING =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function Logo() {
  return (
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
  )
}
