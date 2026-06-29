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

function field(formData: FormData, key: string) {
  const v = formData.get(key)
  return v === "" || v == null ? null : String(v)
}

export async function addIllustration(formData: FormData) {
  await requireUser()
  // Image is uploaded client-side to /api/dashboard/upload; we receive a URL.
  const src_url = field(formData, "src_url")
  if (!src_url) throw new Error("Please choose an image")

  const { error } = await supabaseAdmin.from("illustrations").insert({
    src_url,
    title: field(formData, "title"),
    sort_order: Number(field(formData, "sort_order")) || 0,
  })
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/illustrations")
  revalidatePath("/illustrations")
}

export async function deleteIllustration(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const { error } = await supabaseAdmin.from("illustrations").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/illustrations")
  revalidatePath("/illustrations")
}
