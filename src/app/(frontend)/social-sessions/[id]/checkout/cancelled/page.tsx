import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout Cancelled",
}

export default function CheckoutCancelledPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20">
      <h1 className="text-center font-heading text-6xl text-brand-primary uppercase sm:text-8xl">
        Checkout Cancelled
      </h1>
    </main>
  )
}
