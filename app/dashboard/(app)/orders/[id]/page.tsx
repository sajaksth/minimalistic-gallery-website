import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { updateOrderStatus, deleteOrder } from "../actions"

export const dynamic = "force-dynamic"

const STATUSES = ["new", "paid", "shipped", "completed", "cancelled"]

type Item = { name: string; price: number; quantity: number; image: string; category: string }

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: order } = await supabaseAdmin.from("orders").select("*").eq("id", id).single()
  if (!order) notFound()

  const items = (order.items ?? []) as Item[]
  const ship = [order.address, order.city, order.postal_code, order.country].filter(Boolean).join(", ")

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/orders" className="text-sm text-black/55 hover:text-black transition-colors">
        ← Orders
      </Link>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{order.customer_name}</h1>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                order.payment_status === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-neutral-100 text-black/55"
              }`}
            >
              {order.payment_status === "paid" ? "Paid" : "Unpaid"}
            </span>
          </div>
          <p className="text-sm text-black/55">{order.email}</p>
          <p className="mt-1 text-xs text-black/45">{fmtDateTime(order.created_at)}</p>
        </div>
        <form action={deleteOrder}>
          <input type="hidden" name="__id" value={order.id} />
          <DeleteButton label="Delete this order?" />
        </form>
      </div>

      {/* Status */}
      <form action={updateOrderStatus} className="mt-6 flex items-end gap-3">
        <input type="hidden" name="__id" value={order.id} />
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            defaultValue={order.status}
            className="rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 capitalize"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
        >
          Update
        </button>
      </form>

      {/* Shipping */}
      {(ship || order.note) && (
        <div className="mt-6 rounded-xl border border-black/10 bg-white p-5 text-sm">
          {ship && (
            <p>
              <span className="text-black/55">Ship to: </span>
              {ship}
            </p>
          )}
          {order.note && (
            <p className="mt-2">
              <span className="text-black/55">Note: </span>
              {order.note}
            </p>
          )}
        </div>
      )}

      {/* Items */}
      <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-black/55">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Qty</th>
              <th className="px-4 py-3 font-medium text-right">Line total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={idx} className="border-t border-black/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {it.image ? (
                      <img src={it.image} alt="" className="w-9 h-9 rounded object-cover" />
                    ) : (
                      <div className="w-9 h-9 rounded bg-neutral-100" />
                    )}
                    <div>
                      <span className="font-medium">{it.name}</span>
                      <span className="block text-xs text-black/45">${Number(it.price).toFixed(2)} each</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-black/60">{it.quantity}</td>
                <td className="px-4 py-3 text-right">${(Number(it.price) * it.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-black/10 bg-neutral-50">
              <td className="px-4 py-3 font-medium" colSpan={2}>
                Subtotal
              </td>
              <td className="px-4 py-3 text-right font-semibold">${Number(order.subtotal).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
