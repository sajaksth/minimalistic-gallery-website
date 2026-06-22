import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { saveJournal } from "../actions"

export const dynamic = "force-dynamic"

export default async function JournalForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let row: Record<string, unknown> | null = null
  if (id !== "new") {
    const { data } = await supabaseAdmin.from("journal_entries").select("*").eq("id", id).single()
    if (!data) notFound()
    row = data
  }

  const v = (key: string) => (row?.[key] as string | null) ?? ""

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/journal" className="text-sm text-black/55 hover:text-black transition-colors">
        ← Travel Journals
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{id === "new" ? "New entry" : "Edit entry"}</h1>

      <form action={saveJournal} className="mt-6 space-y-5">
        <input type="hidden" name="__id" value={id} />

        <Field label="Title" required>
          <input name="title" required defaultValue={v("title")} className={inputCls} />
        </Field>

        <Field label="Slug" required help="URL id, e.g. day-one-in-pokhara">
          <input name="slug" required defaultValue={v("slug")} className={inputCls} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Trip" help="Optional — groups entries">
            <input name="trip" defaultValue={v("trip")} className={inputCls} />
          </Field>
          <Field label="Location">
            <input name="location" defaultValue={v("location")} className={inputCls} />
          </Field>
        </div>

        <Field label="Date">
          <input type="date" name="entry_date" defaultValue={v("entry_date")} className={inputCls} />
        </Field>

        <Field label="Excerpt" help="Short summary shown in lists">
          <textarea name="excerpt" rows={2} defaultValue={v("excerpt")} className={inputCls} />
        </Field>

        <Field label="Body">
          <textarea name="body" rows={10} defaultValue={v("body")} className={inputCls} />
        </Field>

        <Field label="Cover image URL">
          <input name="cover_url" defaultValue={v("cover_url")} className={inputCls} />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={!!row?.published} className="h-4 w-4" />
          Published (visible on the public site)
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
          >
            {id === "new" ? "Create entry" : "Save changes"}
          </button>
          <Link href="/dashboard/journal" className="text-sm text-black/55 hover:text-black transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

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
