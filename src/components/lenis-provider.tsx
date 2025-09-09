'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(4, -10 * t)),
    })

    // Animation frame function
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  // Expose lenis instance to window for debugging (optional)
  useEffect(() => {
    if (typeof window !== 'undefined' && lenisRef.current) {
      ;(window as typeof window & { lenis: Lenis }).lenis = lenisRef.current
    }
  }, [])

  return <>{children}</>
}
