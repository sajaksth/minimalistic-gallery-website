import { ShopFilters } from "@/components/shop/shop-filters"
import { ProductGrid } from "@/components/shop/product-grid"
import { FeaturedProducts } from "@/components/shop/featured-products"
import { SectionHeader } from "@/components/section-header"
import { createSupabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

function parseSizes(raw: string | null): string[] {
  if (!raw) return ["One Size"]
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean)
  return list.length ? list : ["One Size"]
}

export default async function ShopPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from("products")
    .select("id, name, price, category, description, image_url, sizes, featured, sort_order, created_at")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  const products = (data ?? []).map((p) => ({
    id: p.id as string,
    name: p.name as string,
    price: Number(p.price ?? 0),
    category: (p.category as string) ?? "Other",
    image: (p.image_url as string) ?? "",
    description: (p.description as string) ?? "",
    sizes: parseSizes(p.sizes as string | null),
    featured: !!p.featured,
  }))

  const featured = products.filter((p) => p.featured).slice(0, 3)
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <div className="bg-white text-foreground">
      <SectionHeader
        title="Shop"
        description="Prints, apparel, and small things made with care."
      />

      {products.length === 0 ? (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <p className="text-center text-sm text-black/55">No products available yet — check back soon.</p>
        </section>
      ) : (
        <>
          {featured.length > 0 && <FeaturedProducts products={featured} />}
          <ShopFilters categories={categories} />
          <ProductGrid products={products} />
        </>
      )}
    </div>
  )
}
