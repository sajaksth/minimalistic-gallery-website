"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Photo {
  id: string
  src: string
  title: string
  category: string
  year: string
  aspect: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const goToPrevious = () => {
    const newIndex = lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1
    setLightboxIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  const goToNext = () => {
    const newIndex = lightboxIndex === photos.length - 1 ? 0 : lightboxIndex + 1
    setLightboxIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  return (
    <>
      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(photo, index)}
                className="relative w-full mb-4 lg:mb-6 group overflow-hidden bg-muted break-inside-avoid"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className={cn(
                    "w-full object-cover transition-transform duration-500 group-hover:scale-105",
                    photo.aspect === "portrait" ? "aspect-[3/4]" : 
                    photo.aspect === "landscape" ? "aspect-[4/3]" : "aspect-square"
                  )}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-background text-sm font-medium text-left">
                    {photo.title}
                  </p>
                  <p className="text-background/70 text-xs text-left mt-0.5">
                    {photo.category} / {photo.year}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-background hover:text-background/70 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 p-2 text-background hover:text-background/70 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] px-16">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="mt-4 text-center">
              <p className="text-background font-medium">{selectedPhoto.title}</p>
              <p className="text-background/60 text-sm mt-1">
                {selectedPhoto.category} / {selectedPhoto.year}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-6 p-2 text-background hover:text-background/70 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-background/60 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
