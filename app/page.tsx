'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Planet } from '@/components/planet'
import { Sky } from '@/components/sky'

export default function Home() {
  const [waves, setWaves] = useState(true)
  const [atmosphere, setAtmosphere] = useState(true)
  const [clouds, setClouds] = useState(true)
  const [foam, setFoam] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 45 }}>
        <Sky />
        <ambientLight intensity={0.5} />
        <directionalLight position={[8, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-4, -2, -6]} intensity={0.3} color="#4488cc" />
        <Planet waves={waves} atmosphere={atmosphere} clouds={clouds} foam={foam} />
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
        gap: 10,
        color: 'white',
        fontSize: 13,
        fontFamily: 'system-ui, sans-serif',
        backdropFilter: 'blur(8px)',
      }}>
        <Toggle label="Waves" value={waves} onChange={setWaves} />
        <Toggle label="Atmosphere" value={atmosphere} onChange={setAtmosphere} />
        <Toggle label="Clouds" value={clouds} onChange={setClouds} />
        <Toggle label="Shore Foam" value={foam} onChange={setFoam} />
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
