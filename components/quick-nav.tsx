"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/", label: "Home", delay: "0s" },
  { href: "/photos", label: "Photos", delay: "0.4s" },
  { href: "/stories", label: "Stories", delay: "0.8s" },
  { href: "/music", label: "Music", delay: "1.2s" },
  { href: "/blog", label: "Blog", delay: "1.6s" },
  { href: "/shop", label: "Shop", delay: "2s" },
]

// A rough, hand-drawn pill outline (uses currentColor so it matches the tab's text).
function RoughPill() {
  return (
    <svg
      viewBox="0 0 200 56"
      preserveAspectRatio="none"
      className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none"
    >
      <defs>
        <filter id="qnPill">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
        </filter>
      </defs>
      <rect
        x="2" y="2" width="196" height="52" rx="26" ry="26"
        fill="none" stroke="currentColor" strokeWidth="1.2"
        vectorEffect="non-scaling-stroke" filter="url(#qnPill)"
      />
    </svg>
  )
}

// Floating quick-access: a strip of oval tabs (title inside), always on top.
export function QuickNav() {
  const pathname = usePathname()
  const { totalItems, setIsOpen } = useCart()

  // The home page already has its navigation circles.
  if (pathname === "/") return null

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2 max-w-[88vw] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{ animationDelay: tab.delay }}
            className={cn(
              "animate-float relative shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 font-brush text-sm tracking-wide",
              "backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105",
              active ? "bg-black text-white" : "bg-white/90 text-black"
            )}
          >
            {tab.label}
            <RoughPill />
          </Link>
        )
      })}

      {/* cart tab */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
        style={{ animationDelay: "2.4s" }}
        className="animate-float relative shrink-0 rounded-full w-9 h-9 flex items-center justify-center bg-white/90 text-black backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
      >
        <ShoppingBag className="w-4 h-4" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
        <RoughPill />
      </button>
    </div>
  )
}
