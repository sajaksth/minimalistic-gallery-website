"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BlogHeaderProps {
  categories: string[]
}

export function BlogHeader({ categories }: BlogHeaderProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-4">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
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
