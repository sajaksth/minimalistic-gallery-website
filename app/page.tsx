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

// Full-page background slideshow images.
// position: optional object-position to control which part of a cropped photo shows.
const slideshow = [
  { src: "/gallery/1.JPEG" },
  { src: "/gallery/2.jpg" },
  { src: "/gallery/3.jpg" },
  { src: "/gallery/4.jpg", position: "center 60%" },
  { src: "/gallery/5.JPG" },
  { src: "/gallery/12.jpg" },
  { src: "/gallery/13.JPG" },
]

// Each section is a small circle with one picture inside, scattered around the page.
// recent: the 3 most recent items, shown in an arc on hover.
// arcDir: which way the arc fans out ("up" or "down") so it stays on screen.
const sections = [
  {
    label: "Photos",
    href: "/photos",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    left: "23%",
    top: "11%",
    size: "w-[10vmin] h-[10vmin] max-w-[84px] max-h-[84px]",
    delay: "0s",
    arcDir: "down" as const,
    recent: ["/gallery/1.JPEG", "/gallery/5.JPG", "/gallery/13.JPG"],
  },
  {
    label: "Stories",
    href: "/stories",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    left: "90%",
    top: "33%",
    size: "w-[12.5vmin] h-[12.5vmin] max-w-[108px] max-h-[108px]",
    delay: "1.2s",
    arcDir: "left" as const,
    recent: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&q=80",
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
    left: "71%",
    top: "90%",
    size: "w-[9vmin] h-[9vmin] max-w-[76px] max-h-[76px]",
    delay: "2.4s",
    arcDir: "up" as const,
    recent: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=200&q=80",
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    left: "8%",
    top: "66%",
    size: "w-[11.5vmin] h-[11.5vmin] max-w-[98px] max-h-[98px]",
    delay: "0.6s",
    arcDir: "right" as const,
    recent: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&q=80",
    ],
  },
]

// Positions (relative to the circle, centered at 50%/50%) for the 3 recent thumbnails.
const arcPositions = {
  up: [
    { left: "-11%", top: "15%" },
    { left: "50%", top: "-20%" },
    { left: "111%", top: "15%" },
  ],
  down: [
    { left: "-11%", top: "85%" },
    { left: "50%", top: "120%" },
    { left: "111%", top: "85%" },
  ],
  left: [
    { left: "15%", top: "-11%" },
    { left: "-20%", top: "50%" },
    { left: "15%", top: "111%" },
  ],
  right: [
    { left: "85%", top: "-11%" },
    { left: "120%", top: "50%" },
    { left: "85%", top: "111%" },
  ],
}

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
      {/* Full-page background slideshow */}
      {slideshow.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          style={slide.position ? { objectPosition: slide.position } : undefined}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {/* Compact music player in the top-right corner */}
      <div className="animate-float absolute top-3 right-3 z-20 flex items-center gap-2.5 rounded-full bg-black/40 backdrop-blur-md p-2 pr-3.5 text-white shadow-lg">
        <img
          src={track.cover}
          alt={track.title}
          className={cn("w-9 h-9 rounded-full object-cover", isPlaying && "animate-spin [animation-duration:6s]")}
        />
        <div className="min-w-0 max-w-[120px]">
          <p className="text-xs font-medium leading-tight truncate">{track.title}</p>
          <p className="text-[10px] text-white/60 leading-tight truncate">{track.artist}</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prevTrack} aria-label="Previous track" className="p-0.5 text-white/70 hover:text-white transition-colors">
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button onClick={nextTrack} aria-label="Next track" className="p-0.5 text-white/70 hover:text-white transition-colors">
            <SkipForward className="w-3.5 h-3.5" />
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
          className="w-[68vmin] h-[68vmin] max-w-[600px] max-h-[600px] object-contain invert mix-blend-screen opacity-80 select-none"
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
        <div
          key={section.href}
          style={{ left: section.left, top: section.top }}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2",
            section.size
          )}
        >
          {/* floating wrapper: gently bobs up and down */}
          <div
            className="animate-float relative w-full h-full"
            style={{ animationDelay: section.delay }}
          >
            {/* round hover sensor + nav link: clip-path makes only the circle interactive */}
            <Link
              href={section.href}
              aria-label={section.label}
              className="peer absolute inset-0 z-10 rounded-full [clip-path:circle(50%)]"
            />

            {/* pop wrapper: slight lift + scale when the round area is hovered */}
            <div className="relative w-full h-full transition-transform duration-300 peer-hover:-translate-y-1.5 peer-hover:scale-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)] pointer-events-none">
              {/* picture clipped to a circle */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src={section.image}
                  alt={section.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 peer-hover:bg-black/40 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-brush text-base tracking-wide">
                  {section.label}
                </span>
              </div>
              {/* rough hand-drawn ring like the logo */}
              <RoughRing />
            </div>

            {/* recent items, fanned out in an arc only when the circle is hovered */}
            {section.recent.map((img, i) => (
              <img
                key={img}
                src={img}
                alt=""
                aria-hidden
                style={{
                  left: arcPositions[section.arcDir][i].left,
                  top: arcPositions[section.arcDir][i].top,
                  transitionDelay: `${i * 60}ms`,
                }}
                className="absolute w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover border border-white shadow-md
                  opacity-0 scale-50 peer-hover:opacity-100 peer-hover:scale-100 transition-all duration-300 pointer-events-none"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
