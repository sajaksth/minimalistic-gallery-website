"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { SectionHeader } from "@/components/section-header"
import { placeOrder } from "./actions"

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      const { id } = await placeOrder({
        customer_name: String(fd.get("customer_name") || ""),
        email: String(fd.get("email") || ""),
        address: String(fd.get("address") || ""),
        city: String(fd.get("city") || ""),
        postal_code: String(fd.get("postal_code") || ""),
        country: String(fd.get("country") || ""),
        note: String(fd.get("note") || ""),
        items: items.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          category: i.category,
        })),
      })
      clearCart()
      router.push(`/checkout/success?id=${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Checkout" description="Almost there — just your details." />

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-black/55">Your cart is empty.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block font-brush text-base text-black/70 hover:text-black transition-colors"
            >
              ← Back to shop
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            {/* Customer form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-serif text-xl font-medium">Contact & shipping</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" required>
                  <input name="customer_name" required className={inputCls} />
                </Field>
                <Field label="Email" required>
                  <input type="email" name="email" required className={inputCls} />
                </Field>
              </div>

              <Field label="Address">
                <input name="address" className={inputCls} />
              </Field>

              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="City">
                  <input name="city" className={inputCls} />
                </Field>
                <Field label="Postal code">
                  <input name="postal_code" className={inputCls} />
                </Field>
                <Field label="Country">
                  <input name="country" className={inputCls} />
                </Field>
              </div>

              <Field label="Order note" help="Optional">
                <textarea name="note" rows={3} className={inputCls} />
              </Field>

              {error && (
                <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-none bg-black text-white text-sm uppercase tracking-wide hover:bg-black/90 transition-colors disabled:opacity-60"
              >
                {loading ? "Placing order…" : "Place order"}
              </button>
              <p className="text-xs text-black/45 text-center">
                No payment is taken online — we'll email you to arrange payment and shipping.
              </p>
            </form>

            {/* Order summary */}
            <aside className="lg:border-l lg:border-black/10 lg:pl-10">
              <h2 className="font-serif text-xl font-medium mb-5">Your order</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-neutral-100 flex-shrink-0 overflow-hidden rounded">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-black/45">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                <span className="text-black/60">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
            </aside>
          </div>
        )}
      </div>
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
