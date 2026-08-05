'use client'

import { useState, useCallback } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Planet } from '@/components/planet'
import { Sky } from '@/components/sky'
import { Airplane } from '@/components/airplane'
import { Boat, FishCatch } from '@/components/boat'
import { FreeOrbit } from '@/components/free-orbit'
import { AmbientAudio } from '@/components/audio'

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

  const handleCatch = useCallback((fish: FishCatch) => {
    setCatches(prev => [...prev, fish])
    setLastCatch(fish)
    setTimeout(() => setLastCatch(null), 2500)
  }, [])

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
          <Boat onCatch={handleCatch} onFishingState={setFishingState} />
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
                lastCatch.rarity === 'rare' ? '2px solid #a855f7' :
                lastCatch.rarity === 'uncommon' ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.2)',
            }}>
              <div style={{ fontSize: 32, marginBottom: 4 }}>{lastCatch.emoji}</div>
              <div>{lastCatch.name}</div>
              <div style={{
                fontSize: 11,
                marginTop: 4,
                color: lastCatch.rarity === 'legendary' ? 'gold' :
                  lastCatch.rarity === 'rare' ? '#a855f7' :
                  lastCatch.rarity === 'uncommon' ? '#3b82f6' : '#aaa',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}>{lastCatch.rarity}</div>
            </div>
          )}

          {/* Fish counter */}
          {catches.length > 0 && (
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
            }}>
              🐟 {catches.length}
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
