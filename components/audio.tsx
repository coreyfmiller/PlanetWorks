'use client'

import { useEffect, useRef } from 'react'

interface AudioProps {
  flyMode: boolean
}

/**
 * Ambient audio: ocean waves in globe mode, airplane engine in fly mode.
 * Uses Web Audio API oscillators and noise buffers. No external files needed.
 * Audio only starts after first user interaction (browser autoplay policy).
 */
export function AmbientAudio({ flyMode }: AudioProps) {
  const ctxRef = useRef<AudioContext | null>(null)
  const engineRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null)
  const oceanRef = useRef<{ source: AudioBufferSourceNode; gain: GainNode } | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    // Start audio context on first user gesture
    const start = () => {
      if (startedRef.current) return
      startedRef.current = true

      const ctx = new AudioContext()
      ctxRef.current = ctx

      // --- Ocean ambience (filtered noise) ---
      const oceanBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate)
      const data = oceanBuffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        // Shape noise to sound wave-like: slow amplitude modulation
        const t = i / ctx.sampleRate
        const envelope = Math.sin(t * 0.4) * 0.3 + 0.5 + Math.sin(t * 0.17) * 0.2
        data[i] = (Math.random() * 2 - 1) * envelope
      }

      const oceanSource = ctx.createBufferSource()
      oceanSource.buffer = oceanBuffer
      oceanSource.loop = true

      const oceanFilter = ctx.createBiquadFilter()
      oceanFilter.type = 'lowpass'
      oceanFilter.frequency.value = 400

      const oceanGain = ctx.createGain()
      oceanGain.gain.value = flyMode ? 0 : 0.15

      oceanSource.connect(oceanFilter)
      oceanFilter.connect(oceanGain)
      oceanGain.connect(ctx.destination)
      oceanSource.start()

      oceanRef.current = { source: oceanSource, gain: oceanGain }

      // --- Engine sound (two detuned oscillators + gain shaping) ---
      const engineGain = ctx.createGain()
      engineGain.gain.value = flyMode ? 0.12 : 0

      const osc1 = ctx.createOscillator()
      osc1.type = 'sawtooth'
      osc1.frequency.value = 85

      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.value = 170

      const engineFilter = ctx.createBiquadFilter()
      engineFilter.type = 'lowpass'
      engineFilter.frequency.value = 600

      osc1.connect(engineFilter)
      osc2.connect(engineFilter)
      engineFilter.connect(engineGain)
      engineGain.connect(ctx.destination)
      osc1.start()
      osc2.start()

      engineRef.current = { osc1, osc2, gain: engineGain }

      // Remove listener after first interaction
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
    }

    window.addEventListener('click', start)
    window.addEventListener('keydown', start)

    return () => {
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
      if (ctxRef.current) {
        ctxRef.current.close()
      }
    }
  }, [])

  // Crossfade between ocean and engine based on fly mode
  useEffect(() => {
    const ctx = ctxRef.current
    if (!ctx) return

    const now = ctx.currentTime

    if (engineRef.current) {
      engineRef.current.gain.gain.linearRampToValueAtTime(
        flyMode ? 0.12 : 0,
        now + 0.8
      )
    }

    if (oceanRef.current) {
      oceanRef.current.gain.gain.linearRampToValueAtTime(
        flyMode ? 0.03 : 0.15,
        now + 0.8
      )
    }
  }, [flyMode])

  return null
}
