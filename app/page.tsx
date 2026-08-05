'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Planet } from '@/components/planet'
import { Sky } from '@/components/sky'
import { Airplane } from '@/components/airplane'
import { Boat, FishCatch, RODS } from '@/components/boat'
import { FreeOrbit } from '@/components/free-orbit'
import { AmbientAudio } from '@/components/audio'
import { getNearestPort } from '@/components/ports'
import * as THREE from 'three'

type Mode = 'globe' | 'fly' | 'boat'

export default function Home() {
  // Core
  const [waves, setWaves] = useState(true)
  const [atmosphere, setAtmosphere] = useState(true)
  const [mode, setMode] = useState<Mode>('globe')

  // Fishing
  const [fishingState, setFishingState] = useState<string>('idle')
  const [catches, setCatches] = useState<FishCatch[]>([])
  const [lastCatch, setLastCatch] = useState<FishCatch | null>(null)

  // Economy
  const [coins, setCoins] = useState(0)
  const [nearPort, setNearPort] = useState(false)
  const [sellMessage, setSellMessage] = useState<string | null>(null)
  const [rodLevel, setRodLevel] = useState(1)
  const [showShop, setShowShop] = useState(false)

  const handleCatch = useCallback((fish: FishCatch) => {
    setCatches(prev => [...prev, fish])
    setLastCatch(fish)
    setTimeout(() => setLastCatch(null), 2500)
  }, [])

  const handlePositionUpdate = useCallback((pos: THREE.Vector3) => {
    const port = getNearestPort(pos)
    setNearPort(!!port)
  }, [])

  const handleSell = useCallback(() => {
    if (catches.length === 0) return
    let total = 0
    for (const fish of catches) {
      total += fish.value
    }
    setCoins(prev => prev + total)
    setSellMessage(`Sold ${catches.length} fish for ${total} coins!`)
    setCatches([])
    setTimeout(() => setSellMessage(null), 2500)
  }, [catches])

  // E key to sell at port
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' && nearPort && catches.length > 0) {
        handleSell()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nearPort, catches, handleSell])

  // New features
  const [moon, setMoon] = useState(false)
  const [stars, setStars] = useState(false)
  const [dramaticLighting, setDramaticLighting] = useState(false)
  const [wideBeach, setWideBeach] = useState(true)
  const [dayNight, setDayNight] = useState(false)
  const [snowCap, setSnowCap] = useState(true)
  const [pollen, setPollen] = useState(false)
  const [biggerTrees, setBiggerTrees] = useState(true)
  const [shoreFoam, setShoreFoam] = useState(true)
  const [planeTrail, setPlaneTrail] = useState(true)

  // Control panel expand state
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <AmbientAudio flyMode={mode !== 'globe'} />
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
        <Sky />
        <ambientLight intensity={dramaticLighting ? 0.2 : 0.5} />
        <directionalLight
          position={[8, 10, 5]}
          intensity={dramaticLighting ? 2.5 : 1.8}
          color="#ffffff"
        />
        <directionalLight position={[-4, -2, -6]} intensity={0.3} color="#4488cc" />

        <Planet
          waves={waves}
          atmosphere={atmosphere}
          moon={moon}
          stars={stars}
          dramaticLighting={dramaticLighting}
          wideBeach={wideBeach}
          cloudPuffs={false}
          dayNight={dayNight}
          boat={false}
          snowCap={snowCap}
          pollen={pollen}
          biggerTrees={biggerTrees}
          shoreFoam={shoreFoam}
        />

        {mode !== 'globe' ? (
          <SceneReset />
        ) : null}
        {mode === 'fly' ? (
          <Airplane trail={planeTrail} />
        ) : mode === 'boat' ? (
          <Boat onCatch={handleCatch} onFishingState={setFishingState} onPositionUpdate={handlePositionUpdate} rodLevel={rodLevel} />
        ) : (
          <FreeOrbit />
        )}
      </Canvas>

      {/* Mode hint */}
      {mode !== 'globe' && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: 10,
          padding: '8px 16px',
          color: 'white',
          fontSize: 12,
          fontFamily: 'system-ui, sans-serif',
          backdropFilter: 'blur(8px)',
          textAlign: 'center',
        }}>
          {mode === 'fly' ? 'WASD to steer · W/S for speed' : 'A/D to steer · W/S for speed · F to fish'}
        </div>
      )}

      {/* Fishing UI */}
      {mode === 'boat' && (
        <>
          {/* Fishing status */}
          {fishingState !== 'idle' && (
            <div style={{
              position: 'absolute',
              top: 60,
              left: '50%',
              transform: 'translateX(-50%)',
              background: fishingState === 'bite' ? 'rgba(255,50,50,0.8)' : 'rgba(0,0,0,0.6)',
              borderRadius: 10,
              padding: '8px 16px',
              color: 'white',
              fontSize: 14,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
              fontWeight: fishingState === 'bite' ? 'bold' : 'normal',
              animation: fishingState === 'bite' ? 'pulse 0.3s ease-in-out infinite' : 'none',
            }}>
              {fishingState === 'cast' && '🎣 Casting...'}
              {fishingState === 'waiting' && '🎣 Waiting for a bite...'}
              {fishingState === 'bite' && '🐟 BITE! Press F!'}
              {fishingState === 'caught' && '✅ Got one!'}
              {fishingState === 'missed' && '❌ Missed!'}
            </div>
          )}

          {/* Last catch popup */}
          {lastCatch && (
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.8)',
              borderRadius: 14,
              padding: '16px 24px',
              color: 'white',
              fontSize: 18,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
              border: lastCatch.rarity === 'legendary' ? '2px solid gold' :
                lastCatch.rarity === 'epic' ? '2px solid #ff6600' :
                lastCatch.rarity === 'rare' ? '2px solid #a855f7' :
                lastCatch.rarity === 'uncommon' ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.2)',
            }}>
              <div style={{ fontSize: 32, marginBottom: 4 }}>{lastCatch.emoji}</div>
              <div>{lastCatch.name}</div>
              <div style={{
                fontSize: 11,
                marginTop: 4,
                color: lastCatch.rarity === 'legendary' ? 'gold' :
                  lastCatch.rarity === 'epic' ? '#ff6600' :
                  lastCatch.rarity === 'rare' ? '#a855f7' :
                  lastCatch.rarity === 'uncommon' ? '#3b82f6' : '#aaa',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}>{lastCatch.rarity} · 🪙 {lastCatch.value}</div>
            </div>
          )}

          {/* Fish counter + coins */}
          <div style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 10,
            padding: '6px 12px',
            color: 'white',
            fontSize: 13,
            fontFamily: 'system-ui, sans-serif',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            gap: 12,
          }}>
            <span>🪙 {coins}</span>
            {catches.length > 0 && <span>🐟 {catches.length}</span>}
          </div>

          {/* Port sell prompt */}
          {nearPort && catches.length > 0 && !showShop && (
            <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
              <div
                onClick={handleSell}
                style={{
                  background: 'rgba(0,100,0,0.8)',
                  borderRadius: 12,
                  padding: '10px 20px',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'system-ui, sans-serif',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.3)',
                  textAlign: 'center',
                }}
              >
                Press E to sell {catches.length} fish
              </div>
              <div
                onClick={() => setShowShop(true)}
                style={{
                  background: 'rgba(100,50,0,0.8)',
                  borderRadius: 12,
                  padding: '10px 20px',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'system-ui, sans-serif',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.3)',
                  textAlign: 'center',
                }}
              >
                🏪 Shop
              </div>
            </div>
          )}

          {nearPort && catches.length === 0 && !showShop && (
            <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
              <div style={{
                background: 'rgba(0,0,0,0.6)',
                borderRadius: 12,
                padding: '8px 16px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 13,
                fontFamily: 'system-ui, sans-serif',
                backdropFilter: 'blur(8px)',
                textAlign: 'center',
              }}>
                🏪 Port — Catch some fish to sell!
              </div>
              <div
                onClick={() => setShowShop(true)}
                style={{
                  background: 'rgba(100,50,0,0.8)',
                  borderRadius: 12,
                  padding: '8px 16px',
                  color: 'white',
                  fontSize: 13,
                  fontFamily: 'system-ui, sans-serif',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                🏪 Shop
              </div>
            </div>
          )}

          {/* Rod Shop */}
          {showShop && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(20,10,0,0.95)',
              borderRadius: 16,
              padding: '20px 24px',
              color: 'white',
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,200,100,0.3)',
              minWidth: 280,
              maxHeight: '70vh',
              overflowY: 'auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>🎣 Rod Shop</span>
                <button onClick={() => setShowShop(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer' }}>✕</button>
              </div>
              <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 12 }}>Current: {RODS[rodLevel - 1].name} · 🪙 {coins}</div>
              {RODS.map(rod => {
                const owned = rodLevel >= rod.level
                const canAfford = coins >= rod.cost
                const isNext = rod.level === rodLevel + 1
                return (
                  <div key={rod.level} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    marginBottom: 6,
                    borderRadius: 8,
                    background: owned ? 'rgba(0,100,0,0.3)' : isNext ? 'rgba(100,80,0,0.3)' : 'rgba(255,255,255,0.05)',
                    border: isNext ? '1px solid rgba(255,200,0,0.4)' : '1px solid transparent',
                    opacity: owned ? 0.6 : 1,
                  }}>
                    <div>
                      <div style={{ fontWeight: isNext ? 'bold' : 'normal' }}>{rod.name}</div>
                      <div style={{ fontSize: 11, opacity: 0.6 }}>{rod.description}</div>
                    </div>
                    {owned ? (
                      <span style={{ fontSize: 11, color: '#44ff44' }}>✓ Owned</span>
                    ) : isNext ? (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            setCoins(prev => prev - rod.cost)
                            setRodLevel(rod.level)
                          }
                        }}
                        style={{
                          background: canAfford ? '#cc8800' : '#555',
                          border: 'none',
                          borderRadius: 6,
                          padding: '4px 10px',
                          color: 'white',
                          fontSize: 12,
                          cursor: canAfford ? 'pointer' : 'not-allowed',
                          opacity: canAfford ? 1 : 0.5,
                        }}
                      >
                        🪙 {rod.cost}
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, opacity: 0.4 }}>🔒 {rod.cost}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Sell confirmation */}
          {sellMessage && (
            <div style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,80,0,0.9)',
              borderRadius: 14,
              padding: '14px 24px',
              color: '#44ff44',
              fontSize: 16,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
              border: '1px solid #44ff44',
            }}>
              🪙 {sellMessage}
            </div>
          )}
        </>
      )}

      {/* Control panel */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        background: 'rgba(0,0,0,0.7)',
        borderRadius: 14,
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        color: 'white',
        fontSize: 13,
        fontFamily: 'system-ui, sans-serif',
        backdropFilter: 'blur(8px)',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        {/* Always visible - mode selector */}
        <div style={{ display: 'flex', gap: 6 }}>
          <ModeButton label="🌍" active={mode === 'globe'} onClick={() => setMode('globe')} />
          <ModeButton label="✈" active={mode === 'fly'} onClick={() => setMode('fly')} />
          <ModeButton label="⛵" active={mode === 'boat'} onClick={() => setMode('boat')} />
        </div>
        {mode === 'fly' && <Toggle label="Contrail" value={planeTrail} onChange={setPlaneTrail} />}

        {/* Expand/collapse button */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 11,
            cursor: 'pointer',
            padding: '4px 0',
            textAlign: 'left',
            letterSpacing: 0.5,
          }}
        >
          {expanded ? '▾ Hide options' : '▸ More options'}
        </button>

        {/* Expandable section */}
        {expanded && (
          <>
            <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Planet</div>
            <Toggle label="Waves" value={waves} onChange={setWaves} />
            <Toggle label="Atmosphere" value={atmosphere} onChange={setAtmosphere} />
            <Toggle label="Wide Beach" value={wideBeach} onChange={setWideBeach} />
            <Toggle label="Snow Caps" value={snowCap} onChange={setSnowCap} />
            <Toggle label="Bigger Trees" value={biggerTrees} onChange={setBiggerTrees} />
            <Toggle label="Shore Foam" value={shoreFoam} onChange={setShoreFoam} />

            <div style={{ fontSize: 11, opacity: 0.5, marginTop: 8, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Sky</div>
            <Toggle label="Moon" value={moon} onChange={setMoon} />
            <Toggle label="Stars" value={stars} onChange={setStars} />
            <Toggle label="Pollen" value={pollen} onChange={setPollen} />

            <div style={{ fontSize: 11, opacity: 0.5, marginTop: 8, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Extras</div>
            <Toggle label="Dramatic Light" value={dramaticLighting} onChange={setDramaticLighting} />
            <Toggle label="Day/Night" value={dayNight} onChange={setDayNight} />
          </>
        )}
      </div>
    </div>
  )
}

function SceneReset() {
  const { scene } = useThree()
  scene.quaternion.identity()
  return null
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
      <span style={{ opacity: 0.9 }}>{label}</span>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          border: 'none',
          background: value ? '#1a88c8' : '#555',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute',
          top: 3,
          left: value ? 19 : 3,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: 'white',
          transition: 'left 0.2s',
        }} />
      </button>
    </div>
  )
}

function ModeButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '6px 10px',
        borderRadius: 8,
        border: active ? '1px solid #1a88c8' : '1px solid rgba(255,255,255,0.2)',
        background: active ? 'rgba(26,136,200,0.3)' : 'transparent',
        color: 'white',
        fontSize: 16,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  )
}
