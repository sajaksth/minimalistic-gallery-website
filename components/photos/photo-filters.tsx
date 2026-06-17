"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { RoughPill } from "@/components/rough-pill"

interface PhotoFiltersProps {
  categories: string[]
}

export function PhotoFilters({ categories }: PhotoFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 py-6 flex-wrap">
          {categories.map((category) => {
            const active = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 font-brush text-sm capitalize whitespace-nowrap transition-transform hover:-translate-y-0.5",
                  active ? "bg-black text-white" : "bg-white text-black/55 hover:text-black"
                )}
              >
                {category}
                <RoughPill />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
