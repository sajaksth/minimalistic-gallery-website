import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { saveJournal } from "../actions"
import { CoverUpload } from "@/components/dashboard/cover-upload"
import { JournalEditor } from "@/components/dashboard/journal-editor"

export const dynamic = "force-dynamic"

export default async function JournalForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let row: Record<string, any> | null = null
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Trip" help="Optional — groups entries">
            <input name="trip" defaultValue={v("trip")} className={inputCls} />
          </Field>
          <Field label="Location">
            <input name="location" defaultValue={v("location")} className={inputCls} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Start date">
            <input type="date" name="start_date" defaultValue={v("start_date")} className={inputCls} />
          </Field>
          <Field label="End date">
            <input type="date" name="end_date" defaultValue={v("end_date")} className={inputCls} />
          </Field>
        </div>

        <Field label="Cover image">
          <CoverUpload defaultUrl={v("cover_url")} />
        </Field>

        <Field label="Excerpt" help="Short summary shown in lists">
          <textarea name="excerpt" rows={2} defaultValue={v("excerpt")} className={inputCls} />
        </Field>

        <Field label="What I saw, what I felt" help="Write freely and add photos inline">
          <JournalEditor name="body" defaultValue={v("body")} />
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
