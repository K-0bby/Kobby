"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import ShotStage from "@/components/ux/shot-stage";
import { REEL } from "@/lib/motion";

interface ShotReelProps {
  shots: string[];
  /** Alt text stem; each shot gets "<alt>, screen n". */
  alt: string;
  hue: number;
  sizes: string;
  className?: string;
}

/**
 * A project card's screenshots played as a reel: every few seconds the next
 * shot rises in, while segment bars track progress.
 *
 * The active bar's fill is a CSS animation, and its end is what advances the
 * reel — so pausing the animation (hover, off-screen) pauses the timer too.
 */
export default function ShotReel({ shots, alt, hue, sizes, className }: ShotReelProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const count = shots.length;
  const playing = !reduce && count > 1 && visible && !hovered;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={className}
    >
      <ShotStage
        shots={shots}
        active={active}
        alts={shots.map((_, i) => `${alt}, screen ${i + 1}`)}
        hue={hue}
        sizes={sizes}
        className="absolute inset-0"
      >
        {/* Progress segments — decorative; the card itself is the link. */}
        {count > 1 && !reduce && (
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[7%] z-3 flex gap-1.5 rounded-full bg-black/55 px-2.5 py-2 backdrop-blur-sm"
          >
            {shots.map((src, i) => (
              <span key={src} className="relative h-0.75 w-5 overflow-hidden rounded-full bg-white/30">
                {i < active && <span className="absolute inset-0 bg-white" />}
                {i === active && (
                  <span
                    key={active}
                    onAnimationEnd={() => setActive((n) => (n + 1) % count)}
                    style={{
                      animationDuration: `${REEL.holdMs}ms`,
                      animationPlayState: playing ? "running" : "paused",
                    }}
                    className="absolute inset-0 origin-left animate-reel-fill bg-signal"
                  />
                )}
              </span>
            ))}
          </div>
        )}
      </ShotStage>
    </div>
  );
}
