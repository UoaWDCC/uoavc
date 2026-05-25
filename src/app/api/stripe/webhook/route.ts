export const runtime = "nodejs"

import type { Stripe } from "stripe"
import { stripe } from "@/lib/stripe"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? ""

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return new Response("Webhook signature verification failed", { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.expired":
      case "payment_intent.payment_failed":
      case "charge.refunded":
        break
      default:
        break
    }
  } catch {
    return new Response("Internal server error", { status: 500 })
  }

  return new Response(null, { status: 200 })
}
