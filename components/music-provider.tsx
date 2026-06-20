"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

export type Track = {
  title: string
  artist: string
  cover: string
  src: string
}

// Shared playlist.
export const tracks: Track[] = [
  {
    title: "Instincts",
    artist: "Sajak Malla Shrestha",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=200&q=80",
    src: "/audio/instincts.mp3",
  },
  {
    title: "River",
    artist: "Sajak Malla Shrestha",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80",
    src: "/audio/river.mp3",
  },
  {
    title: "Finding You (Again)",
    artist: "Sajak Malla Shrestha",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80",
    src: "/audio/finding-you-again.mp3",
  },
  {
    title: "Lullaby to myself",
    artist: "Sajak Malla Shrestha",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80",
    src: "/audio/lullaby-to-myself.mp3",
  },
]

type MusicContextValue = {
  tracks: Track[]
  current: number
  track: Track
  isPlaying: boolean
  currentTime: number
  duration: number
  toggle: () => void
  next: () => void
  prev: () => void
  select: (index: number) => void
  seek: (seconds: number) => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error("useMusic must be used within <MusicProvider>")
  return ctx
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const seek = (seconds: number) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = seconds
    setCurrentTime(seconds)
  }

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play().catch(() => {})
      setIsPlaying(true)
    } else {
      a.pause()
      setIsPlaying(false)
    }
  }

  const next = () => setCurrent((c) => (c + 1) % tracks.length)
  const prev = () => setCurrent((c) => (c - 1 + tracks.length) % tracks.length)
  const select = (index: number) => setCurrent(index)

  // When the track changes, keep playing if we were already playing.
  useEffect(() => {
    const a = audioRef.current
    if (a && isPlaying) a.play().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  return (
    <MusicContext.Provider
      value={{ tracks, current, track: tracks[current], isPlaying, currentTime, duration, toggle, next, prev, select, seek }}
    >
      {children}
      {/* Single persistent audio element: lives in the root layout, so music
          keeps playing as the visitor navigates between pages. */}
      <audio
        ref={audioRef}
        src={tracks[current].src}
        onEnded={next}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
    </MusicContext.Provider>
  )
}
