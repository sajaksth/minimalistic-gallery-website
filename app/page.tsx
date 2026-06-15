"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Play, Pause, SkipBack, SkipForward, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"
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

// Starter content for the second (scroll-revealed) section.
const featured = [
  {
    label: "Latest Photos",
    href: "/photos",
    image: "/gallery/13.JPG",
    blurb: "From the road and the in-between.",
  },
  {
    label: "Latest Story",
    href: "/stories",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80",
    blurb: "Fragments of what was felt.",
  },
  {
    label: "In the Shop",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    blurb: "Prints, apparel, and small things.",
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

  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Load-time hint to help people discover the hover interaction; fades out after a few seconds.
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="scroll-smooth">
      {/* ===== Landing: full-screen hero ===== */}
      <section id="top" className="relative h-screen w-full overflow-hidden bg-white">
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
        {/* quiet index: names the areas visitors can explore */}
        <p className="mt-3 text-white/70 text-[1.5vmin] sm:text-xs uppercase tracking-[0.25em] drop-shadow text-center px-4">
          Explore — Photos · Stories · Music · Blog · Shop
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
                <span className="absolute inset-0 flex items-center justify-center text-white font-brush text-base tracking-wide transition-opacity duration-300 peer-hover:opacity-0">
                  {section.label}
                </span>
                {/* on hover, the label swaps for an "open" arrow */}
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 peer-hover:opacity-100">
                  <ArrowUpRight className="w-1/3 h-1/3" />
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

      {/* Music: a circle like the others, with the player folded in */}
      <div
        style={{ left: "30%", top: "87%" }}
        className="group absolute -translate-x-1/2 -translate-y-1/2 w-[11vmin] h-[11vmin] max-w-[96px] max-h-[96px]"
      >
        <div className="animate-float relative w-full h-full" style={{ animationDelay: "1.8s" }}>
          {/* recent tracks fan out in an arc on hover (like the other circles) */}
          {tracks.map((t, i) => (
            <img
              key={t.cover}
              src={t.cover}
              alt=""
              aria-hidden
              style={{
                left: arcPositions.up[i].left,
                top: arcPositions.up[i].top,
                transitionDelay: `${i * 60}ms`,
              }}
              className="absolute w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover border border-white shadow-md
                opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none"
            />
          ))}

          {/* track name + artist, on hover, above the circle */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="text-white text-xs font-medium truncate drop-shadow">{track.title}</p>
            <p className="text-white/70 text-[10px] truncate drop-shadow">{track.artist}</p>
          </div>

          <div className="relative w-full h-full transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)]">
            {/* navigation sensor: click the circle to open the music page */}
            <Link
              href="/music"
              aria-label="Music"
              className="absolute inset-0 rounded-full [clip-path:circle(50%)]"
            />

            {/* album art (spins while playing) */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <img
                src={track.cover}
                alt=""
                className={cn(
                  "absolute inset-0 w-full h-full object-cover",
                  isPlaying && "animate-spin [animation-duration:8s]"
                )}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            </div>
            <RoughRing />

            {/* "Music" label: only when not playing and not hovered */}
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center text-white font-brush text-base tracking-wide pointer-events-none transition-opacity duration-300 group-hover:opacity-0",
                isPlaying && "opacity-0"
              )}
            >
              Music
            </span>

            {/* controls: play/pause shows when playing or hovered; skip only on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 text-white">
              <button
                onClick={prevTrack}
                aria-label="Previous track"
                className="p-0.5 text-white/80 hover:text-white opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause" : "Play"}
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-all duration-300 shadow",
                  isPlaying
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                )}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={nextTrack}
                aria-label="Next track"
                className="p-0.5 text-white/80 hover:text-white opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* open-page cue: matches the arrow the other circles show on hover */}
            <Link
              href="/music"
              aria-label="Open music page"
              className="absolute bottom-1 right-1 text-white/90 hover:text-white opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto drop-shadow"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Load-time hint: teaches the hover interaction, then fades out */}
      <div
        className={cn(
          "absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none",
          "rounded-full bg-black/40 backdrop-blur-md px-4 py-1.5 text-white text-xs tracking-wide",
          "transition-opacity duration-700",
          showHint ? "opacity-100" : "opacity-0"
        )}
      >
        Hover a circle to peek inside
      </div>

      {/* Scroll cue: signals there's more below */}
      <a
        href="#more"
        aria-label="Scroll to explore"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
      </section>

      {/* ===== Second section: starter for real depth ===== */}
      <section
        id="more"
        className="relative min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-24"
      >
        <div className="max-w-3xl text-center">
          <p className="font-brush text-sm uppercase tracking-[0.3em] text-black/50 mb-4">
            The story so far
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
            More than a logo — a way of wandering.
          </h2>
          <p className="mt-6 text-black/70 text-lg leading-relaxed">
            BareBone Co. is a home for honest images, quiet stories, and the things we carry.
            Four worlds, one road. Wander in.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
          {featured.map((item) => (
            <Link key={item.href} href={item.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-serif text-xl">{item.label}</h3>
                  <p className="text-sm text-white/80 mt-1">{item.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <a
          href="#top"
          className="mt-16 text-xs uppercase tracking-[0.3em] text-black/50 hover:text-black transition-colors"
        >
          Back to top
        </a>
      </section>
    </div>
  )
}
