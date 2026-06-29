import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

type Order = {
  id: string
  customer_name: string
  email: string
  item_count: number
  subtotal: number
  status: string
  payment_status: string | null
  created_at: string
}

const statusStyle: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  paid: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-neutral-200 text-black/55",
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default async function OrdersList() {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, customer_name, email, item_count, subtotal, status, payment_status, created_at")
    .order("created_at", { ascending: false })

  const orders = (data ?? []) as Order[]

  return (
    <div>
      <h1 className="text-2xl font-semibold">Orders</h1>

      {error && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn't load orders. Run <code className="font-mono">supabase/orders.sql</code> in Supabase first.
        </div>
      )}

      {!error && orders.length === 0 && (
        <p className="mt-8 text-sm text-black/55">No orders yet.</p>
      )}

      {orders.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-black/55">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-black/5 hover:bg-neutral-50/60">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/orders/${o.id}`} className="block">
                      <span className="font-medium">{o.customer_name}</span>
                      <span className="block text-xs text-black/45">{o.email}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-black/60">{o.item_count}</td>
                  <td className="px-4 py-3 text-black/60">${Number(o.subtotal).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        o.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-black/55"
                      }`}
                    >
                      {o.payment_status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                        statusStyle[o.status] ?? "bg-neutral-100 text-black/55"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-black/55">{fmtDate(o.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
