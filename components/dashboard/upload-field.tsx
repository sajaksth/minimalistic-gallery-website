"use client"

import { useRef, useState } from "react"
import { UploadCloud, Check, Loader2, X } from "lucide-react"

// Generic file picker that uploads straight to /api/dashboard/upload (a Route
// Handler, so no Server Action 1 MB limit) and writes the public URL into a
// hidden input named `name`. Works for images, audio, or any file.
export function UploadField({
  name,
  bucket,
  accept,
  defaultUrl = "",
  isImage = false,
}: {
  name: string
  bucket: string
  accept?: string
  defaultUrl?: string
  isImage?: boolean
}) {
  const [url, setUrl] = useState(defaultUrl)
  const [fileName, setFileName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setError(null)
    setUploading(true)
    setFileName(file.name)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("bucket", bucket)
      const res = await fetch("/api/dashboard/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload failed")
      setUrl(data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed")
      setUrl("")
      setFileName("")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-sm text-black/70 hover:border-black/30 transition-colors"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
        {uploading ? "Uploading…" : url ? "Replace file" : "Choose file"}
      </button>

      {isImage && url && !uploading && (
        <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden border border-black/10">
          <img src={url} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => {
              setUrl("")
              setFileName("")
              if (fileRef.current) fileRef.current.value = ""
            }}
            className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black"
            aria-label="Remove"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {!isImage && url && !uploading && (
        <p className="mt-1 flex items-center gap-1 text-xs text-green-700">
          <Check className="w-3.5 h-3.5" /> {fileName || "Uploaded"}
        </p>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />
      <input type="hidden" name={name} value={url} />
    </div>
  )
}
