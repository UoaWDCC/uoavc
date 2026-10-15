import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="font-heading text-primary text-8xl">404</h1>
      <p className="text-lg">The page you are currently looking for doesn't exist</p>
      <Link href="/">
        <Button>Back to home →</Button>
      </Link>
    </main>
  )
}
