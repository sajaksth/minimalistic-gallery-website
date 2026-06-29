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

async function uploadImage(file: File) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase()
  const path = `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabaseAdmin.storage
    .from("shop")
    .upload(path, file, { contentType: file.type || undefined })
  if (error) throw new Error(error.message)
  return supabaseAdmin.storage.from("shop").getPublicUrl(path).data.publicUrl
}

export async function saveProduct(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))

  let image_url = field(formData, "cover_url")
  const cover = formData.get("cover_file")
  if (cover instanceof File && cover.size > 0) image_url = await uploadImage(cover)

  const priceRaw = field(formData, "price")
  const sortRaw = field(formData, "sort_order")

  const data = {
    name: field(formData, "name") ?? "Untitled",
    price: priceRaw ? Number(priceRaw) : 0,
    category: field(formData, "category"),
    description: field(formData, "description"),
    sizes: field(formData, "sizes"),
    image_url,
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
    sort_order: sortRaw ? Number(sortRaw) : 0,
  }

  if (id === "new") {
    const { error } = await supabaseAdmin.from("products").insert(data)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabaseAdmin.from("products").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  }

  revalidatePath("/dashboard/shop")
  revalidatePath("/shop")
  redirect("/dashboard/shop")
}

export async function deleteProduct(formData: FormData) {
  await requireUser()
  const id = String(formData.get("__id"))
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard/shop")
  revalidatePath("/shop")
}
