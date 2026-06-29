import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { saveProduct } from "../actions"
import { CoverUpload } from "@/components/dashboard/cover-upload"

export const dynamic = "force-dynamic"

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

export default async function ProductForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let row: Record<string, any> | null = null
  if (id !== "new") {
    const { data } = await supabaseAdmin.from("products").select("*").eq("id", id).single()
    if (!data) notFound()
    row = data
  }

  const v = (key: string) => {
    const val = row?.[key]
    return val == null ? "" : String(val)
  }

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/shop" className="text-sm text-black/55 hover:text-black transition-colors">
        ← Shop
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{id === "new" ? "New product" : "Edit product"}</h1>

      <form action={saveProduct} className="mt-6 space-y-5">
        <input type="hidden" name="__id" value={id} />

        <Field label="Name" required>
          <input name="name" required defaultValue={v("name")} className={inputCls} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Price (USD)" required>
            <input type="number" name="price" min="0" step="0.01" required defaultValue={v("price")} className={inputCls} />
          </Field>
          <Field label="Category">
            <input name="category" defaultValue={v("category")} className={inputCls} />
          </Field>
        </div>

        <Field label="Product image">
          <CoverUpload defaultUrl={v("image_url")} bucket="shop" />
        </Field>

        <Field label="Description">
          <textarea name="description" rows={3} defaultValue={v("description")} className={inputCls} />
        </Field>

        <Field label="Sizes / options" help="Comma-separated, e.g. S, M, L, XL — or One Size">
          <input name="sizes" defaultValue={v("sizes")} className={inputCls} />
        </Field>

        <Field label="Sort order" help="Lower numbers show first">
          <input type="number" name="sort_order" defaultValue={v("sort_order") || "0"} className={inputCls} />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={!!row?.featured} className="h-4 w-4" />
          Featured (shown in the Bestsellers section)
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={id === "new" ? true : !!row?.active} className="h-4 w-4" />
          Active (visible in the shop)
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
          >
            {id === "new" ? "Add product" : "Save changes"}
          </button>
          <Link href="/dashboard/shop" className="text-sm text-black/55 hover:text-black transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  help,
  required,
  children,
}: {
  label: string
  help?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {help && <p className="mt-1 text-xs text-black/45">{help}</p>}
    </div>
  )
}
