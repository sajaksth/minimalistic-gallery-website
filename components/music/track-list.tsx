"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface Track {
  id: string
  title: string
  album: string
  duration: string
  cover: string
}

interface TrackListProps {
  tracks: Track[]
}

export function TrackList({ tracks }: TrackListProps) {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

  const togglePlay = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId)
  }

  return (
    <section className="py-20 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Popular
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
            Featured Tracks
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className={cn(
                "flex items-center gap-4 py-4 group transition-colors",
                playingTrack === track.id && "bg-muted/50"
              )}
            >
              {/* Track Number / Play Button */}
              <button
                onClick={() => togglePlay(track.id)}
                className="w-10 h-10 flex items-center justify-center text-muted-foreground group-hover:text-foreground"
              >
                {playingTrack === track.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <span className="group-hover:hidden">{index + 1}</span>
                )}
                {playingTrack !== track.id && (
                  <Play className="w-4 h-4 hidden group-hover:block ml-0.5" />
                )}
              </button>

              {/* Album Cover */}
              <div className="w-12 h-12 flex-shrink-0 bg-muted overflow-hidden">
                <img
                  src={track.cover}
                  alt={track.album}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium text-sm truncate",
                  playingTrack === track.id && "text-accent"
                )}>
                  {track.title}
                </p>
                <p className="text-muted-foreground text-xs truncate">
                  {track.album}
                </p>
              </div>

              {/* Duration */}
              <span className="text-muted-foreground text-sm tabular-nums">
                {track.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
