import { SectionHeader } from "@/components/section-header"
import { PhotoBrowser } from "@/components/photos/photo-browser"
import { createSupabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const categories = ["All", "Landscape", "Portrait", "Architecture", "Nature"]

export default async function PhotosPage() {
  const supabase = await createSupabaseServer()

  const [{ data: projectRows }, { data: photoRows }] = await Promise.all([
    supabase.from("projects").select("id, title, blurb, cover_url").order("sort_order", { ascending: true }),
    supabase.from("photos").select("id, title, src_url, type, project_id").order("sort_order", { ascending: true }),
  ])

  const projects = (projectRows ?? []).map((p) => ({
    id: p.id as string,
    title: p.title as string,
    blurb: (p.blurb as string) ?? undefined,
    cover: (p.cover_url as string) ?? "",
  }))

  const photos = (photoRows ?? []).map((ph) => ({
    src: ph.src_url as string,
    title: (ph.title as string) ?? "",
    projectId: ph.project_id as string,
    type: ((ph.type as string) ?? "").toLowerCase(),
  }))

  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Photos" />
      {projects.length === 0 ? (
        <p className="pb-24 text-center text-sm text-black/55">No projects published yet — check back soon.</p>
      ) : (
        <PhotoBrowser projects={projects} photos={photos} categories={categories} />
      )}
    </div>
  )
}
