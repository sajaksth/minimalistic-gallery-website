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

async function upload(file: File, prefix: string) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase()
  const path = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabaseAdmin.storage
    .from("music")
    .upload(path, file, { contentType: file.type || undefined })
  if (error) throw new Error(error.message)
  return supabaseAdmin.storage.from("music").getPublicUrl(path).data.publicUrl
}

export async function saveTrack(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))

  let audio_url = field(formData, "audio_url")
  const audio = formData.get("audio_file")
  if (audio instanceof File && audio.size > 0) audio_url = await upload(audio, "audio")

  let cover_url = field(formData, "cover_url")
  const cover = formData.get("cover_file")
  if (cover instanceof File && cover.size > 0) cover_url = await upload(cover, "cover")

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
