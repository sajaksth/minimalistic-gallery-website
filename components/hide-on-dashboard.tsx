"use client"

import { usePathname } from "next/navigation"

// Hides the public site chrome (nav tabs, music player, footer) on /dashboard.
export function HideOnDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith("/dashboard")) return null
  return <>{children}</>
}
