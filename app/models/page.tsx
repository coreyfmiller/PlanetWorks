'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ path, scale = 1 }: { path: string; scale?: number }) {
  const { scene } = useGLTF(path)
  return <primitive object={scene.clone()} scale={scale} />
}

function ModelViewer({ path, label, scale = 1 }: { path: string; label: string; scale?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 300, height: 240, borderRadius: 12, overflow: 'hidden', border: '1px solid #333', background: '#1a1a2e' }}>
        <Canvas camera={{ position: [2, 1.5, 2], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 4]} intensity={1.5} />
          <directionalLight position={[-2, -1, -3]} intensity={0.3} color="#4488cc" />
          <Suspense fallback={null}>
            <Model path={path} scale={scale} />
          </Suspense>
          <OrbitControls enablePan={false} />
          <gridHelper args={[4, 8, '#333', '#222']} />
        </Canvas>
      </div>
      <span style={{ color: 'white', fontSize: 14, fontFamily: 'system-ui, sans-serif' }}>{label}</span>
    </div>
  )
}

export default function ModelsPage() {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#111',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
    }}>
      <h1 style={{ color: 'white', fontFamily: 'system-ui, sans-serif', fontSize: 24, margin: 0 }}>Generated Models (Meshy)</h1>
      <p style={{ color: '#888', fontFamily: 'system-ui, sans-serif', fontSize: 13, margin: 0 }}>Orbit controls: click and drag to rotate</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        <ModelViewer path="/models/boat-basic.glb" label="Lv.1 — Cloth Sail" scale={1} />
        <ModelViewer path="/models/boat-canvas.glb" label="Lv.2 — Canvas Sail" scale={1} />
        <ModelViewer path="/models/boat-racing.glb" label="Lv.3 — Racing Sail" scale={1} />
        <ModelViewer path="/models/boat-motor.glb" label="Lv.4 — Motor Engine" scale={1} />
        <ModelViewer path="/models/airplane.glb" label="Airplane" scale={1} />
        <ModelViewer path="/models/pirate-ship.glb" label="Pirate Ship" scale={1} />
      </div>
    </div>
  )
}
