"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

// Compact music player tracks
const tracks = [
  {
    title: "Morning Light",
    artist: "Ambient Horizons",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=200&q=80",
  },
  {
    title: "Coastal Dreams",
    artist: "Luna Waves",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80",
  },
  {
    title: "Evening Calm",
    artist: "Serene Collective",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80",
  },
]

// Taglines that change with each slide
const taglines = [
  "For Those Who Wander Honestly",
  "The shapes of an honest moment",
  "Fragments of what was felt",
  "Humans Before Anything.",
]

// Full-page background slideshow images
const slideshow = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&q=80",
]

// Each section is a small circle with one picture inside, scattered around the page.
const sections = [
  {
    label: "Photos",
    href: "/photos",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    left: "23%",
    top: "11%",
    size: "w-[12vmin] h-[12vmin] max-w-[100px] max-h-[100px]",
  },
  {
    label: "Stories",
    href: "/stories",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    left: "90%",
    top: "33%",
    size: "w-[15vmin] h-[15vmin] max-w-[130px] max-h-[130px]",
  },
  {
    label: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
    left: "71%",
    top: "90%",
    size: "w-[11vmin] h-[11vmin] max-w-[90px] max-h-[90px]",
  },
  {
    label: "Shop",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    left: "8%",
    top: "66%",
    size: "w-[14vmin] h-[14vmin] max-w-[118px] max-h-[118px]",
  },
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const track = tracks[currentTrack]

  const nextTrack = () => setCurrentTrack((p) => (p + 1) % tracks.length)
  const prevTrack = () => setCurrentTrack((p) => (p - 1 + tracks.length) % tracks.length)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideshow.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Single full-screen page: prevent the underlying layout from scrolling
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-white">
      {/* Full-page background slideshow */}
      {slideshow.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {/* Compact music player in the top-right corner */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 p-1.5 pr-2.5 text-white shadow-lg">
        <img
          src={track.cover}
          alt={track.title}
          className={cn("w-7 h-7 rounded-full object-cover", isPlaying && "animate-spin [animation-duration:6s]")}
        />
        <div className="min-w-0 max-w-[90px]">
          <p className="text-[10px] font-medium leading-tight truncate">{track.title}</p>
          <p className="text-[9px] text-white/60 leading-tight truncate">{track.artist}</p>
        </div>
        <div className="flex items-center gap-0.5">
          <button onClick={prevTrack} aria-label="Previous track" className="p-0.5 text-white/70 hover:text-white transition-colors">
            <SkipBack className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
          <button onClick={nextTrack} aria-label="Next track" className="p-0.5 text-white/70 hover:text-white transition-colors">
            <SkipForward className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* BareBone logo right in the middle with a changing tagline underneath */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
        <img
          src="/images/barebone-logo.png"
          alt="Bare Bone Co."
          className="w-[68vmin] h-[68vmin] max-w-[600px] max-h-[600px] object-contain mix-blend-multiply select-none"
        />
        <p
          key={currentIndex}
          className="mt-[2vmin] font-brush text-black text-[3vmin] sm:text-2xl text-center px-4 animate-in fade-in duration-700"
        >
          {taglines[currentIndex % taglines.length]}
        </p>
      </div>

      {/* Small section circles scattered around the page */}
      {sections.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          style={{ left: section.left, top: section.top }}
          className={cn(
            "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden",
            "border-2 border-white shadow-lg transition-transform duration-300 hover:scale-110",
            section.size
          )}
        >
          <img
            src={section.image}
            alt={section.label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <span className="absolute inset-0 flex items-center justify-center text-white font-brush text-base tracking-wide">
            {section.label}
          </span>
        </Link>
      ))}
    </div>
  )
}
