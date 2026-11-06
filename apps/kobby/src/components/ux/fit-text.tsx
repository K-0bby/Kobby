"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@repo/ui";

/** Font size used to measure the text before scaling it to the container. */
const MEASURE_PX = 100;

/**
 * A single line of display text sized to exactly fill its container's width,
 * re-fitted on resize and once webfonts load. The className should carry a
 * `text-[…vw]` fallback close to the fitted size so the server render (and
 * no-JS) is already near-correct.
 */
export default function FitText({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;

    const fit = () => {
      el.style.fontSize = `${MEASURE_PX}px`;
      const w = el.scrollWidth;
      if (w) el.style.fontSize = `${((MEASURE_PX * box.clientWidth) / w).toFixed(2)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("inline-block whitespace-nowrap", className)}>
      {children}
    </div>
  );
}
