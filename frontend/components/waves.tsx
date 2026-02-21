"use client"

import Wave from "react-wavify"

export function Waves() {
  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 0 }}>
      {/* Brown wave (background) - tallest, behind */}
      <div className="absolute bottom-0 left-0 w-full" style={{ height: "260px" }}>
        <Wave
          fill="var(--wave-brown)"
          paused={false}
          style={{ display: "block", width: "100%", height: "100%" }}
          options={{
            height: 40,
            amplitude: 30,
            speed: 0.15,
            points: 4,
          }}
        />
      </div>

      {/* Light green wave (middle layer) */}
      <div className="absolute bottom-0 left-0 w-full" style={{ height: "210px" }}>
        <Wave
          fill="var(--wave-light)"
          paused={false}
          style={{ display: "block", width: "100%", height: "100%" }}
          options={{
            height: 35,
            amplitude: 25,
            speed: 0.2,
            points: 5,
          }}
        />
      </div>

      {/* Dark green wave (foreground) */}
      <div className="absolute bottom-0 left-0 w-full" style={{ height: "170px" }}>
        <Wave
          fill="var(--wave-dark)"
          paused={false}
          style={{ display: "block", width: "100%", height: "100%" }}
          options={{
            height: 30,
            amplitude: 22,
            speed: 0.25,
            points: 3,
          }}
        />
      </div>
    </div>
  )
}
