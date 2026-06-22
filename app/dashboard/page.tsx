import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"
import { LogoutButton } from "@/components/dashboard/logout-button"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/dashboard/login")

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <header className="flex items-center justify-between border-b border-black/10 bg-white px-6 h-16">
        <div className="flex items-center gap-2">
          <img src="/images/barebone-logo.png" alt="" className="w-7 h-7 object-contain" />
          <span className="font-brush text-xl">Dashboard</span>
        </div>
        <LogoutButton />
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-black/55">
          Signed in as <span className="font-medium text-black">{user.email}</span>.
        </p>
        <p className="mt-6 text-sm text-black/55">
          This is your dashboard home. We'll add each section (photos, journals, blog, shop, …) here next.
        </p>
      </div>
    </main>
  )
}
