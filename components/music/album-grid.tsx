"use client"

import { Play } from "lucide-react"

interface Album {
  id: string
  title: string
  artist: string
  year: string
  cover: string
  tracks: number
}

interface AlbumGridProps {
  albums: Album[]
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Discography
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
            Albums & EPs
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {albums.map((album) => (
            <button
              key={album.id}
              className="group text-left"
            >
              <div className="relative aspect-square overflow-hidden bg-muted mb-4">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 text-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-sm">{album.title}</h3>
              <p className="text-muted-foreground text-xs mt-0.5">
                {album.year} / {album.tracks} tracks
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
