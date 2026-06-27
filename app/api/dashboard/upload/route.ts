import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

// Auth-guarded image upload to Supabase Storage. Returns the public URL.
export async function POST(req: Request) {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const form = await req.formData()
  const file = form.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file" }, { status: 400 })
  }

  const allowed = ["journal", "photos", "stories"]
  const requested = String(form.get("bucket") || "journal")
  const bucket = allowed.includes(requested) ? requested : "journal"

  const ext = (file.name.split(".").pop() || "bin").toLowerCase()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabaseAdmin.storage.from(bucket).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl })
}
