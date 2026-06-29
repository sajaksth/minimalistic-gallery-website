import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { UploadField } from "@/components/dashboard/upload-field"
import { addIllustration, deleteIllustration } from "./actions"

export const dynamic = "force-dynamic"

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

type Illustration = { id: string; title: string | null; src_url: string }

export default async function IllustrationsList() {
  const { data, error } = await supabaseAdmin
    .from("illustrations")
    .select("id, title, src_url")
    .order("sort_order", { ascending: true })

  const items = (data ?? []) as Illustration[]

  return (
    <div>
      <h1 className="text-2xl font-semibold">Illustrations</h1>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load illustrations. Run <code className="font-mono">supabase/illustrations.sql</code> in Supabase first.
        </div>
      )}

      {/* Add */}
      <form
        action={addIllustration}
        className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end rounded-xl border border-black/10 bg-white p-4"
      >
        <div>
          <label className="block text-xs text-black/55 mb-1">Image *</label>
          <UploadField name="src_url" bucket="illustrations" accept="image/*" isImage />
        </div>
        <div>
          <label className="block text-xs text-black/55 mb-1">Title</label>
          <input name="title" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-black/55 mb-1">Sort</label>
          <input type="number" name="sort_order" defaultValue="0" className={inputCls + " w-20"} />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          Add
        </button>
      </form>

      {!error && items.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No illustrations yet. Add your first above.</p>
      )}

      {items.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((it) => (
            <div key={it.id} className="relative rounded-lg overflow-hidden border border-black/10">
              <img src={it.src_url} alt={it.title ?? ""} className="w-full aspect-square object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 px-2 py-1 text-white text-xs">
                <span className="truncate">{it.title ?? "—"}</span>
                <form action={deleteIllustration}>
                  <input type="hidden" name="__id" value={it.id} />
                  <DeleteButton label="Delete this illustration?" />
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
