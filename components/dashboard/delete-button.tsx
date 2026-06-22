"use client"

import { Trash2 } from "lucide-react"

export function DeleteButton({ label = "Delete this entry?" }: { label?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(label)) e.preventDefault()
      }}
      className="inline-flex items-center gap-1 text-sm text-red-600/80 hover:text-red-600 transition-colors"
      aria-label="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
