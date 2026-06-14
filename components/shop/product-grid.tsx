"use client"

import { useState } from "react"
import { ShoppingBag, X, Check } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
  sizes: string[]
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const { addItem, setIsOpen } = useCart()

  const openQuickView = (product: Product) => {
    setSelectedProduct(product)
    setSelectedSize(product.sizes[0])
  }

  const closeQuickView = () => {
    setSelectedProduct(null)
    setSelectedSize("")
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: `${product.id}-${selectedSize || product.sizes[0]}`,
      name: `${product.name}${selectedSize ? ` (${selectedSize})` : ""}`,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    closeQuickView()
    setIsOpen(true)
  }

  return (
    <>
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <button
                  onClick={() => openQuickView(product)}
                  className="relative w-full aspect-[3/4] overflow-hidden bg-muted mb-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                    <span className="px-4 py-2 bg-background text-foreground text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                      Quick View
                    </span>
                  </div>
                </button>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm truncate">{product.name}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {product.category}
                    </p>
                  </div>
                  <p className="font-medium text-sm flex-shrink-0">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <>
          <div
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={closeQuickView}
          />
          <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-background max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 p-2 z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="aspect-square bg-muted">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 flex flex-col">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {selectedProduct.category}
                  </p>
                  <h2 className="font-serif text-2xl font-light">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xl mt-2">${selectedProduct.price}</p>
                  <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Size Selector */}
                  {selectedProduct.sizes.length > 1 && (
                    <div className="mt-6">
                      <p className="text-sm font-medium mb-3">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              "px-4 py-2 text-sm border transition-colors",
                              selectedSize === size
                                ? "border-foreground bg-foreground text-background"
                                : "border-border hover:border-foreground"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Add to Cart */}
                <div className="mt-8">
                  <Button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="w-full h-12 rounded-none text-sm uppercase tracking-wide"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Free shipping on orders over $100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
