"use client"

import { useCart } from "@/components/cart-provider"
import { ShoppingBag } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
  sizes: string[]
}

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addItem, setIsOpen } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    setIsOpen(true)
  }

  return (
    <section className="py-16 lg:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Bestsellers
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight">
            Featured Products
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 left-4 right-4 h-11 bg-background text-foreground text-sm uppercase tracking-wide flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {product.category}
                  </p>
                </div>
                <p className="font-medium text-sm">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
