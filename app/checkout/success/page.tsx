import Link from "next/link"
import { Check } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { ClearCartOnMount } from "@/components/checkout/clear-cart-on-mount"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { stripe } from "@/lib/stripe"

export const dynamic = "force-dynamic"

// Reconcile the order against Stripe in case the webhook hasn't fired yet.
async function reconcile(orderId?: string, sessionId?: string) {
  if (!sessionId) return false
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status === "paid") {
      const id = orderId || (session.metadata?.order_id as string | undefined)
      if (id) {
        await supabaseAdmin
          .from("orders")
          .update({ payment_status: "paid", status: "paid" })
          .eq("id", id)
          .eq("payment_status", "unpaid")
      }
      return true
    }
  } catch {
    // ignore — webhook can still reconcile later
  }
  return false
}

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; session_id?: string }>
}) {
  const { id, session_id } = await searchParams
  const paid = await reconcile(id, session_id)

  return (
    <div className="bg-white text-foreground">
      <ClearCartOnMount />
      <SectionHeader title="Thank you" />
      <div className="max-w-xl mx-auto px-6 pb-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <Check className="h-7 w-7 text-green-700" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-medium">
          {paid ? "Payment received" : "Your order is in"}
        </h2>
        <p className="mt-3 text-sm text-black/55 leading-relaxed">
          {paid
            ? "Thanks for your purchase! We've received your payment and will get your order ready to ship."
            : "Thanks for your order. We've received it and will confirm your payment shortly."}
        </p>
        {id && (
          <p className="mt-4 text-xs text-black/45">
            Order reference: <span className="font-mono">{id}</span>
          </p>
        )}
        <Link
          href="/shop"
          className="mt-8 inline-block font-brush text-base text-black/70 hover:text-black transition-colors"
        >
          ← Continue shopping
        </Link>
      </div>
    </div>
  )
}
