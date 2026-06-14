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
  "/gallery/1.JPEG",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.JPG",
  "/gallery/6.JPG",
  "/gallery/7.JPG",
  "/gallery/8.JPG",
  "/gallery/9.JPG",
  "/gallery/10.JPG",
  "/gallery/11.JPEG",
  "/gallery/11.JPG",
  "/gallery/12.jpg",
  "/gallery/13.JPG",
  "/gallery/14.jpg",
  "/gallery/16.JPG",
  "/gallery/17.webp",
]

// Each section is a small circle with one picture inside, scattered around the page.
const sections = [
  {
    label: "Photos",
    href: "/photos",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    left: "23%",
    top: "11%",
    size: "w-[10vmin] h-[10vmin] max-w-[84px] max-h-[84px]",
    delay: "0s",
  },
  {
    label: "Stories",
    href: "/stories",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    left: "90%",
    top: "33%",
    size: "w-[12.5vmin] h-[12.5vmin] max-w-[108px] max-h-[108px]",
    delay: "1.2s",
  },
  {
    label: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
    left: "71%",
    top: "90%",
    size: "w-[9vmin] h-[9vmin] max-w-[76px] max-h-[76px]",
    delay: "2.4s",
  },
  {
    label: "Shop",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    left: "8%",
    top: "66%",
    size: "w-[11.5vmin] h-[11.5vmin] max-w-[98px] max-h-[98px]",
    delay: "0.6s",
  },
]

// A rough, hand-drawn circle ring that echoes the logo's brushy circle
function RoughRing() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute -inset-[6px] w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none"
    >
      <defs>
        <filter id="roughRing">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="1.2" filter="url(#roughRing)" />
    </svg>
  )
}

// A rough, hand-drawn pill ring for the music player
function RoughPill() {
  return (
    <svg
      viewBox="0 0 200 56"
      preserveAspectRatio="none"
      className="absolute -inset-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] pointer-events-none"
    >
      <defs>
        <filter id="roughPill">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
      <rect
        x="2" y="2" width="196" height="52" rx="26" ry="26"
        fill="none" stroke="white" strokeWidth="1.2"
        vectorEffect="non-scaling-stroke" filter="url(#roughPill)"
      />
    </svg>
  )
}

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
      {/* Full-page background slideshow: whole picture shown, blurred fill behind */}
      {slideshow.map((src, index) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          {/* blurred copy fills the frame so there are no empty bars */}
          <img
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
          />
          {/* the full, uncropped picture */}
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      ))}

      {/* Compact music player in the top-right corner */}
      <div className="animate-float absolute top-3 right-3 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md p-1.5 pr-2.5 text-white shadow-lg">
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
        {/* rough hand-drawn ring like the logo */}
        <RoughPill />
      </div>

      {/* BareBone logo right in the middle with a changing tagline underneath */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
        <img
          src="/images/barebone-logo.png"
          alt="Bare Bone Co."
          className="w-[68vmin] h-[68vmin] max-w-[600px] max-h-[600px] object-contain invert mix-blend-screen select-none"
        />
        <p
          key={currentIndex}
          className="mt-[2vmin] font-brush text-white text-[3vmin] sm:text-2xl text-center px-4 drop-shadow-lg animate-in fade-in duration-700"
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
            "group absolute -translate-x-1/2 -translate-y-1/2",
            section.size
          )}
        >
          {/* floating wrapper: gently bobs up and down */}
          <div
            className="animate-float relative w-full h-full transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)]"
            style={{ animationDelay: section.delay }}
          >
            {/* picture clipped to a circle */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <img
                src={section.image}
                alt={section.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-brush text-base tracking-wide">
                {section.label}
              </span>
            </div>
            {/* rough hand-drawn ring like the logo */}
            <RoughRing />
          </div>
        </Link>
      ))}
    </div>
  )
}
