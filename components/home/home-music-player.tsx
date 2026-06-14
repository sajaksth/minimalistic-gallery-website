"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const tracks = [
  {
    id: 1,
    title: "Morning Light",
    artist: "Ambient Horizons",
    album: "Atelier Sessions Vol. 1",
    duration: "4:23",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&q=80",
  },
  {
    id: 2,
    title: "Coastal Dreams",
    artist: "Luna Waves",
    album: "Ocean Memories",
    duration: "3:56",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
  {
    id: 3,
    title: "Evening Calm",
    artist: "Serene Collective",
    album: "Twilight Hours",
    duration: "5:12",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
  },
]

export function HomeMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(35)

  const track = tracks[currentTrack]

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setProgress(0)
  }

  return (
    <section className="py-20 lg:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-background/50 mb-2">
              Now Playing
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
              Listen Now
            </h2>
          </div>
          <Link
            href="/music"
            className="hidden sm:block text-sm uppercase tracking-wide text-background/70 hover:text-background transition-colors"
          >
            Browse Music
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr,2fr] gap-8 lg:gap-12 items-center">
          {/* Album Art */}
          <div className="relative aspect-square max-w-sm mx-auto lg:mx-0">
            <img
              src={track.cover}
              alt={track.album}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </div>

          {/* Player */}
          <div>
            <div className="mb-8">
              <h3 className="font-serif text-2xl lg:text-3xl font-light mb-2">
                {track.title}
              </h3>
              <p className="text-background/70">
                {track.artist} / {track.album}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="relative h-1 bg-background/20 rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-background rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-background/50">
                <span>1:32</span>
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mb-10">
              <button
                onClick={prevTrack}
                className="p-2 text-background/70 hover:text-background transition-colors"
                aria-label="Previous track"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={cn(
                  "w-14 h-14 flex items-center justify-center rounded-full border-2 border-background transition-colors",
                  isPlaying ? "bg-background text-foreground" : "bg-transparent"
                )}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
              <button
                onClick={nextTrack}
                className="p-2 text-background/70 hover:text-background transition-colors"
                aria-label="Next track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-background/70 hover:text-background transition-colors ml-4"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Track List Preview */}
            <div className="border-t border-background/20 pt-6">
              <p className="text-xs uppercase tracking-widest text-background/50 mb-4">
                Up Next
              </p>
              <div className="space-y-3">
                {tracks.map((t, index) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrack(index)
                      setProgress(0)
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 p-3 transition-colors text-left",
                      index === currentTrack
                        ? "bg-background/10"
                        : "hover:bg-background/5"
                    )}
                  >
                    <img
                      src={t.cover}
                      alt={t.album}
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm truncate",
                        index === currentTrack ? "text-background" : "text-background/70"
                      )}>
                        {t.title}
                      </p>
                      <p className="text-xs text-background/50 truncate">
                        {t.artist}
                      </p>
                    </div>
                    <span className="text-xs text-background/50">
                      {t.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/music"
          className="sm:hidden mt-8 block text-center text-sm uppercase tracking-wide text-background/70 hover:text-background transition-colors"
        >
          Browse All Music
        </Link>
      </div>
    </section>
  )
}
