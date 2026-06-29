"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServer } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

async function requireUser() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authorized")
}

const STATUSES = ["new", "paid", "shipped", "completed", "cancelled"]

export async function updateOrderStatus(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const status = String(formData.get("status"))
  if (!STATUSES.includes(status)) throw new Error("Invalid status")
  const { error } = await supabaseAdmin.from("orders").update({ status }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/orders")
  revalidatePath(`/dashboard/orders/${id}`)
}

export async function deleteOrder(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const { error } = await supabaseAdmin.from("orders").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/orders")
}
