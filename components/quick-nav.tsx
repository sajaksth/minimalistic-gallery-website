"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/photos", label: "Photos" },
  { href: "/stories", label: "Stories" },
  { href: "/music", label: "Music" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
]

// Floating quick-access menu: always on top, expands on hover to jump between pages.
export function QuickNav() {
  const pathname = usePathname()
  const { totalItems, setIsOpen } = useCart()

  // The home page already has its navigation circles.
  if (pathname === "/") return null

  return (
    <div className="group fixed top-3 left-3 z-50">
      {/* always-visible trigger */}
      <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-black/10 shadow-md p-1.5 pr-3">
        <Link href="/" aria-label="Back to home">
          <img
            src="/images/barebone-logo.png"
            alt="Bare Bone Co."
            className="w-9 h-9 object-contain"
          />
        </Link>
        <span className="font-brush text-sm text-black">Menu</span>
      </div>

      {/* expands on hover */}
      <div
        className={cn(
          "absolute top-full left-0 mt-2 w-44 flex flex-col rounded-xl bg-white/95 backdrop-blur border border-black/10 shadow-lg p-2",
          "opacity-0 -translate-y-1 pointer-events-none transition-all duration-200",
          "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-brush text-lg px-3 py-1.5 rounded-lg transition-colors hover:bg-black/5",
              pathname === link.href ? "text-black" : "text-black/55 hover:text-black"
            )}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => setIsOpen(true)}
          className="mt-1 flex items-center gap-2 font-brush text-lg px-3 py-1.5 rounded-lg text-black/55 hover:text-black hover:bg-black/5 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Cart{totalItems > 0 ? ` (${totalItems})` : ""}
        </button>
      </div>
    </div>
  )
}
