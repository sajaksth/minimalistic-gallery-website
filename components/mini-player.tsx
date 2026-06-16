"use client"

import { usePathname } from "next/navigation"
import { Play, Pause, SkipForward } from "lucide-react"
import { useMusic } from "@/components/music-provider"
import { cn } from "@/lib/utils"

// Compact player shown in the header's top-right on every page except the music page.
export function MiniPlayer() {
  const pathname = usePathname()
  const { track, isPlaying, toggle, next } = useMusic()

  if (pathname === "/music") return null

  return (
    <div className="flex items-center gap-2">
      <img
        src={track.cover}
        alt=""
        className={cn(
          "w-8 h-8 rounded-full object-cover",
          isPlaying && "animate-spin [animation-duration:6s]"
        )}
      />
      <div className="hidden md:block min-w-0 max-w-[120px]">
        <p className="text-xs font-medium leading-tight truncate">{track.title}</p>
        <p className="text-[10px] text-muted-foreground leading-tight truncate">{track.artist}</p>
      </div>
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground text-background hover:scale-105 transition-transform"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>
      <button
        onClick={next}
        aria-label="Next track"
        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <SkipForward className="w-4 h-4" />
      </button>
    </div>
  )
}
