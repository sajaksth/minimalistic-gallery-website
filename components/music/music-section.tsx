"use client"

import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMusic } from "@/components/music-provider"

function fmt(t: number) {
  if (!isFinite(t) || t < 0) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function MusicSection() {
  const { tracks, current, track, isPlaying, currentTime, duration, toggle, next, prev, select, seek } =
    useMusic()

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <>
      {/* Now playing */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Album art */}
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden bg-background/10">
              {track?.cover ? (
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-background/30 font-brush text-2xl">
                  {track?.title ?? "—"}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="text-center lg:text-left">
              <p className="text-xs uppercase tracking-widest text-background/50 mb-2">Now Playing</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-light">{track?.title ?? "—"}</h2>
              <p className="mt-2 text-background/70">{track?.artist ?? ""}</p>

              {/* Progress */}
              <div className="mt-8">
                <div className="relative h-1 bg-background/20 rounded-full">
                  <div
                    className="absolute inset-y-0 left-0 bg-background rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    aria-label="Seek"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-background/50 tabular-nums">
                  <span>{fmt(currentTime)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6">
                <button
                  onClick={prev}
                  className="p-2 text-background/70 hover:text-background transition-colors"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={toggle}
                  className={cn(
                    "w-14 h-14 flex items-center justify-center rounded-full border-2 border-background transition-colors",
                    isPlaying ? "bg-background text-foreground" : "bg-transparent"
                  )}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <button
                  onClick={next}
                  className="p-2 text-background/70 hover:text-background transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track list */}
      <section className="py-20 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Playlist</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">All Tracks</h2>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {tracks.map((t, index) => {
              const active = index === current
              return (
                <button
                  key={`${t.title}-${index}`}
                  onClick={() => {
                    if (active) toggle()
                    else select(index)
                  }}
                  className={cn(
                    "flex items-center gap-4 py-4 group transition-colors text-left",
                    active && "bg-muted/50"
                  )}
                >
                  <span className="w-10 h-10 flex items-center justify-center text-muted-foreground group-hover:text-foreground">
                    {active && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <>
                        <span className="group-hover:hidden">{index + 1}</span>
                        <Play className="w-4 h-4 hidden group-hover:block ml-0.5" />
                      </>
                    )}
                  </span>

                  <div className="w-12 h-12 flex-shrink-0 bg-muted overflow-hidden">
                    {t.cover ? (
                      <img src={t.cover} alt={t.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium text-sm truncate", active && "text-accent")}>{t.title}</p>
                    <p className="text-muted-foreground text-xs truncate">{t.artist}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
