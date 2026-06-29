import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase/admin"

// Stripe needs the raw request body to verify the signature.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 })
  }

  const sig = req.headers.get("stripe-signature")
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 })

  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature"
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.order_id
    if (orderId && session.payment_status === "paid") {
      await supabaseAdmin
        .from("orders")
        .update({ payment_status: "paid", status: "paid" })
        .eq("id", orderId)
    }
  }

  return NextResponse.json({ received: true })
}
