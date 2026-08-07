import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout Successful",
}

export default function CheckoutSuccessPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20">
      <h1 className="text-center font-heading text-6xl text-brand-primary uppercase tracking-wide sm:text-8xl">
        Checkout Successful
      </h1>
    </main>
  )
}
