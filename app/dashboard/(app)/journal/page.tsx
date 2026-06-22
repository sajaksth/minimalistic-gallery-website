import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { deleteJournal } from "./actions"

export const dynamic = "force-dynamic"

type Entry = {
  id: string
  title: string
  trip: string | null
  location: string | null
  entry_date: string | null
  published: boolean
}

export default async function JournalList() {
  const { data, error } = await supabaseAdmin
    .from("journal_entries")
    .select("id, title, trip, location, entry_date, published")
    .order("entry_date", { ascending: false, nullsFirst: false })

  const entries = (data ?? []) as Entry[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Travel Journals</h1>
        <Link
          href="/dashboard/journal/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New entry
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load entries. Open Supabase → SQL Editor and run{" "}
          <code className="font-mono">supabase/journal.sql</code> to create the table.
        </div>
      )}

      {!error && entries.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No entries yet. Create your first one.</p>
      )}

      {entries.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-black/55">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Trip</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium">{e.title}</td>
                  <td className="px-4 py-3 text-black/60">{e.trip ?? "—"}</td>
                  <td className="px-4 py-3 text-black/60">{e.entry_date ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        e.published
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                          : "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-black/55"
                      }
                    >
                      {e.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/dashboard/journal/${e.id}`}
                        className="inline-flex items-center gap-1 text-black/60 hover:text-black transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={deleteJournal}>
                        <input type="hidden" name="__id" value={e.id} />
                        <DeleteButton />
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
