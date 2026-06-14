import { ShopFilters } from "@/components/shop/shop-filters"
import { ProductGrid } from "@/components/shop/product-grid"
import { FeaturedProducts } from "@/components/shop/featured-products"

const products = [
  {
    id: "p1",
    name: "Alpine Majesty Print",
    price: 85,
    category: "Prints",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    description: "Museum-quality archival print on heavyweight matte paper.",
    sizes: ["8x10", "12x16", "18x24", "24x36"],
  },
  {
    id: "p2",
    name: "Gallery Tee - Black",
    price: 45,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    description: "Premium organic cotton t-shirt with minimal logo.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p3",
    name: "Ocean Blue Print",
    price: 95,
    category: "Prints",
    image: "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=600&q=80",
    description: "Limited edition fine art print, signed and numbered.",
    sizes: ["12x16", "18x24", "24x36"],
  },
  {
    id: "p4",
    name: "Ambient Horizons - Vinyl",
    price: 35,
    category: "Music",
    image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&q=80",
    description: "180g vinyl with full-color gatefold sleeve.",
    sizes: ["Standard"],
  },
  {
    id: "p5",
    name: "Canvas Tote",
    price: 28,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    description: "Heavy-duty canvas tote with leather handles.",
    sizes: ["One Size"],
  },
  {
    id: "p6",
    name: "Desert Silence Print",
    price: 75,
    category: "Prints",
    image: "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?w=600&q=80",
    description: "Giclée print on archival cotton rag paper.",
    sizes: ["8x10", "12x16", "18x24"],
  },
  {
    id: "p7",
    name: "Gallery Hoodie",
    price: 85,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    description: "Heavyweight French terry hoodie with embroidered logo.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p8",
    name: "Story Collection - Hardcover",
    price: 42,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    description: "Complete anthology of stories with exclusive artwork.",
    sizes: ["Standard"],
  },
  {
    id: "p9",
    name: "Forest Path Print",
    price: 85,
    category: "Prints",
    image: "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=600&q=80",
    description: "Hand-finished print with subtle texture.",
    sizes: ["12x16", "18x24", "24x36"],
  },
  {
    id: "p10",
    name: "Nocturnal Echoes - Vinyl",
    price: 38,
    category: "Music",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    description: "Double LP on colored vinyl, limited pressing.",
    sizes: ["Standard"],
  },
  {
    id: "p11",
    name: "Leather Notebook",
    price: 32,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
    description: "Hand-stitched leather journal with acid-free pages.",
    sizes: ["A5", "A6"],
  },
  {
    id: "p12",
    name: "Gallery Cap",
    price: 38,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    description: "Unstructured cotton cap with embroidered logo.",
    sizes: ["One Size"],
  },
]

const categories = ["All", "Prints", "Apparel", "Music", "Books", "Accessories"]

export default function ShopPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-16 lg:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-6xl font-light tracking-tight">
            Shop
          </h1>
          <p className="mt-6 text-muted-foreground text-lg text-pretty">
            Exclusive prints, apparel, vinyl, and accessories. 
            Each piece crafted with care and attention to detail.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts products={products.slice(0, 3)} />

      {/* Filters */}
      <ShopFilters categories={categories} />

      {/* Products Grid */}
      <ProductGrid products={products} />
    </div>
  )
}
