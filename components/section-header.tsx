import Link from "next/link"
import { cn } from "@/lib/utils"

// Hand-drawn divider line, matching the scroll-below section's vibe.
function SketchLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={cn("h-3", className)}>
      <defs>
        <filter id="roughLineHeader">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
      <path d="M2 6 H198" fill="none" stroke="currentColor" strokeWidth="2" filter="url(#roughLineHeader)" />
    </svg>
  )
}

// Consistent top section for every page opened from a circle:
// white background, Bare Bone Co. logo on top, the section title in the middle.
export function SectionHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <section className="bg-white text-black px-6 pt-28 lg:pt-32 pb-10 text-center">
      <div className="flex flex-col items-center">
        <Link href="/" aria-label="Back to home">
          <img
            src="/images/barebone-logo.png"
            alt="Bare Bone Co."
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain select-none"
          />
        </Link>
        <h1 className="font-brush text-4xl sm:text-5xl mt-1">{title}</h1>
        {description && (
          <p className="mt-3 max-w-xl font-brush text-base sm:text-lg text-black/55 leading-relaxed">
            {description}
          </p>
        )}
        <SketchLine className="w-44 mt-6 text-black/40" />
      </div>
    </section>
  )
}
