"use client"

import { useState, useEffect, useCallback } from "react"
import { Heart, Send } from "lucide-react"
import { WindowFrame } from "./window-frame"

// Random username generator
const adjectives = [
  "Brave", "Gentle", "Cosmic", "Mystic", "Leafy", "Sunny", "Chill",
  "Wild", "Dreamy", "Funky", "Swift", "Cozy", "Bold", "Lush", "Warm",
]
const nouns = [
  "Tropius", "Treecko", "Bulbasaur", "Chikorita", "Turtwig", "Snivy",
  "Rowlet", "Grookey", "Sprigatito", "Leafeon", "Roserade", "Breloom",
]

function generateUsername(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(Math.random() * 99)
  return `${adj}${noun}${num}`
}

export interface Comment {
  id: number
  username: string
  text: string
  likes: number
  liked_by_me: boolean
  created_at: string
}

interface CommentsSectionProps {
  comments: Comment[]
  onAddComment: (username: string, text: string) => void
  onLikeComment: (commentId: number) => void
  totalLikes: number
}

export function CommentsSection({
  comments,
  onAddComment,
  onLikeComment,
  totalLikes,
}: CommentsSectionProps) {
  const [username, setUsername] = useState("")
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    setUsername(generateUsername())
  }, [])

  const handleSubmit = useCallback(() => {
    if (!commentText.trim()) return
    onAddComment(username.trim() || generateUsername(), commentText.trim())
    setCommentText("")
  }, [username, commentText, onAddComment])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  return (
    <WindowFrame title="comments" showControls={false}>
      <div className="flex flex-col" style={{ maxHeight: "400px" }}>
        {/* Submit form - top */}
        <div
          className="p-3 border-b space-y-2"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your name..."
              className="flex-1 text-xs rounded-lg px-3 py-1.5 border outline-none focus:ring-1"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
              maxLength={24}
            />
            <button
              onClick={() => setUsername(generateUsername())}
              className="text-xs px-2 py-1.5 rounded-lg font-semibold transition-colors"
              style={{
                background: "var(--btn-yellow)",
                color: "var(--secondary-foreground)",
              }}
              aria-label="Generate random username"
            >
              random
            </button>
          </div>
          <div className="flex gap-2 items-end">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="leave a comment..."
              rows={2}
              className="flex-1 text-sm rounded-lg px-3 py-2 border outline-none resize-none focus:ring-1"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
              maxLength={280}
            />
            <button
              onClick={handleSubmit}
              disabled={!commentText.trim()}
              className="p-2 rounded-lg transition-colors disabled:opacity-40"
              style={{
                background: "var(--btn-yellow)",
                color: "var(--secondary-foreground)",
              }}
              aria-label="Send comment"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comments list - scrollable */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {comments.length === 0 && (
            <p
              className="text-center text-xs py-6"
              style={{ color: "var(--muted-foreground)" }}
            >
              No comments yet. Be the first!
            </p>
          )}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg p-3 space-y-1.5"
              style={{ background: "var(--muted)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {comment.username}
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--foreground)" }}
              >
                {comment.text}
              </p>
              <button
                onClick={() => onLikeComment(comment.id)}
                className="flex items-center gap-1 text-xs transition-transform hover:scale-110 active:scale-95"
                style={{
                  color: comment.liked_by_me
                    ? "#e74c3c"
                    : "var(--muted-foreground)",
                }}
              >
                <Heart
                  className="w-3.5 h-3.5"
                  fill={comment.liked_by_me ? "#e74c3c" : "none"}
                />
                <span>{comment.likes}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Total likes footer */}
        <div
          className="flex items-center justify-end gap-1.5 px-3 py-2 border-t text-xs font-semibold"
          style={{
            borderColor: "var(--border)",
            color: "var(--secondary-foreground)",
          }}
        >
          <Heart
            className="w-3.5 h-3.5"
            fill="var(--btn-yellow)"
            style={{ color: "var(--btn-yellow)" }}
          />
          <span>{totalLikes} total likes</span>
        </div>
      </div>
    </WindowFrame>
  )
}
