import type { PayloadHandler } from "payload"
import { addDataAndFileToRequest } from "payload"
import { stripe } from "@/lib/stripe"

// POST /api/social-sessions/:id/checkout/release
//
// Called by the sign-up form when someone lands back on it after backing out
// of (or abandoning) Stripe Checkout. Frees their held spot right away instead
// of leaving it locked for the 30-minute hold set in socialSessionCheckout.ts
// — otherwise a retry can arrive before the checkout.session.expired webhook
// fires and gets rejected as "already registered".
export const socialSessionCheckoutRelease: PayloadHandler = async (req) => {
  const id = req.routeParams?.id as string | undefined
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 })
  }

  await addDataAndFileToRequest(req)
  const body = (req.data ?? {}) as { registrationId?: string }
  const registrationId = body.registrationId
  if (!registrationId) {
    return Response.json({ error: "Missing registrationId" }, { status: 400 })
  }

  const registration = await req.payload
    .findByID({
      collection: "social-session-registrations",
      id: registrationId,
      depth: 0,
      req,
    })
    .catch(() => null)

  if (!registration || registration.socialSession !== id) {
    return Response.json({ error: "Registration not found" }, { status: 404 })
  }

  // Guest registrations have no user, so anyone holding the registration id
  // (handed back in the cancel_url) can release them.
  if (registration.user && registration.user !== req.user?.id) {
    return Response.json({ error: "Registration not found" }, { status: 404 })
  }

  // Already resolved one way or another (paid, cancelled, free) — nothing to
  // release. Treat it as a no-op success rather than an error.
  if (registration.registrationStatus === "cancelled" || registration.paymentStatus !== "pending") {
    return Response.json({ ok: true })
  }

  if (registration.stripeCheckoutSessionId) {
    // Best-effort: the session may already be expired or completed.
    await stripe.checkout.sessions.expire(registration.stripeCheckoutSessionId).catch(() => {})
  }

  await req.payload.update({
    collection: "social-session-registrations",
    id: registration.id,
    data: { registrationStatus: "cancelled" },
    req,
  })

  return Response.json({ ok: true })
}
