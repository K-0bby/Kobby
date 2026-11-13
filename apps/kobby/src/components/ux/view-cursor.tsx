"use client";

import { useEffect, useRef } from "react";
import { CURSOR_LERP } from "@/lib/motion";
import Arrow from "@/components/ux/arrow";

/** Off-screen park position until the pointer first moves. */
const PARKED = -200;

/**
 * A round "VIEW ↗" follower that grows in over anything marked [data-view]
 * (project cards, index rows, "Next project"). Fine pointers only — on touch
 * there is nothing to follow, so it never mounts its loop.
 */
export default function ViewCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let x = PARKED;
    let y = PARKED;
    let cx = PARKED;
    let cy = PARKED;
    let on = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as Element | null;
      const hit = !!target?.closest?.("[data-view]");
      if (hit !== on) {
        on = hit;
        // Jump straight to the pointer on first reveal instead of sliding in
        // from the parked corner.
        if (on && cx < PARKED / 2) {
          cx = x;
          cy = y;
        }
        if (innerRef.current) innerRef.current.style.transform = `scale(${on ? 1 : 0})`;
      }
    };

    const loop = () => {
      cx += (x - cx) * CURSOR_LERP;
      cy += (y - cy) * CURSOR_LERP;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-60 size-0"
    >
      <div
        ref={innerRef}
        // Hidden via inline transform (not Tailwind's `scale-0`, which sets the
        // separate `scale` property and would pin it shut under any transform).
        style={{ transform: "scale(0)" }}
        className="absolute -top-14 -left-14 flex size-28 flex-col items-center justify-center gap-1.5 rounded-full bg-btn font-mono text-[13px] font-medium tracking-[0.18em] text-btn-ink shadow-[0_20px_40px_-12px_rgb(0_0_0/0.35)] transition-transform duration-400 ease-out-soft"
      >
        <span>VIEW</span>
        <Arrow dir="up-right" />
      </div>
    </div>
  );
}
