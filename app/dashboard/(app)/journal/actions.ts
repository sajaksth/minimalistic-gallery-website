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

export async function saveJournal(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))

  const published = formData.get("published") === "on"
  const data = {
    title: field(formData, "title"),
    slug: field(formData, "slug"),
    trip: field(formData, "trip"),
    location: field(formData, "location"),
    entry_date: field(formData, "entry_date"),
    excerpt: field(formData, "excerpt"),
    body: field(formData, "body"),
    cover_url: field(formData, "cover_url"),
    published,
    published_at: published ? new Date().toISOString() : null,
  }

  if (id === "new") {
    const { error } = await supabaseAdmin.from("journal_entries").insert(data)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabaseAdmin.from("journal_entries").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  }

  revalidatePath("/dashboard/journal")
  redirect("/dashboard/journal")
}

export async function deleteJournal(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const { error } = await supabaseAdmin.from("journal_entries").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/journal")
}
