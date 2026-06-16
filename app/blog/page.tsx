import { BlogHeader } from "@/components/blog/blog-header"
import { FeaturedPost } from "@/components/blog/featured-post"
import { BlogGrid } from "@/components/blog/blog-grid"
import { SectionHeader } from "@/components/section-header"

export const metadata = {
  title: "Blog | BareBone",
  description: "Weekly insights, behind-the-scenes stories, and creative musings from the BareBone team.",
}

const featuredPost = {
  id: "1",
  title: "The Art of Stillness: Finding Meaning in Quiet Moments",
  excerpt: "In a world that constantly demands our attention, the quiet moments between become sacred. This week, we explore how stillness shapes our creative process and influences the work we share.",
  date: "March 12, 2026",
  readTime: "8 min read",
  category: "Creative Process",
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
  author: {
    name: "Elena Vance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
}

const blogPosts = [
  {
    id: "2",
    title: "Behind the Lens: Documenting Urban Solitude",
    excerpt: "A look at the techniques and emotions behind our latest photography series exploring empty city spaces.",
    date: "March 5, 2026",
    readTime: "5 min read",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Sound Design: Crafting Atmosphere Through Audio",
    excerpt: "How we approach sound design to create immersive audio experiences that complement visual storytelling.",
    date: "February 27, 2026",
    readTime: "6 min read",
    category: "Music",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "The Making of 'Echoes': A Writing Journey",
    excerpt: "From first draft to final edit, we share the creative journey behind our latest short story collection.",
    date: "February 20, 2026",
    readTime: "7 min read",
    category: "Writing",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Sustainable Creativity: Our Commitment to Ethical Production",
    excerpt: "Exploring how we source materials and create products that align with our values of sustainability.",
    date: "February 13, 2026",
    readTime: "4 min read",
    category: "Shop",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Color Theory in Practice: Building Visual Harmony",
    excerpt: "A deep dive into how we use color to evoke emotion and create cohesive visual narratives.",
    date: "February 6, 2026",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Community Spotlight: Artists Who Inspire Us",
    excerpt: "Celebrating the talented creators in our community whose work pushes boundaries and inspires our own.",
    date: "January 30, 2026",
    readTime: "5 min read",
    category: "Community",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  },
]

const categories = ["All", "Creative Process", "Photography", "Music", "Writing", "Design", "Shop", "Community"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SectionHeader
        title="Blog"
        description="Notes from the field — thoughts, process, and small detours."
      />
      <BlogHeader categories={categories} />
      <FeaturedPost post={featuredPost} />
      <BlogGrid posts={blogPosts} />
      
      {/* Newsletter Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-balance">
            Never Miss a Post
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Subscribe to our weekly newsletter for the latest stories, insights, and creative inspiration delivered directly to your inbox.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
