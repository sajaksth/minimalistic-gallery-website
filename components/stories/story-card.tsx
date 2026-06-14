import Link from "next/link"
import { Clock } from "lucide-react"

interface StoryCardProps {
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

export function StoryCard({ story }: StoryCardProps) {
  return (
    <article className="group">
      <Link href={`/stories/${story.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-5">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="uppercase tracking-widest">{story.category}</span>
            <span>/</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {story.readTime}
            </span>
          </div>
          <h3 className="font-serif text-xl lg:text-2xl font-light tracking-tight group-hover:text-muted-foreground transition-colors">
            {story.title}
          </h3>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>
          <div className="mt-4 text-xs text-muted-foreground">
            <span>{story.author}</span>
            <span className="mx-2">/</span>
            <span>{story.date}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
