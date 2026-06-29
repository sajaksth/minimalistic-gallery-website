import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { deleteProduct } from "./actions"

export const dynamic = "force-dynamic"

type Product = {
  id: string
  name: string
  price: number
  category: string | null
  image_url: string | null
  active: boolean
  featured: boolean
}

export default async function ShopList() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, name, price, category, image_url, active, featured")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  const products = (data ?? []) as Product[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Shop</h1>
        <Link
          href="/dashboard/shop/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New product
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load products. Run <code className="font-mono">supabase/shop.sql</code> in Supabase first.
        </div>
      )}

      {!error && products.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No products yet. Add your first.</p>
      )}

      {products.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-black/55">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-black/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img src={p.image_url} alt="" className="w-9 h-9 rounded object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded bg-neutral-100" />
                      )}
                      <span className="font-medium">{p.name}</span>
                      {p.featured && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black/60">{p.category ?? "—"}</td>
                  <td className="px-4 py-3 text-black/60">${p.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        p.active
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                          : "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-black/55"
                      }
                    >
                      {p.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/shop/${p.id}`} className="text-black/60 hover:text-black" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="__id" value={p.id} />
                        <DeleteButton label="Delete this product?" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
