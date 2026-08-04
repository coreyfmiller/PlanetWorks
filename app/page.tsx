'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Planet } from '@/components/planet'

export default function Home() {
  // Core
  const [waves, setWaves] = useState(true)
  const [atmosphere, setAtmosphere] = useState(true)

  // New features
  const [moon, setMoon] = useState(true)
  const [stars, setStars] = useState(true)
  const [dramaticLighting, setDramaticLighting] = useState(false)
  const [wideBeach, setWideBeach] = useState(true)
  const [cloudPuffs, setCloudPuffs] = useState(true)
  const [dayNight, setDayNight] = useState(false)
  const [boat, setBoat] = useState(true)
  const [birds, setBirds] = useState(true)
  const [snowCap, setSnowCap] = useState(true)
  const [pollen, setPollen] = useState(true)
  const [biggerTrees, setBiggerTrees] = useState(true)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 45 }}>
        {/* Lighting - controlled by dramatic toggle */}
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
          cloudPuffs={cloudPuffs}
          dayNight={dayNight}
          boat={boat}
          birds={birds}
          snowCap={snowCap}
          pollen={pollen}
          biggerTrees={biggerTrees}
        />
        <OrbitControls
          enablePan={false}
          minDistance={4.5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.2}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

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
        <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Planet</div>
        <Toggle label="Waves" value={waves} onChange={setWaves} />
        <Toggle label="Atmosphere" value={atmosphere} onChange={setAtmosphere} />
        <Toggle label="Wide Beach" value={wideBeach} onChange={setWideBeach} />
        <Toggle label="Snow Caps" value={snowCap} onChange={setSnowCap} />
        <Toggle label="Bigger Trees" value={biggerTrees} onChange={setBiggerTrees} />
        <Toggle label="Cloud Puffs" value={cloudPuffs} onChange={setCloudPuffs} />

        <div style={{ fontSize: 11, opacity: 0.5, marginTop: 8, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Sky</div>
        <Toggle label="Moon" value={moon} onChange={setMoon} />
        <Toggle label="Stars" value={stars} onChange={setStars} />
        <Toggle label="Birds" value={birds} onChange={setBirds} />
        <Toggle label="Pollen" value={pollen} onChange={setPollen} />

        <div style={{ fontSize: 11, opacity: 0.5, marginTop: 8, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Extras</div>
        <Toggle label="Boat" value={boat} onChange={setBoat} />
        <Toggle label="Dramatic Light" value={dramaticLighting} onChange={setDramaticLighting} />
        <Toggle label="Day/Night" value={dayNight} onChange={setDayNight} />
      </div>
    </div>
  )
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
