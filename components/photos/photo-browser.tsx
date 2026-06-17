"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { RoughPill } from "@/components/rough-pill"

// Cycles through a project's photos inside the folder circle.
// `offset` staggers each folder so they don't all change at once.
function FolderSlideshow({ images, offset = 0 }: { images: string[]; offset?: number }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(() => setIndex((p) => (p + 1) % images.length), 6000)
    }, offset)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [images.length, offset])
  return (
    <>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            i === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </>
  )
}

type Photo = { src: string; title: string; projectId: string; type: string }
type Project = { id: string; title: string; blurb?: string; cover: string }

// A rough, hand-drawn circle ring (dark ink, for the white page).
function RoughRing() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute -inset-[5px] w-[calc(100%+10px)] h-[calc(100%+10px)] pointer-events-none text-black"
    >
      <defs>
        <filter id="roughRingBrowser">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" filter="url(#roughRingBrowser)" />
    </svg>
  )
}

function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
      {photos.map((photo) => (
        <figure key={photo.src} className="mb-5 break-inside-avoid">
          <img src={photo.src} alt={photo.title} className="w-full rounded-lg object-cover" />
          <figcaption className="mt-1.5 font-brush text-sm text-black/55">{photo.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function PhotoBrowser({
  projects,
  photos,
  categories,
}: {
  projects: Project[]
  photos: Photo[]
  categories: string[]
}) {
  const [category, setCategory] = useState("All")
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = projects.find((p) => p.id === openId)

  return (
    <section className="bg-white text-black px-6 pb-24">
      {/* category filter — browse by type across every project */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((c) => {
          const active = category === c
          return (
            <button
              key={c}
              onClick={() => {
                setCategory(c)
                setOpenId(null)
              }}
              className={cn(
                "relative rounded-full px-4 py-1.5 font-brush text-sm whitespace-nowrap transition-transform hover:-translate-y-0.5",
                active ? "bg-black text-white" : "bg-white text-black/55 hover:text-black"
              )}
            >
              {c}
              <RoughPill />
            </button>
          )
        })}
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        {category !== "All" ? (
          /* ---- filter by type, across all projects ---- */
          <>
            <h2 className="font-brush text-2xl sm:text-3xl mb-6">{category}</h2>
            <PhotoGrid photos={photos.filter((p) => p.type === category.toLowerCase())} />
          </>
        ) : openProject ? (
          /* ---- inside a single project ---- */
          <>
            <button
              onClick={() => setOpenId(null)}
              className="flex items-center gap-1.5 font-brush text-base text-black/55 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All projects
            </button>
            <h2 className="font-brush text-2xl sm:text-3xl mt-4">{openProject.title}</h2>
            {openProject.blurb && <p className="mt-1.5 mb-6 max-w-xl text-black/60">{openProject.blurb}</p>}
            <PhotoGrid photos={photos.filter((p) => p.projectId === openProject.id)} />
          </>
        ) : (
          /* ---- default: project folders as circles ---- */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
            {projects.map((project, projectIndex) => {
              const projectImages = photos.filter((p) => p.projectId === project.id).map((p) => p.src)
              const count = projectImages.length
              return (
                <button
                  key={project.id}
                  onClick={() => setOpenId(project.id)}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <FolderSlideshow
                        images={projectImages.length ? projectImages : [project.cover]}
                        offset={projectIndex * 1500}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <RoughRing />
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-black text-white text-[10px] px-2 py-0.5">
                      {count}
                    </span>
                  </div>
                  <span className="mt-3 font-brush text-lg group-hover:tracking-wide transition-all">
                    {project.title}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
