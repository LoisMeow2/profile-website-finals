"use client"

import { useEffect, useState, useCallback } from "react"

interface Particle {
  id: number
  angle: number
  speed: number
  size: number
  hue: number
}

export function FireworkEffect({
  active,
  onComplete,
}: {
  active: boolean
  onComplete: () => void
}) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [burstActive, setBurstActive] = useState(false)

  const stableOnComplete = useCallback(onComplete, [onComplete])

  useEffect(() => {
    if (!active) return

    const newParticles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        angle: (i / 20) * Math.PI * 2,
        speed: 50 + Math.random() * 90,
        size: 3 + Math.random() * 5,
        hue: 35 + Math.random() * 50,
      })
    }
    setParticles(newParticles)
    setBurstActive(true)

    const timer = setTimeout(() => {
      setBurstActive(false)
      setParticles([])
      stableOnComplete()
    }, 550)

    return () => clearTimeout(timer)
  }, [active, stableOnComplete])

  if (!burstActive) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 9999 }}>
      {/* Central flash */}
      <div
        className="absolute w-20 h-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,253,230,0.5) 40%, rgba(255,255,255,0) 70%)",
          animation: "firework-burst 0.45s ease-out forwards",
        }}
      />

      {/* Sparkle particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue}, 85%, 75%)`,
            animation: "firework-particle 0.45s ease-out forwards",
            transform: `translate(${Math.cos(p.angle) * p.speed}px, ${Math.sin(p.angle) * p.speed}px)`,
          }}
        />
      ))}
    </div>
  )
}
