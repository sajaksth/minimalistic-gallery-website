import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

interface FeaturedStoryProps {
  story: {
    id: string
    title: string
    excerpt: string
    author: string
    date: string
    readTime: string
    category: string
    image: string
  }
}

export function FeaturedStory({ story }: FeaturedStoryProps) {
  return (
    <section className="py-16 lg:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground mb-4">
              <span>Featured</span>
              <span>/</span>
              <span>{story.category}</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
              {story.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed text-pretty">
              {story.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{story.author}</span>
              <span>/</span>
              <span>{story.date}</span>
              <span>/</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.readTime}
              </span>
            </div>
            <Link
              href={`/stories/${story.id}`}
              className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors"
            >
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
