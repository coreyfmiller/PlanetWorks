'use client'

import { Suspense, Component, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? this.props.fallback : this.props.children }
}

function Model({ path, scale = 1 }: { path: string; scale?: number }) {
  const { scene } = useGLTF(path)
  return <primitive object={scene.clone()} scale={scale} />
}

function ModelViewer({ path, label, description, scale = 1 }: { path: string; label: string; description?: string; scale?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 300, height: 240, borderRadius: 12, overflow: 'hidden', border: '1px solid #333', background: '#1a1a2e' }}>
        <ErrorBoundary fallback={<div style={{ color: '#666', padding: 20, textAlign: 'center' }}>Failed to load</div>}>
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
        </ErrorBoundary>
      </div>
      <span style={{ color: 'white', fontSize: 14, fontFamily: 'system-ui, sans-serif', fontWeight: 'bold' }}>{label}</span>
      {description && <span style={{ color: '#888', fontSize: 11, fontFamily: 'system-ui, sans-serif', maxWidth: 280, textAlign: 'center' }}>{description}</span>}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ width: '100%', maxWidth: 1200 }}>
      <h2 style={{ color: '#aaa', fontFamily: 'system-ui, sans-serif', fontSize: 16, margin: '32px 0 16px', borderBottom: '1px solid #333', paddingBottom: 8 }}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  )
}

export default function ModelsPage() {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#111',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
    }}>
      <h1 style={{ color: 'white', fontFamily: 'system-ui, sans-serif', fontSize: 28, margin: 0 }}>PlanetWorks — Asset Library</h1>
      <p style={{ color: '#666', fontFamily: 'system-ui, sans-serif', fontSize: 13, margin: 0 }}>Generated with Meshy AI. Drag to orbit.</p>

      <Section title="Boats (Upgradeable)">
        <ModelViewer path="/models/boat-basic.glb" label="Lv.1 — Cloth Sail" description="Free starter. Weathered oak rowboat with patched sail." scale={1} />
        <ModelViewer path="/models/boat-canvas.glb" label="Lv.2 — Canvas Sail" description="40 coins. Varnished mahogany hull, dual canvas sails." scale={1} />
        <ModelViewer path="/models/boat-racing.glb" label="Lv.3 — Racing Yacht" description="120 coins. Sleek dark blue hull, tall white dacron sails." scale={1} />
        <ModelViewer path="/models/boat-motor.glb" label="Lv.4 — Motor Engine" description="300 coins. White fiberglass, chrome outboard, no sails." scale={1} />
      </Section>

      <Section title="Trees (Low Poly — In Game)">
        <ModelViewer path="/models/tree-conifer.glb" label="Conifer" description="Pine/fir. Used in highland and forest biomes." scale={1} />
        <ModelViewer path="/models/tree-broadleaf.glb" label="Broadleaf" description="Oak/birch. Used in grassland and mid-elevation." scale={1} />
        <ModelViewer path="/models/tree-palm.glb" label="Palm" description="Tropical. Placed near coastlines and beaches." scale={1} />
      </Section>

      <Section title="Vehicles">
        <ModelViewer path="/models/airplane.glb" label="Biplane" description="Vintage red biplane with wooden propeller and fabric wings." scale={1} />
        <ModelViewer path="/models/pirate-ship.glb" label="Pirate Ship" description="Dark weathered hull, torn black sails, skull and crossbones. (37MB, may take time to load)" scale={1} />
      </Section>

      <Section title="Structures">
        <ModelViewer path="/models/port.glb" label="Port / Harbor" description="Wooden pier, lighthouse, fish market shack, crates and barrels. (42MB, may take time to load)" scale={1} />
      </Section>

      <Section title="Characters">
        <ModelViewer path="/models/character-fisherman.glb" label="Fisherman" description="Weathered castaway fisherman. Torn linen shirt, bare feet, sun-bleached hair." scale={1} />
      </Section>
    </div>
  )
}
