import { StoryCard } from "@/components/stories/story-card"
import { FeaturedStory } from "@/components/stories/featured-story"

const stories = [
  {
    id: "1",
    title: "The Lighthouse Keeper",
    excerpt: "In the quiet hours before dawn, when the sea whispered secrets to the shore, Margaret would climb the spiral staircase to tend the flame that had guided countless ships home.",
    author: "Elena Marsh",
    date: "March 2024",
    readTime: "12 min",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: "2",
    title: "Letters Never Sent",
    excerpt: "She kept them in a wooden box beneath her bed—letters addressed to a future she could only imagine, written in the hopeful hand of her younger self.",
    author: "James Chen",
    date: "February 2024",
    readTime: "8 min",
    category: "Poetry",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
  },
  {
    id: "3",
    title: "The Cartographer's Dream",
    excerpt: "Maps had always been his obsession—not the kind that showed roads and rivers, but those that charted the invisible territories of the human heart.",
    author: "Sofia Rivera",
    date: "January 2024",
    readTime: "15 min",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
  },
  {
    id: "4",
    title: "Seasons of Silence",
    excerpt: "Winter taught her patience. Spring reminded her of hope. Summer brought forgotten laughter. And autumn—autumn was for letting go.",
    author: "Michael Torres",
    date: "December 2023",
    readTime: "6 min",
    category: "Poetry",
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80",
  },
  {
    id: "5",
    title: "The Bookshop at World's End",
    excerpt: "They said the shop appeared only to those who truly needed it—a sanctuary of forgotten stories at the edge of everything familiar.",
    author: "Anna Blackwood",
    date: "November 2023",
    readTime: "18 min",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
  },
  {
    id: "6",
    title: "Portrait of My Father",
    excerpt: "I didn't understand him until I found his journals—pages filled with questions he never asked aloud and dreams he never dared to chase.",
    author: "David Nakamura",
    date: "October 2023",
    readTime: "10 min",
    category: "Memoir",
    image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=600&q=80",
  },
]

const featuredStory = {
  id: "featured",
  title: "Where the Rivers End",
  excerpt: "A contemplative journey through landscapes both physical and emotional, tracing the path of water from mountain peaks to the endless sea. In its flow, we find reflections of our own passage through time.",
  author: "Claire Beaumont",
  date: "March 2024",
  readTime: "25 min",
  category: "Fiction",
  image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1200&q=80",
}

const categories = ["All", "Fiction", "Poetry", "Memoir", "Essay"]

export default function StoriesPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-16 lg:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-6xl font-light tracking-tight">
            Stories
          </h1>
          <p className="mt-6 text-muted-foreground text-lg text-pretty">
            A collection of fiction, poetry, and personal narratives that explore 
            the depths of human experience and imagination.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 py-4 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm transition-colors whitespace-nowrap ${
                  index === 0
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <FeaturedStory story={featuredStory} />

      {/* Stories Grid */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl font-light tracking-tight">
              Latest Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
