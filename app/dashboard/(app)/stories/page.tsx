import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { deleteStory } from "./actions"

export const dynamic = "force-dynamic"

type Story = {
  id: string
  title: string
  category: string | null
  author: string | null
  published: boolean
}

export default async function StoriesList() {
  const { data, error } = await supabaseAdmin
    .from("stories")
    .select("id, title, category, author, published")
    .order("created_at", { ascending: false })

  const stories = (data ?? []) as Story[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Stories</h1>
        <Link
          href="/dashboard/stories/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New story
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load stories. Run <code className="font-mono">supabase/stories.sql</code> in Supabase first.
        </div>
      )}

      {!error && stories.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No stories yet. Write your first one.</p>
      )}

      {stories.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-black/55">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Author</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {stories.map((s) => (
                <tr key={s.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium">{s.title}</td>
                  <td className="px-4 py-3 text-black/60">{s.category ?? "—"}</td>
                  <td className="px-4 py-3 text-black/60">{s.author ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        s.published
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                          : "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-black/55"
                      }
                    >
                      {s.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/stories/${s.id}`} className="text-black/60 hover:text-black" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={deleteStory}>
                        <input type="hidden" name="__id" value={s.id} />
                        <DeleteButton label="Delete this story?" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
