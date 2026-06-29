"use server"

import { supabaseAdmin } from "@/lib/supabase/admin"

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

export async function placeOrder(input: CheckoutInput): Promise<{ id: string }> {
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

  const { data, error } = await supabaseAdmin
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
    })
    .select("id")
    .single()

  if (error) throw new Error(error.message)
  return { id: data.id as string }
}
