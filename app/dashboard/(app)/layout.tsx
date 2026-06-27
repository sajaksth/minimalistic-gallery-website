import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"
import { LogoutButton } from "@/components/dashboard/logout-button"

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/photos", label: "Photos" },
  { href: "/dashboard/journal", label: "Travel Journals" },
  { href: "/dashboard/stories", label: "Stories" },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/dashboard/login")

  return (
    <div className="min-h-screen flex bg-neutral-50 text-black">
      <aside className="w-60 shrink-0 border-r border-black/10 bg-white flex flex-col">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-black/10">
          <img src="/images/barebone-logo.png" alt="" className="w-7 h-7 object-contain" />
          <span className="font-brush text-lg">Dashboard</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-black/10 p-4">
          <p className="text-xs text-black/45 mb-2 truncate">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  )
}
