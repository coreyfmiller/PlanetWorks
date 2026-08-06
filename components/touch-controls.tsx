'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// Shared input state that both keyboard and touch write to
export interface GameInput {
  forward: number   // -1 to 1
  turn: number      // -1 to 1
  sprint: boolean
  action1: boolean  // F (fish) / E (collect)
  action2: boolean  // G (disembark)
}

// Global input state readable by game components
let globalInput: GameInput = { forward: 0, turn: 0, sprint: false, action1: false, action2: false }
export function getGameInput(): GameInput { return globalInput }
export function setGameInput(partial: Partial<GameInput>) { Object.assign(globalInput, partial) }

// Detect touch device
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  return isTouch
}

interface VirtualJoystickProps {
  onMove: (x: number, y: number) => void
  onRelease: () => void
  side: 'left' | 'right'
}

function VirtualJoystick({ onMove, onRelease, side }: VirtualJoystickProps) {
  const baseRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const touchId = useRef<number | null>(null)
  const center = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = baseRef.current
    if (!el) return

    const handleStart = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (touchId.current !== null) return
      const touch = e.changedTouches[0]
      touchId.current = touch.identifier
      const rect = el.getBoundingClientRect()
      center.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      setActive(true)
      setPos({ x: 0, y: 0 })
    }

    const handleMove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (touchId.current === null) return
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i]
        if (touch.identifier === touchId.current) {
          const dx = touch.clientX - center.current.x
          const dy = touch.clientY - center.current.y
          const maxDist = 40
          const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist)
          const angle = Math.atan2(dy, dx)
          const nx = (Math.cos(angle) * dist) / maxDist
          const ny = (Math.sin(angle) * dist) / maxDist
          setPos({ x: nx * 30, y: ny * 30 })
          onMove(nx, ny)
          break
        }
      }
    }

    const handleEnd = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchId.current) {
          touchId.current = null
          setActive(false)
          setPos({ x: 0, y: 0 })
          onRelease()
          break
        }
      }
    }

    el.addEventListener('touchstart', handleStart, { passive: false })
    el.addEventListener('touchmove', handleMove, { passive: false })
    el.addEventListener('touchend', handleEnd, { passive: false })
    el.addEventListener('touchcancel', handleEnd, { passive: false })

    return () => {
      el.removeEventListener('touchstart', handleStart)
      el.removeEventListener('touchmove', handleMove)
      el.removeEventListener('touchend', handleEnd)
      el.removeEventListener('touchcancel', handleEnd)
    }
  }, [onMove, onRelease])

  return (
    <div
      ref={baseRef}
      style={{
        position: 'absolute',
        bottom: 80,
        [side]: 10,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)',
        border: '2px solid rgba(255,255,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'none',
        zIndex: 1000,
      }}
    >
      <div style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: active ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: active ? 'none' : 'transform 0.15s',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

interface ActionButtonProps {
  label: string
  onPress: () => void
  onRelease?: () => void
  color?: string
  size?: number
}

function ActionButton({ label, onPress, onRelease, color = 'rgba(255,255,255,0.2)', size = 56 }: ActionButtonProps) {
  return (
    <div
      onTouchStart={(e) => { e.preventDefault(); onPress() }}
      onTouchEnd={(e) => { e.preventDefault(); onRelease?.() }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        border: '2px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        fontWeight: 'bold',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {label}
    </div>
  )
}

interface TouchControlsProps {
  mode: 'globe' | 'fly' | 'boat' | 'walk'
  onModeChange: (mode: 'globe' | 'fly' | 'boat' | 'walk') => void
  nearPort: boolean
  nearShore: boolean
  nearBoat: boolean
  hasFish: boolean
  onSell: () => void
  onShop: () => void
  onDisembark: () => void
  onBoard: () => void
}

export function TouchControls({ mode, onModeChange, nearPort, nearShore, nearBoat, hasFish, onSell, onShop, onDisembark, onBoard }: TouchControlsProps) {
  const [message, setMessage] = useState<string | null>(null)

  const handleJoystickMove = useCallback((x: number, y: number) => {
    setGameInput({ forward: -y, turn: x })
  }, [])

  const handleJoystickRelease = useCallback(() => {
    setGameInput({ forward: 0, turn: 0 })
  }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 2000)
  }

  return (
    <>
      {/* Left joystick - movement */}
      {mode !== 'globe' && (
        <VirtualJoystick side="left" onMove={handleJoystickMove} onRelease={handleJoystickRelease} />
      )}

      {/* Feedback message */}
      {message && (
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          borderRadius: 10,
          padding: '10px 18px',
          color: 'white',
          fontSize: 14,
          fontFamily: 'system-ui, sans-serif',
          zIndex: 2000,
          textAlign: 'center',
        }}>
          {message}
        </div>
      )}

      {/* Right side action buttons */}
      {mode === 'boat' && (
        <div style={{ position: 'absolute', bottom: 80, right: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ActionButton label="🎣" onPress={() => { setGameInput({ action1: true }); setTimeout(() => setGameInput({ action1: false }), 100) }} color="rgba(0,100,200,0.4)" size={46} />
          {nearPort && <ActionButton label="💰" onPress={onSell} color="rgba(0,150,0,0.4)" size={46} />}
          {nearPort && <ActionButton label="🏪" onPress={onShop} color="rgba(150,100,0,0.4)" size={46} />}
          <ActionButton label="⚓" onPress={() => {
            if (nearShore) {
              onDisembark()
            } else {
              showMessage('Too far from shore')
            }
          }} color="rgba(100,60,0,0.4)" size={46} />
        </div>
      )}

      {mode === 'walk' && (
        <div style={{ position: 'absolute', bottom: 80, right: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ActionButton label="⛵" onPress={() => {
            if (nearBoat) {
              onBoard()
            } else {
              showMessage('Too far from boat')
            }
          }} color="rgba(0,100,200,0.4)" size={46} />
          <ActionButton
            label="🏃"
            onPress={() => { setGameInput({ sprint: true }) }}
            onRelease={() => { setGameInput({ sprint: false }) }}
            color="rgba(200,100,0,0.3)"
            size={46}
          />
        </div>
      )}

      {/* Mode selector - top left on mobile */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        display: 'flex',
        gap: 6,
      }}>
        {(['globe', 'fly', 'boat', 'walk'] as const).map(m => (
          <div
            key={m}
            onTouchStart={(e) => { e.preventDefault(); onModeChange(m) }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: mode === m ? 'rgba(26,136,200,0.5)' : 'rgba(0,0,0,0.5)',
              border: mode === m ? '2px solid #1a88c8' : '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              touchAction: 'none',
            }}
          >
            {m === 'globe' ? '🌍' : m === 'fly' ? '✈' : m === 'boat' ? '⛵' : '🚶'}
          </div>
        ))}
      </div>
    </>
  )
}
