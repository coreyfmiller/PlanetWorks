'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioProps {
  flyMode: boolean
}

/**
 * Background music player. Loops music.mp3 after first user interaction.
 * Volume dips slightly in fly mode so you can focus.
 */
export function AmbientAudio({ flyMode }: AudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio('/audio/music.mp3')
    audio.loop = true
    audio.volume = 0.4
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

  // Slightly lower volume in fly mode
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = flyMode ? 0.25 : 0.4
    }
  }, [flyMode])

  return null
}
