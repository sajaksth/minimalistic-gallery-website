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

function num(formData: FormData, key: string) {
  const v = field(formData, key)
  return v == null ? 0 : Number(v) || 0
}

function slugify(s: string) {
  return (
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "project"
  )
}

async function uniqueProjectSlug(base: string) {
  let slug = base
  for (let i = 0; i < 50; i++) {
    const { data } = await supabaseAdmin.from("projects").select("id").eq("slug", slug).maybeSingle()
    if (!data) return slug
    slug = `${base}-${i + 2}`
  }
  return `${base}-${Date.now().toString(36)}`
}

async function upload(file: File, prefix: string) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase()
  const path = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabaseAdmin.storage
    .from("photos")
    .upload(path, file, { contentType: file.type || undefined })
  if (error) throw new Error(error.message)
  return supabaseAdmin.storage.from("photos").getPublicUrl(path).data.publicUrl
}

export async function saveProject(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const title = field(formData, "title") ?? "Untitled"

  let cover_url = field(formData, "cover_url")
  const cover = formData.get("cover_file")
  if (cover instanceof File && cover.size > 0) cover_url = await upload(cover, "cover")

  const data = {
    title,
    blurb: field(formData, "blurb"),
    cover_url,
    sort_order: num(formData, "sort_order"),
  }

  if (id === "new") {
    const slug = await uniqueProjectSlug(slugify(title))
    const { data: inserted, error } = await supabaseAdmin
      .from("projects")
      .insert({ ...data, slug })
      .select("id")
      .single()
    if (error) throw new Error(error.message)
    revalidatePath("/dashboard/photos")
    revalidatePath("/photos")
    redirect(`/dashboard/photos/${inserted!.id}`)
  } else {
    const { error } = await supabaseAdmin.from("projects").update(data).eq("id", id)
    if (error) throw new Error(error.message)
    revalidatePath("/dashboard/photos")
    revalidatePath("/photos")
    redirect("/dashboard/photos")
  }
}

export async function deleteProject(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/photos")
  revalidatePath("/photos")
}

export async function addPhoto(formData: FormData) {
  await requireUser()
  const projectId = String(formData.get("project_id"))
  // Image is uploaded client-side to /api/dashboard/upload; we receive a URL.
  const src_url = field(formData, "src_url")
  if (!src_url) throw new Error("Please choose an image")

  const { error } = await supabaseAdmin.from("photos").insert({
    project_id: projectId,
    src_url,
    title: field(formData, "title"),
    type: field(formData, "type"),
    sort_order: num(formData, "sort_order"),
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/photos/${projectId}`)
  revalidatePath("/photos")
}

export async function deletePhoto(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const projectId = String(formData.get("project_id"))
  const { error } = await supabaseAdmin.from("photos").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/photos/${projectId}`)
  revalidatePath("/photos")
}
