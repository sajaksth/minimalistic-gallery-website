import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { createSupabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

function formatRange(start: string | null, end: string | null) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  if (start && end) return `${fmt(start)} – ${fmt(end)}`
  if (start) return fmt(start)
  return ""
}

type Entry = {
  slug: string
  title: string
  trip: string | null
  location: string | null
  start_date: string | null
  end_date: string | null
  excerpt: string | null
  cover_url: string | null
}

export default async function TravelPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from("journal_entries")
    .select("slug, title, trip, location, start_date, end_date, excerpt, cover_url")
    .eq("published", true)
    .order("start_date", { ascending: false, nullsFirst: false })

  const entries = (data ?? []) as Entry[]

  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Travel Journals" />

      <section className="bg-white px-6 pb-24 max-w-5xl mx-auto">
        {entries.length === 0 ? (
          <p className="text-center font-brush text-lg text-black/45">
            No journals published yet — check back soon.
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2">
            {entries.map((e) => (
              <Link key={e.slug} href={`/travel/${e.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-neutral-100">
                  {e.cover_url && (
                    <img
                      src={e.cover_url}
                      alt={e.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-wide text-black/45">
                  {e.location && <span>{e.location}</span>}
                  {e.location && (e.start_date || e.trip) && <span>·</span>}
                  <span>{e.trip || formatRange(e.start_date, e.end_date)}</span>
                </div>
                <h2 className="font-brush text-2xl mt-1">{e.title}</h2>
                {e.excerpt && <p className="mt-1.5 text-sm text-black/65 leading-relaxed">{e.excerpt}</p>}
                <span className="mt-2 inline-flex items-center gap-1 font-brush text-base group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
