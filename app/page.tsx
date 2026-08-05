'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Planet } from '@/components/planet'
import { Sky } from '@/components/sky'
import { Airplane } from '@/components/airplane'
import { Boat, FishCatch, RODS, BOAT_SPEEDS, FISH_TABLE } from '@/components/boat'
import { PirateShip } from '@/components/pirate'
import { TreasureChests } from '@/components/treasure'
import { FreeOrbit } from '@/components/free-orbit'
import { AmbientAudio } from '@/components/audio'
import { getNearestPort, getPorts, PortDocks } from '@/components/ports'
import { getNearestFishSchool } from '@/components/fish-schools'
import { playSplash, playCatch, playMiss, playCoinJingle } from '@/components/sfx'
import * as THREE from 'three'

type Mode = 'globe' | 'fly' | 'boat'

export default function Home() {
  // Core
  const [waves, setWaves] = useState(true)
  const [atmosphere, setAtmosphere] = useState(true)
  const [mode, setMode] = useState<Mode>('globe')

  // Fishing
  const [fishingState, setFishingState] = useState<string>('idle')

  const handleFishingState = useCallback((state: string) => {
    setFishingState(state)
    if (state === 'cast') playSplash()
    if (state === 'missed') playMiss()
    if (state === 'nofish') {
      setTimeout(() => setFishingState('idle'), 2000)
    }
  }, [])
  const [catches, setCatches] = useState<FishCatch[]>([])
  const [lastCatch, setLastCatch] = useState<FishCatch | null>(null)

  // Economy - load from localStorage
  const [coins, setCoins] = useState(() => {
    if (typeof window === 'undefined') return 0
    return Number(localStorage.getItem('pw_coins')) || 0
  })
  const [nearPort, setNearPort] = useState(false)
  const [sellMessage, setSellMessage] = useState<string | null>(null)
  const [portDirection, setPortDirection] = useState<{ angle: number; distance: number } | null>(null)
  const [fishDirection, setFishDirection] = useState<{ angle: number; distance: number } | null>(null)
  const [rodLevel, setRodLevel] = useState(() => {
    if (typeof window === 'undefined') return 1
    return Number(localStorage.getItem('pw_rodLevel')) || 1
  })
  const [boatSpeed, setBoatSpeed] = useState(() => {
    if (typeof window === 'undefined') return 1
    return Number(localStorage.getItem('pw_boatSpeed')) || 1
  })
  const [showShop, setShowShop] = useState(false)
  const [caughtSpecies, setCaughtSpecies] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem('pw_caughtSpecies') || '[]') } catch { return [] }
  })
  const [boatPos, setBoatPos] = useState<THREE.Vector3 | null>(null)
  const [pirateWarning, setPirateWarning] = useState(false)
  const [piratePos, setPiratePos] = useState<THREE.Vector3 | null>(null)
  const [pirateActive, setPirateActive] = useState(false)
  const [showJournal, setShowJournal] = useState(false)

  const handlePirateActive = useCallback((active: boolean, position?: THREE.Vector3) => {
    setPirateActive(active)
    setPiratePos(active && position ? position.clone() : null)
  }, [])

  // Save to localStorage on change
  useEffect(() => { try { localStorage.setItem('pw_coins', String(coins)) } catch {} }, [coins])
  useEffect(() => { try { localStorage.setItem('pw_rodLevel', String(rodLevel)) } catch {} }, [rodLevel])
  useEffect(() => { try { localStorage.setItem('pw_boatSpeed', String(boatSpeed)) } catch {} }, [boatSpeed])
  useEffect(() => { try { localStorage.setItem('pw_caughtSpecies', JSON.stringify(caughtSpecies)) } catch {} }, [caughtSpecies])

  const handleCatch = useCallback((fish: FishCatch) => {
    setCatches(prev => [...prev, fish])
    setCaughtSpecies(prev => prev.includes(fish.name) ? prev : [...prev, fish.name])
    setLastCatch(fish)
    playCatch()
    setTimeout(() => setLastCatch(null), 2500)
  }, [])

  const handlePositionUpdate = useCallback((pos: THREE.Vector3, forward?: THREE.Vector3) => {
    const port = getNearestPort(pos)
    setNearPort(!!port)
    setBoatPos(pos.clone())

    // Find closest port for compass
    const closest = getNearestPort(pos, 999)
    if (closest && forward) {
      const portVec = new THREE.Vector3(...closest.position)
      const dist = pos.distanceTo(portVec)

      const localUp = pos.clone().normalize()
      const toPort = portVec.clone().sub(pos).normalize()

      // Project both onto tangent plane (remove the "up" component)
      const toPortFlat = toPort.clone().sub(localUp.clone().multiplyScalar(toPort.dot(localUp)))
      const forwardFlat = forward.clone().sub(localUp.clone().multiplyScalar(forward.dot(localUp)))

      if (toPortFlat.length() > 0.001 && forwardFlat.length() > 0.001) {
        toPortFlat.normalize()
        forwardFlat.normalize()

        // Signed angle from forward to toPort around localUp axis
        const cross = new THREE.Vector3().crossVectors(forwardFlat, toPortFlat)
        const sin = cross.dot(localUp)
        const cos = forwardFlat.dot(toPortFlat)
        const angle = Math.atan2(sin, cos) + Math.PI

        setPortDirection({ angle, distance: dist })
      }
    }

    // Fish school direction
    if (forward) {
      const nearest = getNearestFishSchool(pos)
      if (nearest) {
        const fishVec = new THREE.Vector3(...nearest.position)
        const localUp = pos.clone().normalize()
        const toFish = fishVec.clone().sub(pos).normalize()
        const toFishFlat = toFish.clone().sub(localUp.clone().multiplyScalar(toFish.dot(localUp)))
        const forwardFlat2 = forward.clone().sub(localUp.clone().multiplyScalar(forward.dot(localUp)))

        if (toFishFlat.length() > 0.001 && forwardFlat2.length() > 0.001) {
          toFishFlat.normalize()
          forwardFlat2.normalize()
          const cross2 = new THREE.Vector3().crossVectors(forwardFlat2, toFishFlat)
          const sin2 = cross2.dot(localUp)
          const cos2 = forwardFlat2.dot(toFishFlat)
          const fishAngle = Math.atan2(sin2, cos2) + Math.PI
          setFishDirection({ angle: fishAngle, distance: nearest.distance })
        }
      }
    }
  }, [])

  const handlePirateCaught = useCallback(() => {
    setCatches([])
    setPirateWarning(true)
    setTimeout(() => setPirateWarning(false), 3000)
  }, [])

  const handleTreasureCollect = useCallback((value: number) => {
    setCoins(prev => prev + value)
    setSellMessage(`Found treasure! +${value} coins!`)
    playCoinJingle()
    setTimeout(() => setSellMessage(null), 2500)
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
    playCoinJingle()
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

        <PortDocks />

        {mode !== 'globe' ? (
          <SceneReset />
        ) : null}
        {mode === 'fly' ? (
          <Airplane trail={planeTrail} />
        ) : mode === 'boat' ? (
          <>
          <Boat onCatch={handleCatch} onFishingState={handleFishingState} onPositionUpdate={handlePositionUpdate} rodLevel={rodLevel} speedLevel={boatSpeed} />
          <PirateShip
            boatPosition={boatPos}
            boatMaxSpeed={BOAT_SPEEDS[Math.min(boatSpeed, BOAT_SPEEDS.length) - 1].maxSpeed}
            isAtPort={nearPort}
            onCaught={handlePirateCaught}
            onActiveChange={handlePirateActive}
          />
          <TreasureChests boatPosition={boatPos} onCollect={handleTreasureCollect} />
          <PortCompassUpdater onAngleUpdate={(a) => setPortDirection(prev => prev ? { ...prev, angle: a } : null)} />
          </>
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
              {fishingState === 'nofish' && '🚫 No fish nearby! Follow the 🐟 compass.'}
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
            alignItems: 'center',
          }}>
            <span>🪙 {coins}</span>
            {catches.length > 0 && <span>🐟 {catches.length}</span>}
            <span
              onClick={() => setShowJournal(!showJournal)}
              style={{ cursor: 'pointer', fontSize: 15 }}
              title="Fish Journal"
            >📖</span>
          </div>

          {/* Fish Journal */}
          {showJournal && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(10,20,40,0.95)',
              borderRadius: 16,
              padding: '20px 24px',
              color: 'white',
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(100,150,255,0.2)',
              minWidth: 300,
              maxHeight: '75vh',
              overflowY: 'auto',
              zIndex: 50,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>📖 Fish Journal ({caughtSpecies.length}/{FISH_TABLE.length})</span>
                <button onClick={() => setShowJournal(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer' }}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {FISH_TABLE.map(fish => {
                  const caught = caughtSpecies.includes(fish.name)
                  return (
                    <div key={fish.name} style={{
                      padding: '6px 8px',
                      borderRadius: 6,
                      background: caught ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                      opacity: caught ? 1 : 0.4,
                      border: `1px solid ${caught ?
                        (fish.rarity === 'legendary' ? 'gold' :
                         fish.rarity === 'epic' ? '#ff6600' :
                         fish.rarity === 'rare' ? '#a855f7' :
                         fish.rarity === 'uncommon' ? '#3b82f6' : 'rgba(255,255,255,0.1)') :
                        'transparent'}`,
                    }}>
                      <div style={{ fontSize: 14 }}>{caught ? fish.emoji : '❓'} {caught ? fish.name : '???'}</div>
                      <div style={{ fontSize: 10, opacity: 0.5 }}>
                        {caught ? `${fish.rarity} · 🪙${fish.value}` : `Rod Lv.${fish.rodLevel}`}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Port compass */}
          {!nearPort && portDirection && (
            <div style={{
              position: 'absolute',
              top: 60,
              right: 20,
              background: 'rgba(0,0,0,0.6)',
              borderRadius: 10,
              padding: '6px 10px',
              color: 'white',
              fontSize: 12,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{
                display: 'inline-block',
                transform: `rotate(${-portDirection.angle}rad)`,
                fontSize: 16,
              }}>⬆</span>
              <span style={{ opacity: 0.7 }}>Port</span>
            </div>
          )}

          {/* Port compass */}
          {!nearPort && portDirection && (
            <div style={{
              position: 'absolute',
              top: 60,
              right: 20,
              background: 'rgba(0,0,0,0.6)',
              borderRadius: 10,
              padding: '8px 12px',
              color: 'white',
              fontSize: 12,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                display: 'inline-block',
                width: 20,
                height: 20,
                lineHeight: '20px',
                textAlign: 'center',
                transform: `rotate(${portDirection.angle}rad)`,
                fontSize: 16,
              }}>⬆</span>
              <span style={{ opacity: 0.7 }}>Port</span>
            </div>
          )}

          {/* Pirate skull indicator */}
          {pirateActive && (
            <div style={{
              position: 'absolute',
              top: !nearPort && portDirection ? 100 : 60,
              right: 20,
              background: 'rgba(80,0,0,0.7)',
              borderRadius: 10,
              padding: '8px 12px',
              color: '#ff4444',
              fontSize: 12,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid rgba(255,50,50,0.4)',
              animation: 'pulse 1s ease-in-out infinite',
            }}>
              <span style={{ fontSize: 16 }}>☠️</span>
              <span>Pirate!</span>
            </div>
          )}

          {/* Fish school compass */}
          {fishDirection && fishDirection.distance > 0.3 && (
            <div style={{
              position: 'absolute',
              top: pirateActive ? 140 : (!nearPort && portDirection ? 100 : 60),
              right: 20,
              background: 'rgba(0,40,60,0.7)',
              borderRadius: 10,
              padding: '6px 10px',
              color: '#44ddff',
              fontSize: 12,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{
                display: 'inline-block',
                width: 18,
                height: 18,
                lineHeight: '18px',
                textAlign: 'center',
                transform: `rotate(${fishDirection.angle}rad)`,
                fontSize: 14,
              }}>⬆</span>
              <span>🐟 Fish</span>
            </div>
          )}

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

              {/* Boat Speed */}
              <div style={{ fontSize: 11, opacity: 0.5, marginTop: 14, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>⛵ Boat Speed</div>
              {BOAT_SPEEDS.map(spd => {
                const owned = boatSpeed >= spd.level
                const canAfford = coins >= spd.cost
                const isNext = spd.level === boatSpeed + 1
                return (
                  <div key={spd.level} style={{
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
                      <div style={{ fontWeight: isNext ? 'bold' : 'normal' }}>{spd.name}</div>
                    </div>
                    {owned ? (
                      <span style={{ fontSize: 11, color: '#44ff44' }}>✓ Owned</span>
                    ) : isNext ? (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            setCoins(prev => prev - spd.cost)
                            setBoatSpeed(spd.level)
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
                        🪙 {spd.cost}
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, opacity: 0.4 }}>🔒 {spd.cost}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Pirate warning */}
          {pirateWarning && (
            <div style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(80,0,0,0.9)',
              borderRadius: 14,
              padding: '14px 24px',
              color: '#ff4444',
              fontSize: 16,
              fontFamily: 'system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
              border: '2px solid #ff4444',
            }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>☠️</div>
              <div>Pirates stole your fish!</div>
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

function PortCompassUpdater({ onAngleUpdate }: { onAngleUpdate: (angle: number) => void }) {
  useFrame(() => {
    // Don't need this anymore, angle computed in handlePositionUpdate
  })
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
