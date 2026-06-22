import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Server client (publishable key) for server components / actions — reads the
// auth session cookies so the logged-in user is available on the server.
export async function createSupabaseServer() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // called from a Server Component — middleware refreshes the session
          }
        },
      },
    }
  )
}
