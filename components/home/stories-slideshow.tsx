"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const stories = [
  {
    id: 1,
    title: "The Lighthouse Keeper",
    excerpt: "In the forgotten corner of the coast, where the waves told secrets to the rocks, an old man kept vigil over the dying light...",
    author: "Eleanor Vance",
    category: "Fiction",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: 2,
    title: "Letters Never Sent",
    excerpt: "She found them in the attic, tied with faded ribbon - a lifetime of words meant for someone who never knew they existed...",
    author: "Marcus Chen",
    category: "Memoir",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
  },
  {
    id: 3,
    title: "The Garden of Echoes",
    excerpt: "Between the rows of lavender, time moved differently. Here, the past and present bloomed side by side...",
    author: "Sophia Reed",
    category: "Poetry",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  },
  {
    id: 4,
    title: "Midnight Conversations",
    excerpt: "The city never truly sleeps, and neither did the two strangers who found themselves at the same diner every night...",
    author: "James Morrison",
    category: "Fiction",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  },
]

export function StoriesSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const currentStory = stories[currentIndex]

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Featured Stories
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
              Words That Linger
            </h2>
          </div>
          <Link
            href="/stories"
            className="hidden sm:block text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors"
          >
            View All
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  )}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/10" />
                </div>
              ))}
            </div>

            {/* Content Side */}
            <div className="relative min-h-[280px]">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {story.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {story.readTime} read
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-light mb-4">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                    {story.excerpt}
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    By <span className="text-foreground">{story.author}</span>
                  </p>
                  <Link
                    href="/stories"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Story
                  </Link>
                </div>
              ))}

              {/* Navigation */}
              <div className="absolute bottom-0 right-0 flex items-center gap-4">
                <div className="flex gap-2 mr-4">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentIndex
                          ? "bg-foreground w-6"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                      aria-label={`Go to story ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/stories"
          className="sm:hidden mt-8 block text-center text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors"
        >
          View All Stories
        </Link>
      </div>
    </section>
  )
}
