import { MusicSection } from "@/components/music/music-section"
import { SectionHeader } from "@/components/section-header"

export const metadata = {
  title: "Music | BareBone",
  description: "Soundscapes for the wander — play it loud, let it linger.",
}

export default function MusicPage() {
  return (
    <div className="bg-white text-foreground">
      <SectionHeader
        title="Music"
        description="Soundscapes for the wander — play it loud, let it linger."
      />
      <MusicSection />
    </div>
  )
}
