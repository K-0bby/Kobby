"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import ShotStage from "@/components/ux/shot-stage";
import { REEL } from "@/lib/motion";
import { tintStyle } from "@/lib/tint";

interface ShotReelProps {
  shots: string[];
  /** Alt text stem; each shot gets "<alt>, screen n". */
  alt: string;
  hue: number;
  /** Exact brand colour, overriding the hue-derived tint. */
  brand?: string;
  sizes: string;
  className?: string;
  /** "soft" = pale tint (default); "deep" = rich gradient for featured cards. */
  tone?: "soft" | "deep";
}

/**
 * A project card's screenshots played as a reel: every few seconds the next
 * shot rises in, while segment bars track progress.
 *
 * The active bar's fill is a CSS animation, and its end is what advances the
 * reel — so pausing the animation (hover, off-screen) pauses the timer too.
 */
export default function ShotReel({
  shots,
  alt,
  hue,
  brand,
  sizes,
  className,
  tone = "soft",
}: ShotReelProps) {
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

  // No screenshots yet: hold the space with the project's tinted panel and a
  // quiet label, so the card still reads as finished rather than broken.
  if (count === 0) {
    return (
      <div ref={ref} className={className}>
        <div
          style={tintStyle(hue, brand)}
          className={`shot-panel ${tone === "deep" ? "shot-panel--deep" : ""} absolute inset-0 grid place-items-center`}
        >
          <span className="rounded-full bg-black/35 px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.16em] text-white/85 backdrop-blur-sm">
            SCREENS COMING SOON
          </span>
        </div>
      </div>
    );
  }

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
        brand={brand}
        sizes={sizes}
        className={tone === "deep" ? "shot-panel--deep absolute inset-0" : "absolute inset-0"}
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
