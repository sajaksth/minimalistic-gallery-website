import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { deleteProject } from "./actions"

export const dynamic = "force-dynamic"

type ProjectRow = {
  id: string
  title: string
  cover_url: string | null
  photos: { count: number }[]
}

export default async function ProjectsList() {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("id, title, cover_url, photos(count)")
    .order("sort_order", { ascending: true })

  const projects = (data ?? []) as ProjectRow[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Photo Projects</h1>
        <Link
          href="/dashboard/photos/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New project
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load projects. Run <code className="font-mono">supabase/photos.sql</code> in Supabase first.
        </div>
      )}

      {!error && projects.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No projects yet. Create your first folder.</p>
      )}

      {projects.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="rounded-xl border border-black/10 bg-white overflow-hidden">
              <Link href={`/dashboard/photos/${p.id}`} className="block">
                <div className="aspect-[4/3] bg-neutral-100">
                  {p.cover_url ? (
                    <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover" />
                  ) : null}
                </div>
              </Link>
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-black/45">{p.photos?.[0]?.count ?? 0} photos</p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/photos/${p.id}`} className="text-black/60 hover:text-black" aria-label="Edit">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <form action={deleteProject}>
                    <input type="hidden" name="__id" value={p.id} />
                    <DeleteButton label="Delete this project and all its photos?" />
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
