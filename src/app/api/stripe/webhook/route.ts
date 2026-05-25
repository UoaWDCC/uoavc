export const runtime = "nodejs"

import { getPayload } from "payload"
import type { Stripe } from "stripe"
import sendRegistrationConfirmation from "@/lib/email/registrationConfirmation"
import { stripe } from "@/lib/stripe"
import config from "@/payload.config"
import type { SocialSession, SocialSessionRegistration } from "@/payload-types"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? ""

async function getPayloadClient() {
  return getPayload({ config: await config })
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const registrationId = session.metadata?.registrationId
  if (!registrationId) return

  const payload = await getPayloadClient()

  let registration: SocialSessionRegistration
  try {
    registration = await payload.findByID({
      collection: "social-session-registrations",
      id: registrationId,
      overrideAccess: true,
    })
  } catch {
    return
  }

  if (registration.paymentStatus === "paid") return

  await payload.update({
    collection: "social-session-registrations",
    id: registration.id,
    data: {
      paymentStatus: "paid",
      amountPaid: session.amount_total != null ? session.amount_total / 100 : undefined,
    },
    overrideAccess: true,
  })

  const socialSession =
    typeof registration.socialSession === "string"
      ? await payload.findByID({
          collection: "social-sessions",
          id: registration.socialSession,
          overrideAccess: true,
        })
      : (registration.socialSession as SocialSession)

  const recipientEmail =
    registration.guestEmail ??
    (registration.user
      ? typeof registration.user === "string"
        ? (
            await payload.findByID({
              collection: "users",
              id: registration.user,
              overrideAccess: true,
            })
          ).email
        : (registration.user as { email?: string }).email
      : undefined)

  if (recipientEmail && socialSession) {
    await sendRegistrationConfirmation({
      to: recipientEmail,
      sessionTitle: socialSession.title,
      sessionDate: new Date(socialSession.date).toLocaleDateString("en-NZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      sessionTime: `${socialSession.startTime}${socialSession.endTime ? ` - ${socialSession.endTime}` : ""}`,
      sessionLocation: socialSession.location,
      isWaitlisted: registration.registrationStatus === "waitlisted",
    })
  }
}

async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  const registrationId = session.metadata?.registrationId
  if (!registrationId) return

  const payload = await getPayloadClient()

  let registration: SocialSessionRegistration
  try {
    registration = await payload.findByID({
      collection: "social-session-registrations",
      id: registrationId,
      overrideAccess: true,
    })
  } catch {
    return
  }

  if (registration.registrationStatus === "cancelled") return

  await payload.update({
    collection: "social-session-registrations",
    id: registration.id,
    data: { registrationStatus: "cancelled" },
    overrideAccess: true,
  })
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const registrationId = paymentIntent.metadata?.registrationId
  if (!registrationId) return

  const payload = await getPayloadClient()

  let registration: SocialSessionRegistration
  try {
    registration = await payload.findByID({
      collection: "social-session-registrations",
      id: registrationId,
      overrideAccess: true,
    })
  } catch {
    return
  }

  if (registration.registrationStatus === "cancelled") return

  await payload.update({
    collection: "social-session-registrations",
    id: registration.id,
    data: { registrationStatus: "cancelled" },
    overrideAccess: true,
  })
}

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
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case "checkout.session.expired":
        await handleCheckoutSessionExpired(event.data.object as Stripe.Checkout.Session)
        break
      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break
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
