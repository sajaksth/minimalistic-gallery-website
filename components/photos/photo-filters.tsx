"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PhotoFiltersProps {
  categories: string[]
}

export function PhotoFilters({ categories }: PhotoFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <section className="border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center gap-1 py-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 text-sm capitalize transition-colors whitespace-nowrap",
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
