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

async function upload(file: File) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabaseAdmin.storage
    .from("illustrations")
    .upload(path, file, { contentType: file.type || undefined })
  if (error) throw new Error(error.message)
  return supabaseAdmin.storage.from("illustrations").getPublicUrl(path).data.publicUrl
}

export async function addIllustration(formData: FormData) {
  await requireUser()
  const file = formData.get("image_file")
  if (!(file instanceof File) || file.size === 0) throw new Error("Please choose an image")

  const src_url = await upload(file)
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
