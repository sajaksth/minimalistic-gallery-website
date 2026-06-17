"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type Project = {
  id: string
  title: string
  blurb?: string
  cover: string
  photos: { src: string; title: string }[]
}

// A rough, hand-drawn circle ring (dark ink, for the white page).
function RoughRing() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute -inset-[5px] w-[calc(100%+10px)] h-[calc(100%+10px)] pointer-events-none text-black"
    >
      <defs>
        <filter id="roughRingProj">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" filter="url(#roughRingProj)" />
    </svg>
  )
}

export function PhotoProjects({ projects }: { projects: Project[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((p) => p.id === openId)

  // ---- Inside a project: its photos ----
  if (open) {
    return (
      <section className="bg-white text-black px-6 pb-24 max-w-6xl mx-auto">
        <button
          onClick={() => setOpenId(null)}
          className="flex items-center gap-1.5 font-brush text-base text-black/55 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All projects
        </button>

        <h2 className="font-brush text-3xl sm:text-4xl mt-4">{open.title}</h2>
        {open.blurb && <p className="mt-2 max-w-xl text-black/60">{open.blurb}</p>}

        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {open.photos.map((photo) => (
            <figure key={photo.src} className="mb-5 break-inside-avoid">
              <img src={photo.src} alt={photo.title} className="w-full rounded-lg object-cover" />
              <figcaption className="mt-1.5 font-brush text-sm text-black/55">{photo.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    )
  }

  // ---- Project folders, shown as circles ----
  return (
    <section className="bg-white text-black px-6 pb-24">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setOpenId(project.id)}
            className="group flex flex-col items-center"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img src={project.cover} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <RoughRing />
              <span className="absolute -bottom-1 -right-1 rounded-full bg-black text-white text-[10px] px-2 py-0.5">
                {project.photos.length}
              </span>
            </div>
            <span className="mt-3 font-brush text-lg group-hover:tracking-wide transition-all">
              {project.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
