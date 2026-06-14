import { MusicPlayer } from "@/components/music/music-player"
import { AlbumGrid } from "@/components/music/album-grid"
import { TrackList } from "@/components/music/track-list"

const albums = [
  {
    id: "1",
    title: "Ambient Horizons",
    artist: "Atelier Studio",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&q=80",
    tracks: 8,
  },
  {
    id: "2",
    title: "Nocturnal Echoes",
    artist: "Atelier Studio",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    tracks: 10,
  },
  {
    id: "3",
    title: "Electronic Dreams",
    artist: "Atelier Studio",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
    tracks: 12,
  },
  {
    id: "4",
    title: "Cinematic Scores",
    artist: "Atelier Studio",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80",
    tracks: 6,
  },
]

const featuredTracks = [
  {
    id: "t1",
    title: "Morning Light",
    album: "Ambient Horizons",
    duration: "4:23",
    cover: "https://images.unsplash.com/photo-614149162883-504ce4d13909?w=100&q=80",
  },
  {
    id: "t2",
    title: "Urban Pulse",
    album: "Electronic Dreams",
    duration: "3:47",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80",
  },
  {
    id: "t3",
    title: "Midnight Walk",
    album: "Nocturnal Echoes",
    duration: "5:12",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
  },
  {
    id: "t4",
    title: "Dawn Chorus",
    album: "Ambient Horizons",
    duration: "6:05",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=100&q=80",
  },
  {
    id: "t5",
    title: "Neon Streets",
    album: "Electronic Dreams",
    duration: "4:38",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80",
  },
  {
    id: "t6",
    title: "Silent Film",
    album: "Cinematic Scores",
    duration: "7:22",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=100&q=80",
  },
]

export default function MusicPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-16 lg:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-6xl font-light tracking-tight">
            Music
          </h1>
          <p className="mt-6 text-muted-foreground text-lg text-pretty">
            Original compositions spanning ambient soundscapes, electronic rhythms, 
            and cinematic scores. Perfect for focus, relaxation, and creative inspiration.
          </p>
        </div>
      </section>

      {/* Featured Player */}
      <MusicPlayer />

      {/* Albums */}
      <AlbumGrid albums={albums} />

      {/* Track List */}
      <TrackList tracks={featuredTracks} />
    </div>
  )
}
