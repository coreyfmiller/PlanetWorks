'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioProps {
  flyMode: boolean
}

/**
 * Background music player with volume slider.
 * Loops music.mp3 after first user interaction.
 */
export function AmbientAudio({ flyMode }: AudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4)

  useEffect(() => {
    const audio = new Audio('/audio/music.mp3')
    audio.loop = true
    audio.volume = volume
    audioRef.current = audio

    const start = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      }
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
    }

    window.addEventListener('click', start)
    window.addEventListener('keydown', start)

    return () => {
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Update volume when slider changes or fly mode toggles
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = flyMode ? volume * 0.6 : volume
    }
  }, [flyMode, volume])

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      background: 'rgba(0,0,0,0.7)',
      borderRadius: 10,
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      backdropFilter: 'blur(8px)',
      zIndex: 10,
    }}>
      <span style={{ fontSize: 16, cursor: 'pointer' }} onClick={() => {
        if (audioRef.current) {
          if (playing) {
            audioRef.current.pause()
            setPlaying(false)
          } else {
            audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
          }
        }
      }}>
        {playing ? '🔊' : '🔇'}
      </span>
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(volume * 100)}
        onChange={(e) => setVolume(Number(e.target.value) / 100)}
        style={{
          width: 70,
          height: 4,
          cursor: 'pointer',
          accentColor: '#1a88c8',
        }}
      />
    </div>
  )
}
