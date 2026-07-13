import Stripe from "stripe"

let client: Stripe | null = null

// Lazily construct the Stripe client on first use. The key is only required at
// runtime when we actually talk to Stripe — not when the module is imported.
// `next build` imports every route while collecting page data, so constructing
// (or throwing) at import time would fail the build in any environment without
// STRIPE_SECRET_KEY (e.g. CI), even though the build never calls Stripe.
function getClient(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is required")
    }
    client = new Stripe(key, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    })
  }
  return client
}

// Preserve the `stripe.foo.bar(...)` API while deferring construction to the
// first property access, so importing this module has no side effects.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const c = getClient()
    return Reflect.get(c, prop, c)
  },
})
