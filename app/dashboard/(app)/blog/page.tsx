import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { deleteBlogPost } from "./actions"

export const dynamic = "force-dynamic"

type Post = {
  id: string
  title: string
  category: string | null
  cover_url: string | null
  published: boolean
}

export default async function BlogList() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("id, title, category, cover_url, published")
    .order("created_at", { ascending: false })

  const posts = (data ?? []) as Post[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New post
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load posts. Run <code className="font-mono">supabase/blog.sql</code> in Supabase first.
        </div>
      )}

      {!error && posts.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No posts yet. Write your first.</p>
      )}

      {posts.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-black/55">
              <tr>
                <th className="px-4 py-3 font-medium">Post</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-black/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.cover_url ? (
                        <img src={p.cover_url} alt="" className="w-9 h-9 rounded object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded bg-neutral-100" />
                      )}
                      <span className="font-medium">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black/60">{p.category ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        p.published
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                          : "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-black/55"
                      }
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/blog/${p.id}`} className="text-black/60 hover:text-black" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={deleteBlogPost}>
                        <input type="hidden" name="__id" value={p.id} />
                        <DeleteButton label="Delete this post?" />
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
