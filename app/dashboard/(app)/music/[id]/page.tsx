import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { CoverUpload } from "@/components/dashboard/cover-upload"
import { saveTrack } from "../actions"

export const dynamic = "force-dynamic"

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

export default async function TrackForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let row: Record<string, any> | null = null
  if (id !== "new") {
    const { data } = await supabaseAdmin.from("tracks").select("*").eq("id", id).single()
    if (!data) notFound()
    row = data
  }

  const v = (key: string) => (row?.[key] as string | null) ?? ""

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/music" className="text-sm text-black/55 hover:text-black transition-colors">
        ← Music
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{id === "new" ? "New track" : "Edit track"}</h1>

      <form action={saveTrack} className="mt-6 space-y-5">
        <input type="hidden" name="__id" value={id} />
        <input type="hidden" name="audio_url" value={v("audio_url")} />

        <div>
          <label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></label>
          <input name="title" required defaultValue={v("title")} className={inputCls} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Artist</label>
          <input name="artist" defaultValue={v("artist")} className={inputCls} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Audio file {id === "new" && <span className="text-red-500">*</span>}
          </label>
          <input type="file" name="audio_file" accept="audio/*" required={id === "new"} className="text-sm" />
          {id !== "new" && v("audio_url") && (
            <p className="mt-1 text-xs text-black/45">Current file kept unless you choose a new one.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover art</label>
          <CoverUpload defaultUrl={v("cover_url")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sort order</label>
          <input type="number" name="sort_order" defaultValue={v("sort_order") || "0"} className={inputCls} />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors">
            {id === "new" ? "Add track" : "Save changes"}
          </button>
          <Link href="/dashboard/music" className="text-sm text-black/55 hover:text-black transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
