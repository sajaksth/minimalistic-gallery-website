import Link from "next/link"
import { SectionHeader } from "@/components/section-header"
import { createSupabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Blog | BareBone",
  description: "Notes from the field — thoughts, process, and small detours.",
}

function fmtDate(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export default async function BlogPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, category, read_time, cover_url, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false })

  const posts = (data ?? []).map((p) => ({
    slug: p.slug as string,
    title: p.title as string,
    excerpt: (p.excerpt as string) ?? "",
    date: fmtDate((p.published_at as string) ?? (p.created_at as string)),
    readTime: (p.read_time as string) ?? "",
    category: (p.category as string) ?? "",
    image: (p.cover_url as string) ?? "",
  }))

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SectionHeader
        title="Blog"
        description="Notes from the field — thoughts, process, and small detours."
      />

      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-black/55">No posts published yet — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="flex flex-col h-full">
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-secondary">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col pt-5">
                    <div className="flex items-center gap-3 text-xs text-black/45">
                      {post.category && <span className="uppercase tracking-wider">{post.category}</span>}
                      {post.category && post.readTime && (
                        <span className="w-1 h-1 rounded-full bg-black/30" />
                      )}
                      {post.readTime && <span>{post.readTime}</span>}
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-medium leading-snug group-hover:text-accent transition-colors text-balance">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-black/55 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    )}
                    {post.date && <p className="mt-auto pt-4 text-xs text-black/45">{post.date}</p>}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-brush text-3xl lg:text-4xl text-black">Never Miss a Post</h2>
          <p className="mt-4 text-black/55 leading-relaxed">
            Subscribe to our weekly newsletter for the latest stories, insights, and creative inspiration
            delivered directly to your inbox.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white border border-black/15 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white text-sm font-brush rounded-full hover:scale-105 transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
