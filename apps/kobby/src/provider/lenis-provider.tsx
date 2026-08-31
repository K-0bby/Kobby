"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import Lenis from "lenis";

/** Shared easing + timings, so no raw curve literals end up in components. */
const SCROLL_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(4, -10 * t));
const WHEEL_DURATION = 4;
const SCROLL_DURATION = 2;
const HASH_SETTLE_MS = 100;
const HASH_OFFSET = -100;

interface ScrollToOptions {
  offset?: number;
  duration?: number;
}

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number, options?: ScrollToOptions) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  // The ref keeps scrollTo stable; the state is what actually reaches
  // consumers. Reading the ref during render would pin every consumer to the
  // null it held on the first pass, since refs don't trigger a re-render.
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const scrollTo = useCallback(
    (target: string | number, options?: ScrollToOptions) => {
      lenisRef.current?.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? SCROLL_DURATION,
        easing: SCROLL_EASING,
      });
    },
    []
  );

  useEffect(() => {
    // Smooth scrolling is non-essential motion: leave native scrolling alone
    // for anyone who asked for reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      duration: WHEEL_DURATION,
      easing: SCROLL_EASING,
    });
    lenisRef.current = instance;
    setLenis(instance);

    let frame = requestAnimationFrame(function raf(time: number) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      // Let the target route finish painting before measuring its position.
      window.setTimeout(() => {
        instance.scrollTo(hash, {
          offset: HASH_OFFSET,
          duration: SCROLL_DURATION,
          easing: SCROLL_EASING,
        });
      }, HASH_SETTLE_MS);
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      // Without cancelling, the rAF loop keeps calling a destroyed instance.
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", handleHashScroll);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
