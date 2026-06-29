"use server"

import { supabaseAdmin } from "@/lib/supabase/admin"
import { stripe, siteUrl } from "@/lib/stripe"

export type CheckoutItem = {
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export type CheckoutInput = {
  customer_name: string
  email: string
  address?: string
  city?: string
  postal_code?: string
  country?: string
  note?: string
  items: CheckoutItem[]
}

// Creates the order (unpaid) + a Stripe Checkout Session, and returns the
// hosted-checkout URL for the browser to redirect to.
export async function createCheckoutSession(input: CheckoutInput): Promise<{ url: string }> {
  const customer_name = (input.customer_name || "").trim()
  const email = (input.email || "").trim()
  if (!customer_name) throw new Error("Please enter your name")
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Please enter a valid email")

  const items = (input.items || [])
    .filter((i) => i && i.quantity > 0)
    .map((i) => ({
      name: String(i.name),
      price: Number(i.price) || 0,
      quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)),
      image: String(i.image || ""),
      category: String(i.category || ""),
    }))

  if (items.length === 0) throw new Error("Your cart is empty")

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const item_count = items.reduce((s, i) => s + i.quantity, 0)

  // 1) Persist the order up front so we never lose it.
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .insert({
      customer_name,
      email,
      address: input.address?.trim() || null,
      city: input.city?.trim() || null,
      postal_code: input.postal_code?.trim() || null,
      country: input.country?.trim() || null,
      note: input.note?.trim() || null,
      items,
      item_count,
      subtotal,
      status: "new",
      payment_status: "unpaid",
    })
    .select("id")
    .single()

  if (error) throw new Error(error.message)
  const orderId = order.id as string

  // 2) Create the Stripe Checkout Session.
  const base = siteUrl()
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: items.map((i) => ({
      quantity: i.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(i.price * 100),
        product_data: {
          name: i.name,
          ...(i.image && i.image.startsWith("http") ? { images: [i.image] } : {}),
        },
      },
    })),
    metadata: { order_id: orderId },
    success_url: `${base}/checkout/success?id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/checkout?canceled=1`,
  })

  // 3) Save the session id for reconciliation.
  await supabaseAdmin.from("orders").update({ stripe_session_id: session.id }).eq("id", orderId)

  if (!session.url) throw new Error("Could not start checkout")
  return { url: session.url }
}
