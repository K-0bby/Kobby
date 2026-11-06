"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/motion";

/** Max drift as a % of the image's own height, either side of centre. */
const DRIFT = 8;

/**
 * A screenshot that drifts against the scroll inside its frame. The image is
 * 118% of the frame's height so the drift never exposes an edge.
 */
export default function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame) return;

    const update = () => {
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      el.style.transform = `translateY(${(-DRIFT + p * DRIFT).toFixed(2)}%)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="relative h-[118%] w-full will-change-transform">
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes="(min-width: 1440px) 1100px, 90vw"
        className="object-cover object-top"
      />
    </div>
  );
}
