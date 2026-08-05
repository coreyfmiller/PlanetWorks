'use client'

import { useState } from 'react'

interface TitleScreenProps {
  onStart: () => void
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  const [fading, setFading] = useState(false)

  const handleStart = () => {
    setFading(true)
    setTimeout(onStart, 600)
  }

  return (
    <div
      onClick={handleStart}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #1a3a5c 0%, #0a1a2e 70%, #050d18 100%)',
        cursor: 'pointer',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Planet icon */}
      <div style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #4aba6a 0%, #2d7a3f 40%, #1a5530 70%, #0f3320 100%)',
        boxShadow: '0 0 60px rgba(74, 186, 106, 0.3), inset -20px -20px 40px rgba(0,0,0,0.4)',
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Water patches */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '35%',
          height: '25%',
          borderRadius: '50%',
          background: 'rgba(26, 136, 200, 0.6)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '10%',
          width: '30%',
          height: '20%',
          borderRadius: '50%',
          background: 'rgba(26, 136, 200, 0.5)',
        }} />
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 48,
        fontWeight: 700,
        color: '#ffffff',
        margin: 0,
        letterSpacing: -1,
        textShadow: '0 2px 20px rgba(74, 186, 106, 0.4)',
      }}>
        PlanetWorks
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 16,
        color: 'rgba(255,255,255,0.5)',
        margin: '8px 0 0 0',
        letterSpacing: 2,
        textTransform: 'uppercase',
      }}>
        Explore a tiny world
      </p>

      {/* CTA */}
      <div style={{
        marginTop: 48,
        padding: '12px 32px',
        borderRadius: 30,
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontFamily: 'system-ui, sans-serif',
        letterSpacing: 1,
        animation: 'pulse 2s ease-in-out infinite',
      }}>
        Click anywhere to begin
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
