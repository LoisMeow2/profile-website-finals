"use client"

import { useState, useCallback } from "react"
import { Heart } from "lucide-react"

interface GlobalLikeButtonProps {
  count: number
  liked: boolean
  onLike: () => void
}

export function GlobalLikeButton({ count, liked, onLike }: GlobalLikeButtonProps) {
  const [animating, setAnimating] = useState(false)

  const handleClick = useCallback(() => {
    onLike()
    setAnimating(true)
    setTimeout(() => setAnimating(false), 400)
  }, [onLike])

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
      style={{
        background: "var(--btn-yellow)",
        color: "var(--secondary-foreground)",
        zIndex: 20,
      }}
      aria-label={`Like this page (${count} likes)`}
    >
      <Heart
        className="w-5 h-5 transition-transform"
        fill={liked ? "#e74c3c" : "none"}
        style={{
          color: liked ? "#e74c3c" : "var(--secondary-foreground)",
          transform: animating ? "scale(1.4)" : "scale(1)",
        }}
      />
      <span className="text-sm font-bold">{count}</span>
    </button>
  )
}
