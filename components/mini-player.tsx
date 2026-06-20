"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Play, Pause, SkipBack, SkipForward, Menu } from "lucide-react"
import { useMusic } from "@/components/music-provider"
import { RoughBox } from "@/components/rough-pill"
import { cn } from "@/lib/utils"

// The player's border doubles as the seek track: a dot travels around the
// pill as the song plays, pops on hover, and can be dragged to scrub.
function SeekRing({ progress, onSeek }: { progress: number; onSeek: (fraction: number) => void }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const trackRef = useRef<SVGPathElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [len, setLen] = useState(0)
  const [hover, setHover] = useState(false)
  const dragging = useRef(false)

  // measure the pill so the ring matches its exact shape
  useEffect(() => {
    const parent = svgRef.current?.parentElement
    if (!parent) return
    const ro = new ResizeObserver(() => {
      const r = parent.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    })
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  const pad = 1.5
  const { w, h } = size
  const r = Math.max(0, h / 2 - pad)
  const d =
    w && h
      ? `M ${pad} ${h / 2} L ${pad} ${pad + r} A ${r} ${r} 0 0 1 ${pad + r} ${pad} L ${w - pad - r} ${pad} A ${r} ${r} 0 0 1 ${w - pad} ${pad + r} L ${w - pad} ${h - pad - r} A ${r} ${r} 0 0 1 ${w - pad - r} ${h - pad} L ${pad + r} ${h - pad} A ${r} ${r} 0 0 1 ${pad} ${h - pad - r} Z`
      : ""

  useEffect(() => {
    if (trackRef.current) setLen(trackRef.current.getTotalLength())
  }, [d])

  const pointAt = (frac: number) => {
    const p = trackRef.current
    if (!p || !len) return { x: 0, y: 0 }
    const pt = p.getPointAtLength((((frac % 1) + 1) % 1) * len)
    return { x: pt.x, y: pt.y }
  }
  const dot = pointAt(progress)

  const seekFromPointer = (clientX: number, clientY: number) => {
    const p = trackRef.current
    const svg = svgRef.current
    if (!p || !svg || !len) return
    const rect = svg.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    let best = 0
    let bestDist = Infinity
    const samples = 140
    for (let i = 0; i <= samples; i++) {
      const l = (i / samples) * len
      const pt = p.getPointAtLength(l)
      const dist = (pt.x - x) ** 2 + (pt.y - y) ** 2
      if (dist < bestDist) {
        bestDist = dist
        best = l
      }
    }
    onSeek(best / len)
  }

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) seekFromPointer(e.clientX, e.clientY)
    }
    const up = () => {
      dragging.current = false
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len])

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full overflow-visible" style={{ pointerEvents: "none" }}>
      {/* faint full-border track */}
      <path ref={trackRef} d={d} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth={1.5} />
      {/* progress fill — darker line that grows as the song plays */}
      {len > 0 && (
        <path
          d={d}
          fill="none"
          stroke="rgba(0,0,0,0.85)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - progress)}
        />
      )}
      {/* wide invisible hit area for click/drag on the border */}
      <path
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        style={{ pointerEvents: "stroke", cursor: "pointer" }}
        onPointerDown={(e) => {
          dragging.current = true
          seekFromPointer(e.clientX, e.clientY)
        }}
      />
      {/* the travelling dot */}
      {len > 0 && (
        <circle
          cx={dot.x}
          cy={dot.y}
          r={hover ? 5 : 3}
          fill="black"
          stroke="white"
          strokeWidth={1}
          style={{ pointerEvents: "auto", cursor: "grab", transition: "r 120ms" }}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onPointerDown={(e) => {
            e.stopPropagation()
            dragging.current = true
          }}
        />
      )}
    </svg>
  )
}

// Floating player shown on every page except the music page.
export function MiniPlayer() {
  const pathname = usePathname()
  const { tracks, current, track, isPlaying, currentTime, duration, toggle, next, prev, select, seek } = useMusic()
  const [listOpen, setListOpen] = useState(false)

  // The music page is the player itself. Elsewhere (incl. home) it floats and
  // stays in sync with the home Music circle via the shared music context.
  if (pathname === "/music") return null

  return (
    <div className="fixed top-10 right-4 z-50">
      <div className="animate-float relative flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur shadow-md p-1.5 pr-3">
        {/* border-as-seeker */}
        <SeekRing progress={duration > 0 ? currentTime / duration : 0} onSeek={(f) => seek(f * duration)} />
        <img
          src={track.cover}
          alt=""
          className={cn(
            "w-8 h-8 rounded-full object-cover",
            isPlaying && "animate-spin [animation-duration:6s]"
          )}
        />
        <div className="hidden md:block min-w-0 max-w-[120px]">
          <p className="text-xs font-medium leading-tight truncate text-black">{track.title}</p>
          <p className="text-[10px] text-black/50 leading-tight truncate">{track.artist}</p>
        </div>
        <button
          onClick={prev}
          aria-label="Previous track"
          className="p-1 text-black/50 hover:text-black transition-colors"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
        <button
          onClick={next}
          aria-label="Next track"
          className="p-1 text-black/50 hover:text-black transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* three-line menu: track list */}
        <button
          onClick={() => setListOpen((o) => !o)}
          aria-label="Track list"
          className="absolute -bottom-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black text-white shadow hover:scale-105 transition-transform"
        >
          <Menu className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* dropdown track list */}
      {listOpen && (
        <div className="absolute top-full right-0 mt-3 w-60 rounded-xl bg-white/95 backdrop-blur shadow-lg p-1.5 text-black/70">
          {tracks.map((t, i) => (
            <button
              key={t.src}
              onClick={() => {
                select(i)
                setListOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-2.5 rounded-lg p-2 text-left transition-colors",
                i === current ? "bg-black/5" : "hover:bg-black/5"
              )}
            >
              <img src={t.cover} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className={cn("text-xs leading-tight truncate", i === current ? "font-semibold text-black" : "text-black/80")}>
                  {t.title}
                </p>
                <p className="text-[10px] text-black/50 leading-tight truncate">{t.artist}</p>
              </div>
              {i === current && isPlaying && (
                <span className="text-[10px] text-black/50">♪</span>
              )}
            </button>
          ))}
          {/* sketchy hand-drawn border like the logo circle */}
          <RoughBox />
        </div>
      )}
    </div>
  )
}
