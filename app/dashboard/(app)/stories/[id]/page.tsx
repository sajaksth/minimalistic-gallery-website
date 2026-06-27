import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { CoverUpload } from "@/components/dashboard/cover-upload"
import { JournalEditor } from "@/components/dashboard/journal-editor"
import { saveStory } from "../actions"

export const dynamic = "force-dynamic"

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

export default async function StoryForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let row: Record<string, any> | null = null
  if (id !== "new") {
    const { data } = await supabaseAdmin.from("stories").select("*").eq("id", id).single()
    if (!data) notFound()
    row = data
  }

  const v = (key: string) => (row?.[key] as string | null) ?? ""

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/stories" className="text-sm text-black/55 hover:text-black transition-colors">
        ← Stories
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{id === "new" ? "New story" : "Edit story"}</h1>

      <form action={saveStory} className="mt-6 space-y-5">
        <input type="hidden" name="__id" value={id} />

        <div>
          <label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></label>
          <input name="title" required defaultValue={v("title")} className={inputCls} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="category" defaultValue={v("category")} className={inputCls}>
              <option value="">—</option>
              <option value="Fiction">Fiction</option>
              <option value="Poetry">Poetry</option>
              <option value="Memoir">Memoir</option>
              <option value="Essay">Essay</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input name="author" defaultValue={v("author")} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Read time</label>
            <input name="read_time" defaultValue={v("read_time")} placeholder="8 min" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover image</label>
          <CoverUpload defaultUrl={v("cover_url")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea name="excerpt" rows={2} defaultValue={v("excerpt")} className={inputCls} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Story</label>
          <JournalEditor name="body" defaultValue={v("body")} bucket="stories" />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={!!row?.published} className="h-4 w-4" />
          Published (visible on the public site)
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors">
            {id === "new" ? "Create story" : "Save changes"}
          </button>
          <Link href="/dashboard/stories" className="text-sm text-black/55 hover:text-black transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
