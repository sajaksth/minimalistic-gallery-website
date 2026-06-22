"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <img src="/images/barebone-logo.png" alt="" className="w-8 h-8 object-contain" />
          <h1 className="font-brush text-2xl">Dashboard</h1>
        </div>

        <label className="block text-sm text-black/60 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
        />

        <label className="block text-sm text-black/60 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 transition-colors"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  )
}
