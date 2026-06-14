"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2590-Qk3Or783IPLYbupCM5o8mART3LPeqS.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6785-39hwdid3BKc63gBDkPGB0axHiteVcz.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC0049-gxRDOgqusKYVNIfYZfz3vZHj4E7K9z.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_0015-WSY6U5rcE9YipjpGIKfn7GwhPjZugV.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6792-YytYkY0x1QxPDuAY2wTanZFYTcXsRb.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_0145-UtJb9h8mE6D3xAb7wA0O1cRKIOxwPk.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_0086-NhKmauWQ1g1iNDpI9nEXbPB7NvBPzz.jpg",
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-background font-light tracking-tight text-balance">
            Where Art Meets Expression
          </h1>
          <p className="mt-6 text-background/90 text-lg md:text-xl max-w-xl mx-auto text-pretty">
            A curated gallery of photography, music, and stories that inspire and captivate
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/photos"
              className="inline-flex items-center gap-2 h-12 px-8 bg-background text-foreground text-sm uppercase tracking-wide hover:bg-background/90 transition-colors"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-12 px-8 border border-background text-background text-sm uppercase tracking-wide hover:bg-background/10 transition-colors"
            >
              <span>Visit Shop</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImage ? "bg-background" : "bg-background/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/20 hover:bg-background/40 text-background rounded-full transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentImage((prev) => (prev + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/20 hover:bg-background/40 text-background rounded-full transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  )
}
