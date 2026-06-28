import { SectionHeader } from "@/components/section-header"
import { createSupabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function IllustrationsPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from("illustrations")
    .select("id, title, src_url")
    .order("sort_order", { ascending: true })

  const illustrations = (data ?? []).map((i) => ({
    id: i.id as string,
    title: (i.title as string) ?? "",
    src: i.src_url as string,
  }))

  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Illustrations" />
      <section className="bg-white px-6 pb-24 max-w-6xl mx-auto">
        {illustrations.length === 0 ? (
          <p className="text-center text-sm text-black/55">No illustrations yet — check back soon.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {illustrations.map((item) => (
              <figure key={item.id} className="mb-5 break-inside-avoid">
                <img src={item.src} alt={item.title} className="w-full rounded-lg object-cover" />
                {item.title && (
                  <figcaption className="mt-1.5 font-brush text-sm text-black/55">{item.title}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
