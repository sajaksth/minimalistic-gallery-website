import { cn } from "@/lib/utils"

// A rough, hand-drawn pill outline. Uses currentColor so it matches the element's text color.
export function RoughPill({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 56"
      preserveAspectRatio="none"
      className={cn("absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none", className)}
    >
      <defs>
        <filter id="roughPillShared">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
        </filter>
      </defs>
      <rect
        x="2" y="2" width="196" height="52" rx="26" ry="26"
        fill="none" stroke="currentColor" strokeWidth="1.2"
        vectorEffect="non-scaling-stroke" filter="url(#roughPillShared)"
      />
    </svg>
  )
}
