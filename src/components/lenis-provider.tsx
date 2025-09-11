'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenis: Lenis | null
  scrollTo: (target: string | number, options?: { offset?: number; duration?: number }) => void
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {}
})

export const useLenis = () => useContext(LenisContext)

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(4, -10 * t))
      })
    }
  }

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(4, -10 * t)),
    })

    // Animation frame function
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    // Handle hash scrolling on page load
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash && lenisRef.current) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          lenisRef.current?.scrollTo(hash, {
            offset: -100,
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(4, -10 * t))
          })
        }, 100)
      }
    }

    // Check for hash on initial load
    handleHashScroll()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll)

    // Cleanup function
    return () => {
      lenisRef.current?.destroy()
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])

  // Expose lenis instance to window for debugging (optional)
  useEffect(() => {
    if (typeof window !== 'undefined' && lenisRef.current) {
      ;(window as typeof window & { lenis: Lenis }).lenis = lenisRef.current
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}
