"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { RoughPill } from "@/components/rough-pill"

interface ShopFiltersProps {
  categories: string[]
}

export function ShopFilters({ categories }: ShopFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6">
          {/* Categories */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 font-brush text-sm whitespace-nowrap transition-transform hover:-translate-y-0.5",
                    active ? "bg-black text-white" : "bg-white text-black/55 hover:text-black"
                  )}
                >
                  {category}
                  <RoughPill />
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-black/55">Sort by:</span>
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
