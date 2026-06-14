"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ShopFiltersProps {
  categories: string[]
}

export function ShopFilters({ categories }: ShopFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  return (
    <section className="border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 text-sm transition-colors whitespace-nowrap",
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
