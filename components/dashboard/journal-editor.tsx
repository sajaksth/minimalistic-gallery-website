"use client"

import { useRef, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { Bold, Italic, Heading2, List, ImagePlus } from "lucide-react"

// "What you see, what you get" body editor. Inline images upload to Supabase
// Storage and embed by URL. The HTML is mirrored into a hidden input named "body".
export function JournalEditor({
  name = "body",
  defaultValue = "",
  bucket = "journal",
}: {
  name?: string
  defaultValue?: string
  bucket?: string
}) {
  const [html, setHtml] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [StarterKit, Image.configure({ inline: false })],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "max-w-none min-h-[260px] px-4 py-3 focus:outline-none leading-relaxed [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-0.5 [&_img]:rounded-lg [&_img]:my-3",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  })

  async function uploadImage(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("bucket", bucket)
      const res = await fetch("/api/dashboard/upload", { method: "POST", body: fd })
      const json = await res.json()
      if (res.ok && json.url) {
        editor?.chain().focus().setImage({ src: json.url }).run()
      } else {
        alert(json.error || "Upload failed")
      }
    } finally {
      setUploading(false)
    }
  }

  const Btn = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void
    active?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded p-1.5 transition-colors ${active ? "bg-black text-white" : "text-black/60 hover:bg-black/5 hover:text-black"}`}
    >
      {children}
    </button>
  )

  return (
    <div className="rounded-lg border border-black/15 overflow-hidden">
      <div className="flex items-center gap-1 border-b border-black/10 bg-neutral-50 px-2 py-1.5">
        <Btn title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")}>
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")}>
          <Italic className="w-4 h-4" />
        </Btn>
        <Btn
          title="Heading"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor?.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </Btn>
        <Btn title="Bullet list" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")}>
          <List className="w-4 h-4" />
        </Btn>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <Btn title="Insert image" onClick={() => fileRef.current?.click()}>
          <ImagePlus className="w-4 h-4" />
        </Btn>
        {uploading && <span className="ml-1 text-xs text-black/45">Uploading…</span>}
      </div>

      <EditorContent editor={editor} />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) uploadImage(f)
          e.target.value = ""
        }}
      />
      <input type="hidden" name={name} value={html} />
    </div>
  )
}
