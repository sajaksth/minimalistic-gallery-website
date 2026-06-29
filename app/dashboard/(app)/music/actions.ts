"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
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

export async function saveTrack(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))

  // Files are uploaded client-side to /api/dashboard/upload; we receive URLs.
  const audio_url = field(formData, "audio_url")
  const cover_url = field(formData, "cover_url")

  if (!audio_url) throw new Error("Please upload an audio file")

  const data = {
    title: field(formData, "title") ?? "Untitled",
    artist: field(formData, "artist"),
    audio_url,
    cover_url,
    sort_order: Number(field(formData, "sort_order")) || 0,
  }

  if (id === "new") {
    const { error } = await supabaseAdmin.from("tracks").insert(data)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabaseAdmin.from("tracks").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  }

  revalidatePath("/dashboard/music")
  redirect("/dashboard/music")
}

export async function deleteTrack(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const { error } = await supabaseAdmin.from("tracks").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/music")
}
