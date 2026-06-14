"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(35)

  return (
    <section className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Album Art */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            <img
              src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&q=80"
              alt="Now Playing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </div>

          {/* Player Controls */}
          <div className="text-center lg:text-left">
            <p className="text-xs uppercase tracking-widest text-background/50 mb-2">
              Now Playing
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light">
              Morning Light
            </h2>
            <p className="mt-2 text-background/70">
              Ambient Horizons / Atelier Studio
            </p>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="relative h-1 bg-background/20 rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-background rounded-full"
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
                <span>4:23</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6">
              <button
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

            {/* Platform Links */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
              <a
                href="#"
                className="px-4 py-2 text-xs uppercase tracking-wide border border-background/30 hover:border-background transition-colors"
              >
                Spotify
              </a>
              <a
                href="#"
                className="px-4 py-2 text-xs uppercase tracking-wide border border-background/30 hover:border-background transition-colors"
              >
                Apple Music
              </a>
              <a
                href="#"
                className="px-4 py-2 text-xs uppercase tracking-wide border border-background/30 hover:border-background transition-colors"
              >
                SoundCloud
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
