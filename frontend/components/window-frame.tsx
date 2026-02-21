"use client"

import { X } from "lucide-react"
import type { ReactNode } from "react"

interface WindowFrameProps {
  title: string
  children: ReactNode
  onClose?: () => void
  className?: string
  showControls?: boolean
  zIndex?: number
  onFocus?: () => void
}

export function WindowFrame({
  title,
  children,
  onClose,
  className = "",
  showControls = true,
  onFocus,
}: WindowFrameProps) {
  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden border shadow-lg ${className}`}
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
      onClick={onFocus}
    >
      {/* Title Bar - draggable on desktop via data-titlebar */}
      <div
        data-titlebar="true"
        className="flex items-center justify-between px-3 py-2 select-none shrink-0 cursor-grab active:cursor-grabbing"
        style={{
          background: "var(--window-bar)",
          color: "var(--window-bar-foreground)",
        }}
      >
        <span className="text-sm font-bold tracking-wide lowercase">
          {title}
        </span>
        {showControls && onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="p-0.5 rounded hover:bg-white/20 transition-colors"
            aria-label="Close window"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
