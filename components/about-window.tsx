"use client"

import { WindowFrame } from "./window-frame"

interface AboutWindowProps {
  onClose: () => void
  zIndex: number
}

export function AboutWindow({ onClose }: AboutWindowProps) {
  return (
    <WindowFrame
      title="about"
      onClose={onClose}
      className="w-[320px] md:w-[400px]"
    >
      <div className="p-5 space-y-5 overflow-y-auto max-h-[65vh]">
        {/* Profile header */}
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/square.jpg"
            alt="Lois profile picture"
            className="w-20 h-20 rounded-lg object-cover border-2 shrink-0"
            style={{ borderColor: "var(--border)" }}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg leading-tight">
              <span className="font-bold" style={{ color: "var(--foreground)" }}>
                {"hi! i'm "}
              </span>
              <span className="font-serif" style={{ color: "var(--tropius-green)" }}>
                lois
              </span>
            </h2>
            <p
              className="text-sm mt-0.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              Illustrator, animator and hobbyist
            </p>
          </div>
        </div>

        {/* Leaf divider */}
        <div className="flex justify-center">
          <svg width="48" height="32" viewBox="0 0 48 32" fill="none" aria-hidden="true">
            <ellipse cx="16" cy="20" rx="10" ry="6" fill="var(--wave-dark)" opacity="0.7" />
            <ellipse cx="32" cy="20" rx="10" ry="6" fill="var(--wave-light)" opacity="0.7" />
            <circle cx="20" cy="16" r="4" fill="var(--tropius-brown)" opacity="0.6" />
            <circle cx="28" cy="16" r="4" fill="var(--tropius-brown)" opacity="0.6" />
            <circle cx="24" cy="14" r="3" fill="var(--tropius-brown)" opacity="0.8" />
          </svg>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-bold text-base mb-1" style={{ color: "var(--foreground)" }}>
            Education
          </h3>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Senior High ICT PCSHS
          </p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            BSIT - Asia Pacific College
          </p>
        </div>

        {/* Interests */}
        <div>
          <h3 className="font-bold text-base mb-1" style={{ color: "var(--foreground)" }}>
            Interests
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            Illustrations, Video Game Design, Grunge Palettes, greens, frutiger
            and experimental stuff lolz
          </p>
        </div>
      </div>
    </WindowFrame>
  )
}
