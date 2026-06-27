import Link from "next/link"
import { notFound } from "next/navigation"
import { SectionHeader } from "@/components/section-header"
import { createSupabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function StoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createSupabaseServer()
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (!story) notFound()

  const meta = [story.category, story.author, story.read_time].filter(Boolean).join("  ·  ")

  return (
    <div className="bg-white text-foreground">
      <SectionHeader title={story.title} />

      <article className="max-w-2xl mx-auto px-6 pb-24">
        {meta && <p className="text-center text-xs uppercase tracking-wide text-black/45 -mt-2">{meta}</p>}

        {story.cover_url && (
          <img src={story.cover_url} alt={story.title} className="mt-8 w-full rounded-xl object-cover" />
        )}

        <div
          className="mt-8 leading-relaxed text-black/80 [&_h2]:font-brush [&_h2]:text-2xl [&_h2]:mt-7 [&_h2]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic [&_img]:rounded-lg [&_img]:my-5 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: story.body || "" }}
        />

        <div className="mt-12">
          <Link href="/stories" className="font-brush text-base text-black/55 hover:text-black transition-colors">
            ← All stories
          </Link>
        </div>
      </article>
    </div>
  )
}
