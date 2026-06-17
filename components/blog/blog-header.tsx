"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { RoughPill } from "@/components/rough-pill"

interface BlogHeaderProps {
  categories: string[]
}

export function BlogHeader({ categories }: BlogHeaderProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-4 bg-white">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
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
    </section>
  )
}
