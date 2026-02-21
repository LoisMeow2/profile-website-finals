"use client"

import { useState } from "react"
import { X, ExternalLink } from "lucide-react"

const sources = [
  {
    category: "Card Interactions",
    items: [
      { name: "Pokemon TCG Pocket", desc: "Card reveal / pack opening animation inspiration" },
      { name: "Balatro", desc: "Card throw animation style" },
    ],
  },
  {
    category: "Window System",
    items: [
      { name: "sharyap.com", url: "https://www.sharyap.com", desc: "Desktop OS window-style layout, draggable windows" },
    ],
  },
  {
    category: "Animations & Waves",
    items: [
      { name: "React + Next.js", desc: "Client-side interactivity and SSR" },
      { name: "CSS Keyframes", desc: "Custom card throw, float, firework, and wave animations" },
    ],
  },
  {
    category: "Design Palette",
    items: [
      { name: "Tropius (Pokemon)", desc: "Earth greens and warm browns color palette inspiration" },
    ],
  },
]

export function SourcesButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-semibold underline underline-offset-2 transition-colors hover:opacity-80"
        style={{ color: "var(--secondary)" }}
      >
        sources
      </button>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 9998, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border shadow-xl overflow-hidden"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ background: "var(--window-bar)", color: "var(--window-bar-foreground)" }}
            >
              <span className="text-sm font-bold tracking-wide lowercase">sources</span>
              <button
                onClick={() => setOpen(false)}
                className="p-0.5 rounded hover:bg-foreground/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Credits and inspirations for the features on this site.
              </p>
              {sources.map((group) => (
                <div key={group.category}>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "var(--foreground)" }}>
                    {group.category}
                  </h3>
                  <div className="space-y-1.5">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start gap-2 px-3 py-2 rounded-lg text-sm"
                        style={{ background: "var(--muted)" }}
                      >
                        <div className="flex-1">
                          {"url" in item && item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold inline-flex items-center gap-1 hover:underline"
                              style={{ color: "var(--tropius-green)" }}
                            >
                              {item.name}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                              {item.name}
                            </span>
                          )}
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
