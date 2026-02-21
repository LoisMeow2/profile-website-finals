"use client"

import { WindowFrame } from "./window-frame"
import { useState } from "react"
import { X } from "lucide-react"

interface WorkWindowProps {
  onClose: () => void
  zIndex: number
}

export function WorkWindow({ onClose }: WorkWindowProps) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  return (
    <>
      <WindowFrame
        title="work"
        onClose={onClose}
        className="w-[320px] md:w-[420px]"
      >
        <div className="p-5 space-y-5 overflow-y-auto max-h-[65vh]">
          <p
            className="text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            Tip: tap an image to view fullscreen.
          </p>

          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
            Illustrations
          </h2>

          {/* Small Style */}
          <div>
            <h3 className="font-bold text-sm mb-2" style={{ color: "var(--foreground)" }}>
              small style
            </h3>
            <button
              className="w-full rounded-lg overflow-hidden border cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ borderColor: "var(--border)" }}
              onClick={() => setFullscreenImage("/images/smallstyle.png")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/smallstyle.png"
                alt="Small style illustration"
                className="w-full h-auto object-cover"
              />
            </button>
          </div>

          {/* Refsheets */}
          <div>
            <h3 className="font-bold text-sm mb-2" style={{ color: "var(--foreground)" }}>
              refsheets
            </h3>
            <button
              className="w-full rounded-lg overflow-hidden border cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ borderColor: "var(--border)" }}
              onClick={() => setFullscreenImage("/images/refsheet.png")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/refsheet.png"
                alt="Reference sheet illustration"
                className="w-full h-auto object-cover"
              />
            </button>
          </div>
        </div>
      </WindowFrame>

      {/* Fullscreen image viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", zIndex: 9999 }}
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
            }}
            onClick={() => setFullscreenImage(null)}
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fullscreenImage}
            alt="Fullscreen artwork"
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
          />
        </div>
      )}
    </>
  )
}
