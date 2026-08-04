'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Planet } from '@/components/planet'
import { Sky } from '@/components/sky'

export default function Home() {
  const [waves, setWaves] = useState(true)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 45 }}>
        <Sky />
        <ambientLight intensity={0.5} />
        <directionalLight position={[8, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-4, -2, -6]} intensity={0.3} color="#4488cc" />
        <Planet waves={waves} />
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
        background: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: 'white',
        fontSize: 13,
        fontFamily: 'system-ui, sans-serif',
      }}>
        <span>Waves</span>
        <button
          onClick={() => setWaves(!waves)}
          style={{
            width: 40,
            height: 22,
            borderRadius: 11,
            border: 'none',
            background: waves ? '#1a88c8' : '#444',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.2s',
          }}
        >
          <span style={{
            position: 'absolute',
            top: 3,
            left: waves ? 21 : 3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.2s',
          }} />
        </button>
      </div>
    </div>
  )
}
