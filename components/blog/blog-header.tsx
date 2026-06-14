"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BlogHeaderProps {
  categories: string[]
}

export function BlogHeader({ categories }: BlogHeaderProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl lg:text-5xl font-medium">
          Weekly Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Thoughts, stories, and insights from behind the scenes. Updated every week with fresh perspectives on creativity and craft.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 text-sm rounded-full transition-colors",
              activeCategory === category
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  )
}
