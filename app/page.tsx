import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/home/hero-section"
import { PhotoSlideshow } from "@/components/home/photo-slideshow"
import { HomeMusicPlayer } from "@/components/home/home-music-player"

const categories = [
  {
    title: "Photography",
    description: "Visual narratives captured through the lens",
    href: "/photos",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    title: "Music",
    description: "Curated soundscapes and compositions",
    href: "/music",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
  },
  {
    title: "Stories",
    description: "Written works that inspire and captivate",
    href: "/stories",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
  },
  {
    title: "Shop",
    description: "Exclusive prints, apparel, and collectibles",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
]

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSection />
      
      {/* Categories Grid */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-5xl font-light tracking-tight text-balance">
              Explore Our Collections
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover a curated selection of photography, music, stories, and exclusive merchandise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative aspect-[4/3] overflow-hidden bg-muted"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="font-serif text-2xl lg:text-3xl text-background font-medium">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-background/80 text-sm">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-background text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Slideshow */}
      <PhotoSlideshow />

      {/* Music Player */}
      <HomeMusicPlayer />

      {/* Newsletter Section */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
            Stay Connected
          </h2>
          <p className="mt-4 text-muted-foreground">
            Subscribe to receive updates on new collections, releases, and exclusive offers.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="submit"
              className="h-12 px-8 bg-foreground text-background text-sm uppercase tracking-wide hover:bg-foreground/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
