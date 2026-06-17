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

// A rough, hand-drawn rounded-rectangle outline (for panels/dropdowns).
export function RoughBox({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      preserveAspectRatio="none"
      className={cn("absolute -inset-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] pointer-events-none", className)}
    >
      <defs>
        <filter id="roughBoxShared">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
        </filter>
      </defs>
      <rect
        x="3" y="3" width="194" height="254" rx="14" ry="14"
        fill="none" stroke="currentColor" strokeWidth="1.2"
        vectorEffect="non-scaling-stroke" filter="url(#roughBoxShared)"
      />
    </svg>
  )
}
