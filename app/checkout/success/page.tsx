import Link from "next/link"
import { Check } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams

  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Thank you" />
      <div className="max-w-xl mx-auto px-6 pb-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <Check className="h-7 w-7 text-green-700" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-medium">Your order is in</h2>
        <p className="mt-3 text-sm text-black/55 leading-relaxed">
          Thanks for your order. We've received it and will email you shortly to arrange payment and
          shipping.
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
