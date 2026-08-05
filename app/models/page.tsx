'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Import boat models directly (they use THREE.DoubleSide)
function BasicSailboat() {
  return (
    <>
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[0.05, 0.016, 0.14]} />
        <meshLambertMaterial color="#5c3317" flatShading />
      </mesh>
      <mesh position={[0, 0.008, 0.08]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.022, 0.04, 4]} />
        <meshLambertMaterial color="#6b3a20" flatShading />
      </mesh>
      <mesh position={[0, 0.016, 0]}>
        <boxGeometry args={[0.044, 0.003, 0.11]} />
        <meshLambertMaterial color="#deb887" flatShading />
      </mesh>
      <mesh position={[0, 0.055, 0.01]}>
        <cylinderGeometry args={[0.002, 0.003, 0.07, 5]} />
        <meshLambertMaterial color="#4a3520" flatShading />
      </mesh>
      <mesh position={[0.008, 0.06, 0.01]} rotation={[0, 0.15, 0.05]}>
        <planeGeometry args={[0.03, 0.045]} />
        <meshBasicMaterial color="#f0e8d8" side={THREE.DoubleSide} transparent opacity={0.85} />
      </mesh>
    </>
  )
}

function CanvasSailboat() {
  return (
    <>
      <mesh position={[0, 0.006, 0]}>
        <boxGeometry args={[0.058, 0.018, 0.17]} />
        <meshLambertMaterial color="#4a2815" flatShading />
      </mesh>
      <mesh position={[0, 0.009, 0.095]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.026, 0.05, 4]} />
        <meshLambertMaterial color="#5c3317" flatShading />
      </mesh>
      <mesh position={[0, 0.018, 0]}>
        <boxGeometry args={[0.05, 0.003, 0.14]} />
        <meshLambertMaterial color="#deb887" flatShading />
      </mesh>
      <mesh position={[0, 0.032, -0.03]}>
        <boxGeometry args={[0.028, 0.018, 0.035]} />
        <meshLambertMaterial color="#f5e6d0" flatShading />
      </mesh>
      <mesh position={[0, 0.07, 0.02]}>
        <cylinderGeometry args={[0.002, 0.003, 0.09, 5]} />
        <meshLambertMaterial color="#4a3520" flatShading />
      </mesh>
      <mesh position={[0.012, 0.075, 0.02]} rotation={[0, 0.12, 0.03]}>
        <planeGeometry args={[0.04, 0.06]} />
        <meshBasicMaterial color="#fff8f0" side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.006, 0.06, 0.06]} rotation={[0, 0.2, 0.05]}>
        <planeGeometry args={[0.02, 0.035]} />
        <meshBasicMaterial color="#fff8f0" side={THREE.DoubleSide} transparent opacity={0.85} />
      </mesh>
    </>
  )
}

function RacingSailboat() {
  return (
    <>
      <mesh position={[0, 0.006, 0]}>
        <boxGeometry args={[0.05, 0.016, 0.2]} />
        <meshLambertMaterial color="#2a4060" flatShading />
      </mesh>
      <mesh position={[0, 0.009, 0.11]} rotation={[0.35, 0, 0]}>
        <coneGeometry args={[0.02, 0.05, 4]} />
        <meshLambertMaterial color="#2a4060" flatShading />
      </mesh>
      <mesh position={[0, 0.016, 0]}>
        <boxGeometry args={[0.044, 0.003, 0.17]} />
        <meshLambertMaterial color="#c0c8d0" flatShading />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.052, 0.004, 0.005]} />
        <meshLambertMaterial color="#cc2222" flatShading />
      </mesh>
      <mesh position={[0, 0.085, 0.02]}>
        <cylinderGeometry args={[0.002, 0.003, 0.13, 5]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>
      <mesh position={[0.015, 0.09, 0.02]} rotation={[0, 0.1, 0.03]}>
        <planeGeometry args={[0.05, 0.09]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0.008, 0.07, 0.08]} rotation={[0, 0.15, 0.05]}>
        <planeGeometry args={[0.03, 0.055]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.88} />
      </mesh>
    </>
  )
}

function MotorBoat() {
  return (
    <>
      <mesh position={[0, 0.008, 0]}>
        <boxGeometry args={[0.07, 0.02, 0.2]} />
        <meshLambertMaterial color="#e8e8e8" flatShading />
      </mesh>
      <mesh position={[0, 0.01, 0.11]} rotation={[0.3, 0, 0]}>
        <coneGeometry args={[0.03, 0.06, 4]} />
        <meshLambertMaterial color="#e8e8e8" flatShading />
      </mesh>
      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[0.068, 0.01, 0.19]} />
        <meshLambertMaterial color="#1a4488" flatShading />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.003, 0.16]} />
        <meshLambertMaterial color="#deb887" flatShading />
      </mesh>
      <mesh position={[0, 0.04, -0.04]}>
        <boxGeometry args={[0.05, 0.03, 0.07]} />
        <meshLambertMaterial color="#f5f5f5" flatShading />
      </mesh>
      <mesh position={[0, 0.058, -0.04]}>
        <boxGeometry args={[0.054, 0.004, 0.074]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>
      <mesh position={[0, 0.042, 0.005]}>
        <boxGeometry args={[0.04, 0.02, 0.002]} />
        <meshBasicMaterial color="#88ccff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.08, -0.05]}>
        <cylinderGeometry args={[0.001, 0.002, 0.04, 4]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>
      <mesh position={[0, 0.015, -0.1]}>
        <boxGeometry args={[0.03, 0.025, 0.025]} />
        <meshLambertMaterial color="#222222" flatShading />
      </mesh>
      <mesh position={[0, 0.0, -0.11]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.025, 4]} />
        <meshLambertMaterial color="#444444" flatShading />
      </mesh>
      <mesh position={[0.035, 0.02, 0.06]}>
        <sphereGeometry args={[0.003, 4, 4]} />
        <meshBasicMaterial color="#00cc00" />
      </mesh>
      <mesh position={[-0.035, 0.02, 0.06]}>
        <sphereGeometry args={[0.003, 4, 4]} />
        <meshBasicMaterial color="#cc0000" />
      </mesh>
    </>
  )
}

function ModelViewer({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 280, height: 220, borderRadius: 12, overflow: 'hidden', border: '1px solid #333' }}>
        <Canvas camera={{ position: [0.15, 0.1, 0.2], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 5, 4]} intensity={1.5} />
          <directionalLight position={[-2, -1, -3]} intensity={0.3} color="#4488cc" />
          <group scale={1}>
            {children}
          </group>
          <OrbitControls enablePan={false} />
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
      <h1 style={{ color: 'white', fontFamily: 'system-ui, sans-serif', fontSize: 24, margin: 0 }}>Boat Models</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        <ModelViewer label="Lv.1 — Cloth Sail (Free)">
          <BasicSailboat />
        </ModelViewer>
        <ModelViewer label="Lv.2 — Canvas Sail (40 coins)">
          <CanvasSailboat />
        </ModelViewer>
        <ModelViewer label="Lv.3 — Racing Sail (120 coins)">
          <RacingSailboat />
        </ModelViewer>
        <ModelViewer label="Lv.4 — Motor Engine (300 coins)">
          <MotorBoat />
        </ModelViewer>
      </div>
    </div>
  )
}
