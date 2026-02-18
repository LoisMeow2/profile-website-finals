"use client"

import { useState, useCallback, useEffect } from "react"
import { FireworkEffect } from "./firework-effect"

type CardPhase = "sliding" | "landed" | "firework" | "shrinking" | "window"

export interface CardInstance {
  id: string
  type: string
  phase: CardPhase
  zIndex: number
}

const CARD_OFFSETS: Record<string, { x: string; y: string }> = {
  about: { x: "-8vw", y: "-4vh" },
  work:  { x: "8vw",  y: "-4vh" },
  link:  { x: "-8vw", y: "4vh" },
  faq:   { x: "8vw",  y: "4vh" },
}

interface CardRevealSystemProps {
  cards: CardInstance[]
  onUpdateCard: (id: string, updates: Partial<CardInstance>) => void
  onRemoveCard: (id: string) => void
  renderWindow: (
    type: string,
    props: { onClose: () => void; zIndex: number }
  ) => React.ReactNode
}

export function CardRevealSystem({
  cards,
  onUpdateCard,
  onRemoveCard,
  renderWindow,
}: CardRevealSystemProps) {
  const [fireworkCardId, setFireworkCardId] = useState<string | null>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    cards.forEach((card) => {
      if (card.phase === "sliding") {
        const t = setTimeout(() => {
          onUpdateCard(card.id, { phase: "landed" })
        }, 900)
        timers.push(t)
      }
    })
    return () => timers.forEach(clearTimeout)
  }, [cards, onUpdateCard])

  const handleCardTap = useCallback(
    (cardId: string) => {
      const card = cards.find((c) => c.id === cardId)
      if (!card || card.phase !== "landed") return
      const maxZ = Math.max(...cards.map((c) => c.zIndex), 30)
      onUpdateCard(cardId, { phase: "firework", zIndex: maxZ + 1 })
      setFireworkCardId(cardId)
    },
    [cards, onUpdateCard]
  )

  const handleFireworkDone = useCallback(
    (cardId: string) => {
      setFireworkCardId(null)
      onUpdateCard(cardId, { phase: "shrinking" })
      setTimeout(() => {
        onUpdateCard(cardId, { phase: "window" })
      }, 500)
    },
    [onUpdateCard]
  )

  const handleClose = useCallback(
    (cardId: string) => {
      onRemoveCard(cardId)
    },
    [onRemoveCard]
  )

  const bringToFront = useCallback(
    (cardId: string) => {
      const maxZ = Math.max(...cards.map((c) => c.zIndex), 30)
      onUpdateCard(cardId, { zIndex: maxZ + 1 })
    },
    [cards, onUpdateCard]
  )

  return (
    <>
      {cards.map((card) => {
        const offset = CARD_OFFSETS[card.type] || { x: "0", y: "0" }

        if (
          card.phase === "sliding" ||
          card.phase === "landed" ||
          card.phase === "firework" ||
          card.phase === "shrinking"
        ) {
          const isSliding = card.phase === "sliding"
          const isLanded = card.phase === "landed"
          const isShrinking = card.phase === "firework" || card.phase === "shrinking"

          return (
            <div
              key={card.id}
              className="fixed inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: card.zIndex }}
            >
              {/* Outer: handles the offset position (never animated) */}
              <div
                style={{
                  transform: `translate(${offset.x}, ${offset.y})`,
                  position: "relative",
                }}
              >
                {/* Inner: handles the slide / float / shrink animation */}
                <div
                  className="pointer-events-auto cursor-pointer"
                  onClick={() => handleCardTap(card.id)}
                  style={{
                    width: "min(260px, 65vw)",
                    aspectRatio: "63/88",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "var(--primary)",
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15)",
                    ...(isSliding
                      ? {
                          transform: "translateY(100vh) scale(0.95)",
                          animation:
                            "card-slide-in 1s cubic-bezier(0.22, 1, 0.36, 1) both",
                        }
                      : isLanded
                      ? {
                          animation: "float-gentle 3s ease-in-out infinite",
                        }
                      : isShrinking
                      ? {
                          animation:
                            "card-shrink-reveal 0.5s ease-in forwards",
                        }
                      : {}),
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/card_back.jpg"
                    alt="Card back"
                    className="w-full h-full object-cover select-none"
                    draggable={true}
                  />
                </div>

                {/* Firework */}
                {fireworkCardId === card.id && card.phase === "firework" && (
                  <FireworkEffect
                    active={true}
                    onComplete={() => handleFireworkDone(card.id)}
                  />
                )}
              </div>
            </div>
          )
        }

        if (card.phase === "window") {
          return (
            <DraggableWindow
              key={card.id}
              card={card}
              offset={offset}
              bringToFront={bringToFront}
              handleClose={handleClose}
              renderWindow={renderWindow}
            />
          )
        }

        return null
      })}
    </>
  )
}

function DraggableWindow({
  card,
  offset,
  bringToFront,
  handleClose,
  renderWindow,
}: {
  card: CardInstance
  offset: { x: string; y: string }
  bringToFront: (id: string) => void
  handleClose: (id: string) => void
  renderWindow: CardRevealSystemProps["renderWindow"]
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as HTMLElement
      const titleBar = target.closest("[data-titlebar]")
      if (!titleBar) return

      e.preventDefault()
      bringToFront(card.id)
      setDragging(true)
      setDragStart({
        x: e.clientX - (pos?.x ?? 0),
        y: e.clientY - (pos?.y ?? 0),
      })
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [card.id, bringToFront, pos]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return
      setPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    },
    [dragging, dragStart]
  )

  const handlePointerUp = useCallback(() => {
    setDragging(false)
  }, [])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: card.zIndex }}
    >
      <div
        className="pointer-events-auto"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={() => bringToFront(card.id)}
        style={{
          transform: pos
            ? `translate(${pos.x}px, ${pos.y}px)`
            : `translate(${offset.x}, ${offset.y})`,
          animation: !pos
            ? "window-reveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
            : undefined,
          cursor: dragging ? "grabbing" : undefined,
        }}
      >
        {renderWindow(card.type, {
          onClose: () => handleClose(card.id),
          zIndex: card.zIndex,
        })}
      </div>
    </div>
  )
}
