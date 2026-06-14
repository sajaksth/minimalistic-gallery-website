import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface FeaturedPostProps {
  post: {
    id: string
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
    image: string
    author: {
      name: string
      avatar: string
    }
  }
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
      <Link href={`/blog/${post.id}`} className="group block">
        <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-card rounded-lg overflow-hidden border border-border">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs uppercase tracking-wider rounded-full">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 lg:p-10 lg:pr-12">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {post.category}
            </span>
            <h2 className="mt-3 font-serif text-2xl lg:text-3xl font-medium leading-tight text-balance group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.date} · {post.readTime}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-sm font-medium group-hover:text-accent transition-colors">
                Read More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </section>
  )
}
