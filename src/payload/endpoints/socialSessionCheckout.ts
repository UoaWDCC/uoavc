import type { PayloadHandler } from "payload"
import { APIError, addDataAndFileToRequest } from "payload"
import { stripe } from "@/lib/stripe"
import { resolveRegistrationStatus } from "../hooks/socialSessionRegistrations/resolveRegistrationStatus"

// POST /api/social-sessions/:id/checkout
//
// Turns a registration intent for a *paid* social session into a Stripe
// Checkout Session. It pre-flights capacity (sharing resolveRegistrationStatus
// with the beforeChange hook), creates a pending registration to hold the spot,
// then hands back a redirect URL. Free sessions are rejected — those go through
// the direct create path on social-session-registrations. Payment success is
// reconciled later by the Stripe webhook (Ticket 2) via metadata.registrationId
// and the stored stripeCheckoutSessionId.
export const socialSessionCheckout: PayloadHandler = async (req) => {
  const id = req.routeParams?.id as string | undefined
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    return Response.json(
      { error: "Server misconfigured: NEXT_PUBLIC_SITE_URL is not set" },
      { status: 500 },
    )
  }

  await addDataAndFileToRequest(req)
  const body = (req.data ?? {}) as { guestName?: string; guestEmail?: string }

  const isMember = req.user?.collection === "users"
  const userId = isMember ? req.user?.id : undefined
  const guestName = body.guestName?.trim() || undefined
  const guestEmail = body.guestEmail?.trim() || undefined

  if (!isMember && (!guestName || !guestEmail)) {
    return Response.json(
      { error: "guestName and guestEmail are required for guest checkout" },
      { status: 400 },
    )
  }

  // Pre-flight: load the session and decide registered vs waitlisted. Throws an
  // APIError for closed sessions, duplicate sign-ups, or a full waitlist.
  let session: Awaited<ReturnType<typeof resolveRegistrationStatus>>["session"]
  let registrationStatus: "registered" | "waitlisted"
  try {
    const result = await resolveRegistrationStatus({
      req,
      sessionID: id,
      user: userId,
      guestEmail: isMember ? undefined : guestEmail,
    })
    session = result.session
    registrationStatus = result.registrationStatus
  } catch (err) {
    if (err instanceof APIError) {
      return Response.json({ error: err.message }, { status: err.status })
    }
    throw err
  }

  // Resolve price. Members pay memberPrice, everyone else nonMemberPrice. A
  // null/0 price means the session is free — reject so it uses the direct path.
  const price = isMember ? session.memberPrice : session.nonMemberPrice
  if (!price || price <= 0) {
    return Response.json(
      { error: "This session is free — register directly without checkout." },
      { status: 400 },
    )
  }

  const customerEmail = isMember ? req.user?.email : guestEmail

  // Hold the spot with a pending registration. skipConfirmationEmail stops the
  // capacity hook from emailing now — that fires on payment success instead.
  let registration: { id: string | number }
  try {
    registration = await req.payload.create({
      collection: "social-session-registrations",
      data: {
        socialSession: id,
        user: userId,
        guestName: isMember ? undefined : guestName,
        guestEmail: isMember ? undefined : guestEmail,
        registrationStatus,
        registeredAt: new Date().toISOString(),
        paymentStatus: "pending",
        // amountPaid stays null until payment succeeds (set by webhook #75)
      },
      req,
      context: { skipConfirmationEmail: true },
    })
  } catch (err) {
    if (err instanceof APIError) {
      return Response.json({ error: err.message }, { status: err.status })
    }
    throw err
  }

  // Create the hosted Stripe Checkout Session. If this throws after the
  // registration exists, delete it so it doesn't leak and occupy capacity.
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail ?? undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "nzd",
            unit_amount: Math.round(price * 100),
            product_data: { name: session.title },
          },
        },
      ],
      metadata: {
        registrationId: String(registration.id),
        socialSessionId: id,
      },
      // Auto-expire abandoned checkouts (Stripe max is 24h from now).
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      // TODO: confirm these frontend routes once the checkout result pages exist.
      success_url: `${siteUrl}/social-sessions/${id}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/social-sessions/${id}/checkout/cancelled`,
    })

    // Store the session id so the webhook can match events back to this row
    // without relying solely on Stripe metadata.
    await req.payload.update({
      collection: "social-session-registrations",
      id: registration.id,
      data: { stripeCheckoutSessionId: checkoutSession.id },
      req,
    })

    return Response.json({ url: checkoutSession.url, registrationId: registration.id })
  } catch (err) {
    await req.payload
      .delete({ collection: "social-session-registrations", id: registration.id, req })
      .catch(() => {})

    if (err instanceof APIError) {
      return Response.json({ error: err.message }, { status: err.status })
    }
    return Response.json({ error: "Failed to create checkout session" }, { status: 502 })
  }
}
