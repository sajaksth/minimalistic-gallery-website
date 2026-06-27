import { SectionHeader } from "@/components/section-header"
import { StoryCard } from "@/components/stories/story-card"
import { createSupabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

function fmtDate(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

export default async function StoriesPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from("stories")
    .select("slug, title, excerpt, author, read_time, category, cover_url, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false })

  const stories = (data ?? []).map((s) => ({
    id: s.slug as string,
    title: s.title as string,
    excerpt: (s.excerpt as string) ?? "",
    author: (s.author as string) ?? "",
    date: fmtDate((s.published_at as string) ?? (s.created_at as string)),
    readTime: (s.read_time as string) ?? "",
    category: (s.category as string) ?? "",
    image: (s.cover_url as string) ?? "",
  }))

  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Stories" />
      <section className="bg-white px-6 pb-24 max-w-6xl mx-auto">
        {stories.length === 0 ? (
          <p className="text-center text-sm text-black/55">No stories published yet — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
