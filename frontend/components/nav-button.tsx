"use client"

import { Info, Sparkles, Link2, HelpCircle } from "lucide-react"
import type { ReactNode } from "react"

interface NavButtonProps {
  label: string
  icon: ReactNode
  onClick: () => void
}

const iconMap: Record<string, ReactNode> = {
  about: <Info className="w-8 h-8" style={{ color: "var(--tropius-brown)" }} />,
  work: <Sparkles className="w-8 h-8" style={{ color: "var(--tropius-brown)" }} />,
  link: <Link2 className="w-8 h-8" style={{ color: "var(--tropius-brown)" }} />,
  faq: <HelpCircle className="w-8 h-8" style={{ color: "var(--tropius-brown)" }} />,
}

export function NavButton({ label, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      style={{
        background: "var(--btn-yellow)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--btn-yellow-hover)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--btn-yellow)"
      }}
    >
      {iconMap[label.toLowerCase()] || (
        <Info className="w-8 h-8" style={{ color: "var(--tropius-brown)" }} />
      )}
      <span
        className="text-sm font-bold lowercase"
        style={{ color: "var(--tropius-brown)" }}
      >
        {label}
      </span>
    </button>
  )
}
