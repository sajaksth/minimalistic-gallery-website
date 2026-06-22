"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export function LogoutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut()
        router.push("/dashboard/login")
        router.refresh()
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </button>
  )
}
