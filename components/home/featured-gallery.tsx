import Link from "next/link"
import { ArrowRight } from "lucide-react"

const featuredImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80",
    title: "Mountain Sunrise",
    aspect: "portrait",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=600&q=80",
    title: "Ocean Depths",
    aspect: "landscape",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=600&q=80",
    title: "Urban Geometry",
    aspect: "square",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=600&q=80",
    title: "Forest Light",
    aspect: "portrait",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?w=600&q=80",
    title: "Desert Dunes",
    aspect: "landscape",
  },
]

export function FeaturedGallery() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Featured Work
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
              Latest from the Gallery
            </h2>
          </div>
          <Link
            href="/photos"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {featuredImages.map((image, index) => (
            <Link
              key={image.id}
              href="/photos"
              className={`group relative overflow-hidden bg-muted ${
                image.aspect === "portrait"
                  ? "row-span-2 aspect-[3/4]"
                  : image.aspect === "landscape"
                  ? "col-span-2 md:col-span-1 aspect-[4/3]"
                  : "aspect-square"
              } ${index === 0 ? "md:row-span-2" : ""}`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-background text-sm font-medium">
                  {image.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
