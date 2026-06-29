"use client"

import { useRef, useState } from "react"
import { ImagePlus, X, Loader2 } from "lucide-react"

// Cover image picker. Uploads the chosen file straight to /api/dashboard/upload
// (a Route Handler, so it is NOT subject to the Server Action 1 MB body limit),
// then stores only the returned public URL in the hidden "cover_url" input.
export function CoverUpload({
  defaultUrl = "",
  bucket = "journal",
}: {
  defaultUrl?: string
  bucket?: string
}) {
  const [preview, setPreview] = useState(defaultUrl)
  const [url, setUrl] = useState(defaultUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setError(null)
    setUploading(true)
    setPreview(URL.createObjectURL(file))
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
      setPreview("")
      setUrl("")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {preview ? (
        <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-black/10">
          <img src={preview} alt="" className="w-full h-full object-cover" />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={() => {
                setPreview("")
                setUrl("")
                if (fileRef.current) fileRef.current.value = ""
              }}
              className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              aria-label="Remove cover"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-48 h-32 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-black/25 text-black/45 hover:border-black/40 hover:text-black/70 transition-colors"
        >
          <ImagePlus className="w-5 h-5" />
          <span className="text-xs">Upload cover</span>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {/* Only the public URL is submitted with the form. */}
      <input type="hidden" name="cover_url" value={url} />
    </div>
  )
}
