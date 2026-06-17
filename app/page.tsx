"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Play, Pause, SkipBack, SkipForward, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMusic } from "@/components/music-provider"
import { RoughPill } from "@/components/rough-pill"

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
    left: "20%",
    top: "15%",
    size: "w-[10vmin] h-[10vmin] max-w-[84px] max-h-[84px]",
    delay: "0s",
    arcDir: "up" as const,
    recent: ["/gallery/1.JPEG", "/gallery/5.JPG", "/gallery/13.JPG"],
  },
  {
    label: "Stories",
    href: "/stories",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    left: "22%",
    top: "86%",
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
    left: "13%",
    top: "54%",
    size: "w-[9vmin] h-[9vmin] max-w-[76px] max-h-[76px]",
    delay: "2.4s",
    arcDir: "left" as const,
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
    left: "80%",
    top: "85%",
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
    { left: "-22%", top: "12%" },
    { left: "50%", top: "-32%" },
    { left: "122%", top: "12%" },
  ],
  down: [
    { left: "-22%", top: "88%" },
    { left: "50%", top: "132%" },
    { left: "122%", top: "88%" },
  ],
  left: [
    { left: "12%", top: "-22%" },
    { left: "-32%", top: "50%" },
    { left: "12%", top: "122%" },
  ],
  right: [
    { left: "88%", top: "-22%" },
    { left: "132%", top: "50%" },
    { left: "88%", top: "122%" },
  ],
}

// Content for the scroll-below section: every world, with a recents slideshow + narrative.
const pageSections = [
  {
    label: "Photos",
    href: "/photos",
    narrative:
      "Visual narratives caught in passing — the road, the light, and the quiet in-between moments.",
    images: ["/gallery/1.JPEG", "/gallery/5.JPG", "/gallery/13.JPG"],
  },
  {
    label: "Stories",
    href: "/stories",
    narrative:
      "Short fiction and honest fragments — the shapes of a feeling, written down before it fades.",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
    ],
  },
  {
    label: "Music",
    href: "/music",
    narrative:
      "Soundscapes for the wander — slow mornings and long roads. Play it loud, let it linger.",
    images: [
      "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    narrative:
      "Notes from the field — thoughts, process, and the small detours worth writing about.",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80",
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    narrative:
      "Prints, apparel, and small things made with care — carry a piece of the journey with you.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    ],
  },
]

// A rough, hand-drawn rectangular frame (sketchy ink border) for the section cards.
function RoughFrame() {
  return (
    <svg
      viewBox="0 0 200 150"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <defs>
        <filter id="roughFrame">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </defs>
      <rect
        x="4" y="4" width="192" height="142" rx="10"
        fill="none" stroke="black" strokeWidth="1.5"
        vectorEffect="non-scaling-stroke" filter="url(#roughFrame)"
      />
    </svg>
  )
}

// A hand-drawn divider line.
function SketchLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={cn("h-3", className)}>
      <defs>
        <filter id="roughLine">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
      <path d="M2 6 H198" fill="none" stroke="currentColor" strokeWidth="2" filter="url(#roughLine)" />
    </svg>
  )
}

// One "world" in the scroll-below section: a recents slideshow + narrative + see-more cue.
function SectionFeature({
  section,
}: {
  section: { label: string; href: string; narrative: string; images: string[] }
}) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((p) => (p + 1) % section.images.length),
      3200
    )
    return () => clearInterval(interval)
  }, [section.images.length])

  return (
    <Link href={section.href} className="group block">
      {/* recents slideshow inside a sketchy frame */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
        {section.images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        <RoughFrame />
      </div>
      <h3 className="font-brush text-2xl mt-4">{section.label}</h3>
      <p className="mt-1.5 text-black/65 leading-relaxed text-sm">{section.narrative}</p>
      <span className="mt-2 inline-flex items-center gap-1 font-brush text-base text-black group-hover:gap-2 transition-all">
        See more <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
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

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Shared, site-wide music state so playback continues across pages.
  const { tracks, track, isPlaying, toggle, next: nextTrack, prev: prevTrack } = useMusic()

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
            <div className="relative w-full h-full transition-transform duration-300 peer-hover:-translate-y-1.5 peer-hover:scale-[1.18] drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)] pointer-events-none">
              {/* picture clipped to a circle */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src={section.image}
                  alt={section.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              {/* rough hand-drawn ring like the logo */}
              <RoughRing />
            </div>

            {/* label at rest -> open-arrow on hover (direct siblings of the peer so peer-hover works) */}
            <span className="absolute inset-0 flex items-center justify-center text-white font-brush text-base tracking-wide pointer-events-none transition-opacity duration-300 peer-hover:opacity-0">
              {section.label}
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 pointer-events-none transition-opacity duration-300 peer-hover:opacity-100">
              <ArrowUpRight className="w-1/3 h-1/3" />
            </span>

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
                className="absolute w-[60%] h-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover border-2 border-white shadow-lg
                  opacity-0 scale-50 peer-hover:opacity-100 peer-hover:scale-100 transition-all duration-300 pointer-events-none"
              />
            ))}
          </div>
        </div>
      ))}

      {/* Music: a circle like the others, with the player folded in */}
      <div
        style={{ left: "86%", top: "30%" }}
        className="group absolute -translate-x-1/2 -translate-y-1/2 w-[11vmin] h-[11vmin] max-w-[96px] max-h-[96px]"
      >
        <div className="animate-float relative w-full h-full" style={{ animationDelay: "1.8s" }}>
          {/* recent tracks fan out in an arc on hover (like the other circles) */}
          {tracks.slice(0, 3).map((t, i) => (
            <img
              key={t.cover}
              src={t.cover}
              alt=""
              aria-hidden
              style={{
                left: arcPositions.down[i].left,
                top: arcPositions.down[i].top,
                transitionDelay: `${i * 60}ms`,
              }}
              className="absolute w-[60%] h-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover border-2 border-white shadow-lg
                opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none"
            />
          ))}

          {/* track name + artist, on hover, above the circle */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="text-white text-xs font-medium truncate drop-shadow">{track.title}</p>
            <p className="text-white/70 text-[10px] truncate drop-shadow">{track.artist}</p>
          </div>

          <div className="relative w-full h-full transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.18] drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)]">
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
                onClick={toggle}
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

      {/* ===== Second section: the worlds, sketched out ===== */}
      <section id="more" className="relative bg-white text-black px-6 py-20 sm:py-24">
        {/* brand header */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/barebone-logo.png"
            alt="Bare Bone Co."
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain select-none"
          />
          <h2 className="font-brush text-3xl sm:text-4xl mt-1">Bare Bone Co.</h2>
          <p className="mt-3 max-w-xl font-brush text-lg text-black/60">
            Honest images, quiet sounds, and the things we carry — five worlds, one road.
          </p>
          <SketchLine className="w-44 mt-6 text-black/40" />

          {/* quick tabs, consistent with the rest of the site */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {pageSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="relative rounded-full px-4 py-1.5 font-brush text-sm bg-white text-black/55 hover:text-black transition-transform hover:-translate-y-0.5"
              >
                {section.label}
                <RoughPill />
              </Link>
            ))}
          </div>
        </div>

        {/* the five worlds */}
        <div className="mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-6xl">
          {pageSections.map((section) => (
            <SectionFeature key={section.href} section={section} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-brush text-base text-black/60 hover:text-black transition-colors"
          >
            Back to top
          </a>
        </div>
      </section>
    </div>
  )
}
