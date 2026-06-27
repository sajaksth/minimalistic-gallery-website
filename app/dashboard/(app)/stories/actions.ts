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

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "story"
}

async function uniqueSlug(base: string) {
  let slug = base
  for (let i = 0; i < 50; i++) {
    const { data } = await supabaseAdmin.from("stories").select("id").eq("slug", slug).maybeSingle()
    if (!data) return slug
    slug = `${base}-${i + 2}`
  }
  return `${base}-${Date.now().toString(36)}`
}

async function uploadCover(file: File) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase()
  const path = `cover-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabaseAdmin.storage
    .from("stories")
    .upload(path, file, { contentType: file.type || undefined })
  if (error) throw new Error(error.message)
  return supabaseAdmin.storage.from("stories").getPublicUrl(path).data.publicUrl
}

export async function saveStory(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const title = field(formData, "title") ?? "Untitled"

  let cover_url = field(formData, "cover_url")
  const cover = formData.get("cover_file")
  if (cover instanceof File && cover.size > 0) cover_url = await uploadCover(cover)

  const published = formData.get("published") === "on"
  const data = {
    title,
    category: field(formData, "category"),
    author: field(formData, "author"),
    read_time: field(formData, "read_time"),
    excerpt: field(formData, "excerpt"),
    body: field(formData, "body"),
    cover_url,
    published,
    published_at: published ? new Date().toISOString() : null,
  }

  if (id === "new") {
    const slug = await uniqueSlug(slugify(title))
    const { error } = await supabaseAdmin.from("stories").insert({ ...data, slug })
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabaseAdmin.from("stories").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  }

  revalidatePath("/dashboard/stories")
  revalidatePath("/stories")
  redirect("/dashboard/stories")
}

export async function deleteStory(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const { error } = await supabaseAdmin.from("stories").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/stories")
  revalidatePath("/stories")
}
