import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { deleteTrack } from "./actions"

export const dynamic = "force-dynamic"

type Track = { id: string; title: string; artist: string | null; cover_url: string | null }

export default async function MusicList() {
  const { data, error } = await supabaseAdmin
    .from("tracks")
    .select("id, title, artist, cover_url")
    .order("sort_order", { ascending: true })

  const tracks = (data ?? []) as Track[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Music</h1>
        <Link
          href="/dashboard/music/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New track
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load tracks. Run <code className="font-mono">supabase/music.sql</code> in Supabase first.
        </div>
      )}

      {!error && tracks.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No tracks yet. Add your first.</p>
      )}

      {tracks.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-black/55">
              <tr>
                <th className="px-4 py-3 font-medium">Track</th>
                <th className="px-4 py-3 font-medium">Artist</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {tracks.map((t) => (
                <tr key={t.id} className="border-t border-black/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {t.cover_url ? (
                        <img src={t.cover_url} alt="" className="w-9 h-9 rounded object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded bg-neutral-100" />
                      )}
                      <span className="font-medium">{t.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black/60">{t.artist ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/music/${t.id}`} className="text-black/60 hover:text-black" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={deleteTrack}>
                        <input type="hidden" name="__id" value={t.id} />
                        <DeleteButton label="Delete this track?" />
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
