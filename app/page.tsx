"use client"

import { useState, useCallback, useEffect } from "react"
import { WindowFrame } from "@/frontend/components/window-frame"
import { NavButton } from "@/frontend/components/nav-button"
import { CardRevealSystem, type CardInstance } from "@/frontend/components/card-reveal"
import { AboutWindow } from "@/frontend/components/about-window"
import { WorkWindow } from "@/frontend/components/work-window"
import { LinksWindow } from "@/frontend/components/links-window"
import { FAQWindow } from "@/frontend/components/faq-window"
import { Waves } from "@/frontend/components/waves"
import { DarkModeToggle } from "@/frontend/components/dark-mode-toggle"
import { SourcesButton } from "@/frontend/components/sources-modal"
import { CommentsSection, type Comment } from "@/frontend/components/comments-section"
import { GlobalLikeButton } from "@/frontend/components/global-like-button"

let cardIdCounter = 0

export default function Home() {
  const [cards, setCards] = useState<CardInstance[]>([])

  // Comments state (will be replaced with SWR + Supabase)
  const [comments, setComments] = useState<Comment[]>([])
  const [globalLikes, setGlobalLikes] = useState(0)
  const [globalLiked, setGlobalLiked] = useState(false)
  const loadComments = useCallback(async () => {
  try {
    const res = await fetch("/api/comments");
    const json = await res.json();
    if (json.data) {
      setComments(json.data);
    }
  } catch (err) {
    console.error("Failed to load comments:", err);
  }
}, []);

// Initial load
useEffect(() => {
  loadComments();
}, [loadComments]);

const handleAddComment = useCallback(
  async (username: string, text: string) => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, text }),
    });

    if (res.ok) {
      loadComments(); // Refresh list after successful post
    }
  },
  [loadComments]
);


  const handleNavClick = useCallback((type: string) => {
    cardIdCounter++
    const newCard: CardInstance = {
      id: `card-${cardIdCounter}`,
      type,
      phase: "sliding",
      zIndex: 30 + cardIdCounter,
    }
    setCards((prev) => [...prev, newCard])
  }, [])

  const handleUpdateCard = useCallback(
    (id: string, updates: Partial<CardInstance>) => {
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      )
    },
    []
  )

  const handleRemoveCard = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const handleLikeComment = useCallback(
  async (commentId: number) => {
    await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment_id: commentId }),
    })

    loadComments()
  },
  [loadComments]
)


  const handleGlobalLike = useCallback(() => {
    setGlobalLiked((prev) => {
      setGlobalLikes((c) => (prev ? c - 1 : c + 1))
      return !prev
    })
  }, [])

  const totalCommentLikes = comments.reduce((sum, c) => sum + c.likes, 0)

  const renderWindow = useCallback(
    (
      type: string,
      props: { onClose: () => void; zIndex: number }
    ) => {
      switch (type) {
        case "about":
          return <AboutWindow {...props} />
        case "work":
          return <WorkWindow {...props} />
        case "link":
          return <LinksWindow {...props} />
        case "faq":
          return <FAQWindow {...props} />
        default:
          return null
      }
    },
    []
  )

  return (
    <div
      className="relative flex flex-col min-h-screen overflow-x-hidden"
      style={{ background: "var(--background)" }}
    >
      <DarkModeToggle />
      <Waves />

      <main
        className="flex-1 flex flex-col items-center justify-start relative px-4 pt-20 md:pt-28 pb-72"
        style={{ zIndex: 1 }}
      >
        {/* Main Window */}
        <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl">
          <WindowFrame title="home" showControls={false}>
            <div className="px-6 pb-6 pt-5">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                  <span style={{ color: "var(--foreground)" }}>{"hey! "}</span>
                  <span
                    className="font-serif"
                    style={{
                      background:
                        "linear-gradient(180deg, #c9a84c 0%, #6fa86e 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {"it's lois"}
                  </span>
                </h1>
                <p
                  className="text-sm md:text-base mt-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Illustrator, animator and hobbyist
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <NavButton
                  label="about"
                  icon={<></>}
                  onClick={() => handleNavClick("about")}
                />
                <NavButton
                  label="work"
                  icon={<></>}
                  onClick={() => handleNavClick("work")}
                />
                <NavButton
                  label="link"
                  icon={<></>}
                  onClick={() => handleNavClick("link")}
                />
                <NavButton
                  label="faq"
                  icon={<></>}
                  onClick={() => handleNavClick("faq")}
                />
              </div>
            </div>
          </WindowFrame>

          {/* Comments section -- below main window */}
          <div className="mt-4">
            <CommentsSection
              comments={comments}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              totalLikes={totalCommentLikes}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative text-center py-4 space-y-1.5"
        style={{ zIndex: 2 }}
      >
        <SourcesButton />
        <p
          className="text-xs font-semibold"
          style={{ color: "var(--secondary)" }}
        >
          {"© 2026 Lois Vera Cruz"}
        </p>
      </footer>

      {/* Global like button - bottom right */}
      <GlobalLikeButton
        count={globalLikes}
        liked={globalLiked}
        onLike={handleGlobalLike}
      />

      {/* Card overlay system */}
      <CardRevealSystem
        cards={cards}
        onUpdateCard={handleUpdateCard}
        onRemoveCard={handleRemoveCard}
        renderWindow={renderWindow}
      />
    </div>
  )
}
