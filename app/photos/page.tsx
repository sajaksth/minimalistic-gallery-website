import { SectionHeader } from "@/components/section-header"
import { PhotoBrowser } from "@/components/photos/photo-browser"

// Projects = your abstract themes (shown as circular folders by default).
const projects = [
  {
    id: "above-the-clouds",
    title: "Above the Clouds",
    blurb: "High places and the quiet that lives there.",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    id: "faces",
    title: "Faces",
    blurb: "People, and the moments they didn't pose for.",
    cover: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    id: "built",
    title: "Built",
    blurb: "Lines, glass, and the geometry of cities.",
    cover: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
  {
    id: "field-notes",
    title: "Field Notes",
    blurb: "The small, in-between things along the way.",
    cover: "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=600&q=80",
  },
]

// Each photo belongs to a project AND a generic type, so it shows in both views.
const photos = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", title: "Alpine Majesty", projectId: "above-the-clouds", type: "landscape" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", title: "Valley Dawn", projectId: "above-the-clouds", type: "landscape" },
  { src: "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?w=800&q=80", title: "Desert Silence", projectId: "above-the-clouds", type: "landscape" },
  { src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80", title: "Morning Mist", projectId: "above-the-clouds", type: "nature" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", title: "Portrait Study I", projectId: "faces", type: "portrait" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", title: "Portrait Study II", projectId: "faces", type: "portrait" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", title: "Portrait Study III", projectId: "faces", type: "portrait" },
  { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80", title: "Urban Lines", projectId: "built", type: "architecture" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", title: "Glass & Steel", projectId: "built", type: "architecture" },
  { src: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=800&q=80", title: "Minimalist Space", projectId: "built", type: "architecture" },
  { src: "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=800&q=80", title: "Ocean Blue", projectId: "field-notes", type: "nature" },
  { src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=800&q=80", title: "Forest Path", projectId: "field-notes", type: "nature" },
]

const categories = ["All", "Landscape", "Portrait", "Architecture", "Nature"]

export default function PhotosPage() {
  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Photos" />
      <PhotoBrowser projects={projects} photos={photos} categories={categories} />
    </div>
  )
}
