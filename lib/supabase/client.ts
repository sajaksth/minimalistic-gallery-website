import { createBrowserClient } from "@supabase/ssr"

// Browser client (publishable key). Manages the auth session via cookies so the
// middleware and server components can see the logged-in user.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
