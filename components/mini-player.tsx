"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Play, Pause, SkipBack, SkipForward, Menu } from "lucide-react"
import { useMusic } from "@/components/music-provider"
import { cn } from "@/lib/utils"

// Floating player shown on every page except the music page.
export function MiniPlayer() {
  const pathname = usePathname()
  const { tracks, current, track, isPlaying, toggle, next, prev, select } = useMusic()
  const [listOpen, setListOpen] = useState(false)

  // The music page is the player itself. Elsewhere (incl. home) it floats and
  // stays in sync with the home Music circle via the shared music context.
  if (pathname === "/music") return null

  return (
    <div className="fixed top-10 right-4 z-50">
      <div className="animate-float relative flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur border border-black/10 shadow-md p-1.5 pr-3">
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
        <div className="absolute top-full right-0 mt-3 w-60 rounded-xl bg-white/95 backdrop-blur border border-black/10 shadow-lg p-1.5">
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
        </div>
      )}
    </div>
  )
}
