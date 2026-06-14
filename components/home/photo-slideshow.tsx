"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    title: "Alpine Serenity",
    category: "Landscape",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    title: "Golden Hour",
    category: "Nature",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80",
    title: "Mountain Mist",
    category: "Landscape",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
    title: "Foggy Valley",
    category: "Nature",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80",
    title: "Forest Path",
    category: "Nature",
  },
]

export function PhotoSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Featured Photography
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
              Visual Stories
            </h2>
          </div>
          <Link
            href="/photos"
            className="hidden sm:block text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors"
          >
            View All
          </Link>
        </div>

        <div 
          className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 bg-gradient-to-t from-foreground/60 to-transparent">
                <p className="text-xs uppercase tracking-widest text-background/70 mb-1">
                  {photo.category}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl text-background font-light">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-background text-foreground transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-background text-foreground transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-background w-6"
                    : "bg-background/50 hover:bg-background/70"
                )}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Link
          href="/photos"
          className="sm:hidden mt-6 block text-center text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors"
        >
          View All Photos
        </Link>
      </div>
    </section>
  )
}
