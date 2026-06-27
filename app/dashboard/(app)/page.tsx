import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

async function safeCount(table: string): Promise<number | null> {
  try {
    const { count, error } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true })
    if (error) return null
    return count ?? 0
  } catch {
    return null
  }
}

export default async function Overview() {
  const [journalCount, projectCount, photoCount, storyCount] = await Promise.all([
    safeCount("journal_entries"),
    safeCount("projects"),
    safeCount("photos"),
    safeCount("stories"),
  ])

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="mt-1 text-sm text-black/55">Manage your site's content here.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/photos"
          className="rounded-xl border border-black/10 bg-white p-5 hover:border-black/25 transition-colors"
        >
          <p className="text-sm text-black/55">Photo Projects</p>
          <p className="mt-2 text-3xl font-semibold">{projectCount ?? "—"}</p>
          <p className="mt-2 text-xs text-black/45">
            {projectCount === null
              ? "Run supabase/photos.sql to set up the tables"
              : `${photoCount ?? 0} photos · Manage →`}
          </p>
        </Link>

        <Link
          href="/dashboard/journal"
          className="rounded-xl border border-black/10 bg-white p-5 hover:border-black/25 transition-colors"
        >
          <p className="text-sm text-black/55">Travel Journals</p>
          <p className="mt-2 text-3xl font-semibold">{journalCount ?? "—"}</p>
          <p className="mt-2 text-xs text-black/45">
            {journalCount === null ? "Run supabase/journal.sql to set up the table" : "Manage entries →"}
          </p>
        </Link>

        <Link
          href="/dashboard/stories"
          className="rounded-xl border border-black/10 bg-white p-5 hover:border-black/25 transition-colors"
        >
          <p className="text-sm text-black/55">Stories</p>
          <p className="mt-2 text-3xl font-semibold">{storyCount ?? "—"}</p>
          <p className="mt-2 text-xs text-black/45">
            {storyCount === null ? "Run supabase/stories.sql to set up the table" : "Manage stories →"}
          </p>
        </Link>
      </div>
    </div>
  )
}
