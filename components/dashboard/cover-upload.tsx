"use client"

import { useRef, useState } from "react"
import { ImagePlus, X } from "lucide-react"

// Cover image picker. The chosen File is submitted via the form (name="cover_file")
// and uploaded server-side. On edit, the existing URL is kept (hidden input) unless replaced.
export function CoverUpload({ defaultUrl = "" }: { defaultUrl?: string }) {
  const [preview, setPreview] = useState(defaultUrl)
  const [keepUrl, setKeepUrl] = useState(defaultUrl)
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      {preview ? (
        <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-black/10">
          <img src={preview} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview("")
              setKeepUrl("")
              if (fileRef.current) fileRef.current.value = ""
            }}
            className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black"
            aria-label="Remove cover"
          >
            <X className="w-3.5 h-3.5" />
          </button>
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
        name="cover_file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) setPreview(URL.createObjectURL(f))
        }}
      />
      {/* preserve existing cover when not replaced */}
      <input type="hidden" name="cover_url" value={keepUrl} />
    </div>
  )
}
