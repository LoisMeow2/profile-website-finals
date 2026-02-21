"use client"

import { Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

export function DarkModeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains("dark")
    setDark(isDark)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [dark, mounted])

  if (!mounted) return null

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="fixed top-4 right-4 p-2.5 rounded-full border shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        zIndex: 100,
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--tropius-brown)",
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
