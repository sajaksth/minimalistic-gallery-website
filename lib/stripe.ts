import "server-only"
import Stripe from "stripe"

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  // Surfaced at call time rather than crashing the whole app on import.
  console.warn("STRIPE_SECRET_KEY is not set — checkout will fail until it is configured.")
}

export const stripe = new Stripe(key ?? "", {
  apiVersion: "2025-08-27.basil",
})

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}
