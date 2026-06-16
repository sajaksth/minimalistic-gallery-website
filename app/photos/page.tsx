import { PhotoGallery } from "@/components/photos/photo-gallery"
import { PhotoFilters } from "@/components/photos/photo-filters"
import { SectionHeader } from "@/components/section-header"

const photos = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Alpine Majesty",
    category: "landscape",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
    title: "Morning Mist",
    category: "landscape",
    year: "2024",
    aspect: "portrait",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    title: "Portrait Study I",
    category: "portrait",
    year: "2023",
    aspect: "portrait",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    title: "Urban Lines",
    category: "architecture",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=800&q=80",
    title: "Ocean Blue",
    category: "nature",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    title: "Portrait Study II",
    category: "portrait",
    year: "2023",
    aspect: "square",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?w=800&q=80",
    title: "Desert Silence",
    category: "landscape",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    title: "Glass & Steel",
    category: "architecture",
    year: "2023",
    aspect: "portrait",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=800&q=80",
    title: "Minimalist Space",
    category: "architecture",
    year: "2024",
    aspect: "square",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    title: "Valley Dawn",
    category: "landscape",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    title: "Portrait Study III",
    category: "portrait",
    year: "2024",
    aspect: "portrait",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=800&q=80",
    title: "Forest Path",
    category: "nature",
    year: "2024",
    aspect: "portrait",
  },
]

const categories = ["all", "landscape", "portrait", "architecture", "nature"]

export default function PhotosPage() {
  return (
    <div className="bg-white text-foreground">
      <SectionHeader
        title="Photos"
        description="A visual journey through landscapes, portraits, and the quiet in-between."
      />

      {/* Filters */}
      <PhotoFilters categories={categories} />

      {/* Gallery */}
      <PhotoGallery photos={photos} />
    </div>
  )
}
