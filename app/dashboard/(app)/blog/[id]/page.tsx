import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { saveBlogPost } from "../actions"
import { CoverUpload } from "@/components/dashboard/cover-upload"
import { JournalEditor } from "@/components/dashboard/journal-editor"

export const dynamic = "force-dynamic"

const inputCls =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

export default async function BlogForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let row: Record<string, any> | null = null
  if (id !== "new") {
    const { data } = await supabaseAdmin.from("blog_posts").select("*").eq("id", id).single()
    if (!data) notFound()
    row = data
  }

  const v = (key: string) => (row?.[key] as string | null) ?? ""

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/blog" className="text-sm text-black/55 hover:text-black transition-colors">
        ← Blog
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{id === "new" ? "New post" : "Edit post"}</h1>

      <form action={saveBlogPost} className="mt-6 space-y-5">
        <input type="hidden" name="__id" value={id} />

        <Field label="Title" required>
          <input name="title" required defaultValue={v("title")} className={inputCls} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Category">
            <input name="category" defaultValue={v("category")} className={inputCls} />
          </Field>
          <Field label="Read time" help="e.g. 5 min read">
            <input name="read_time" defaultValue={v("read_time")} className={inputCls} />
          </Field>
        </div>

        <Field label="Cover image">
          <CoverUpload defaultUrl={v("cover_url")} bucket="blog" />
        </Field>

        <Field label="Excerpt" help="Short summary shown in lists">
          <textarea name="excerpt" rows={2} defaultValue={v("excerpt")} className={inputCls} />
        </Field>

        <Field label="Body" help="Write freely and add photos inline">
          <JournalEditor name="body" defaultValue={v("body")} bucket="blog" />
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
            {id === "new" ? "Add post" : "Save changes"}
          </button>
          <Link href="/dashboard/blog" className="text-sm text-black/55 hover:text-black transition-colors">
            Cancel
          </Link>
        </div>
      </form>
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
