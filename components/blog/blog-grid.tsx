import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
}

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-serif text-2xl lg:text-3xl font-medium">
          Recent Posts
        </h2>
        <Link 
          href="/blog/archive"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View Archive
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group">
            <article className="flex flex-col h-full">
              {/* Image */}
              <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col pt-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="uppercase tracking-wider">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium leading-snug group-hover:text-accent transition-colors text-balance">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  {post.date}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors">
          Load More Posts
        </button>
      </div>
    </section>
  )
}
