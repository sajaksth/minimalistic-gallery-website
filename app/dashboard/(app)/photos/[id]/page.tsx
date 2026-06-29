import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { CoverUpload } from "@/components/dashboard/cover-upload"
import { UploadField } from "@/components/dashboard/upload-field"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { saveProject, addPhoto, deletePhoto } from "../actions"

export const dynamic = "force-dynamic"

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

type Photo = { id: string; title: string | null; src_url: string; type: string | null }

export default async function ProjectForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let project: Record<string, any> | null = null
  let photos: Photo[] = []
  if (id !== "new") {
    const { data } = await supabaseAdmin.from("projects").select("*").eq("id", id).single()
    if (!data) notFound()
    project = data
    const { data: ph } = await supabaseAdmin
      .from("photos")
      .select("id, title, src_url, type")
      .eq("project_id", id)
      .order("sort_order", { ascending: true })
    photos = (ph ?? []) as Photo[]
  }

  const v = (key: string) => (project?.[key] as string | null) ?? ""

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/photos" className="text-sm text-black/55 hover:text-black transition-colors">
        ← Photo Projects
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{id === "new" ? "New project" : "Edit project"}</h1>

      {/* Project details */}
      <form action={saveProject} className="mt-6 space-y-5">
        <input type="hidden" name="__id" value={id} />
        <div>
          <label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></label>
          <input name="title" required defaultValue={v("title")} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Blurb</label>
          <textarea name="blurb" rows={2} defaultValue={v("blurb")} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cover image</label>
          <CoverUpload defaultUrl={v("cover_url")} bucket="photos" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort order</label>
          <input type="number" name="sort_order" defaultValue={v("sort_order") || "0"} className={inputCls} />
        </div>
        <button type="submit" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors">
          {id === "new" ? "Create project" : "Save changes"}
        </button>
        {id === "new" && (
          <p className="text-xs text-black/45">Save the project first, then add photos to it.</p>
        )}
      </form>

      {/* Photos in this project */}
      {id !== "new" && (
        <div className="mt-12 border-t border-black/10 pt-8">
          <h2 className="text-lg font-semibold">Photos</h2>

          <form action={addPhoto} className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end rounded-xl border border-black/10 bg-white p-4">
            <input type="hidden" name="project_id" value={id} />
            <div className="sm:col-span-1">
              <label className="block text-xs text-black/55 mb-1">Image *</label>
              <UploadField name="src_url" bucket="photos" accept="image/*" isImage />
            </div>
            <div>
              <label className="block text-xs text-black/55 mb-1">Title</label>
              <input name="title" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-black/55 mb-1">Type</label>
              <select name="type" className={inputCls}>
                <option value="">—</option>
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
                <option value="architecture">Architecture</option>
                <option value="nature">Nature</option>
              </select>
            </div>
            <button type="submit" className="sm:col-span-3 justify-self-start rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors">
              Add photo
            </button>
          </form>

          {photos.length === 0 ? (
            <p className="mt-6 text-sm text-black/55">No photos in this project yet.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((ph) => (
                <div key={ph.id} className="relative group rounded-lg overflow-hidden border border-black/10">
                  <img src={ph.src_url} alt={ph.title ?? ""} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 px-2 py-1 text-white text-xs">
                    <span className="truncate">{ph.type ?? "—"}</span>
                    <form action={deletePhoto}>
                      <input type="hidden" name="__id" value={ph.id} />
                      <input type="hidden" name="project_id" value={id} />
                      <DeleteButton label="Delete this photo?" />
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
