"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@repo/ui";
import { EASE_OUT_BEZIER, REEL } from "@/lib/motion";
import { tintStyle } from "@/lib/tint";

interface ShotStageProps {
  shots: string[];
  /** Which shot is showing. */
  active: number;
  /** Alt text per shot (same length as `shots`). */
  alts: string[];
  /** Hue (0–360) of the panel tint. */
  hue: number;
  /** Exact brand colour, overriding the hue-derived tint. */
  brand?: string;
  sizes: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A tinted panel with a product screen set into it — inset from the top-left
 * and bleeding off the right and bottom edges. Changing `active` plays the
 * shot change: the next screen rises in as the current one drifts away.
 */
export default function ShotStage({
  shots,
  active,
  alts,
  hue,
  brand,
  sizes,
  className,
  children,
}: ShotStageProps) {
  const reduce = useReducedMotion();
  const count = shots.length;

  return (
    <div
      // The tint hue is per project; light/dark lightness lives in CSS.
      style={tintStyle(hue, brand)}
      className={cn("shot-panel relative overflow-hidden", className)}
    >
      <div className="absolute top-[9%] right-0 bottom-0 left-[7%] overflow-hidden rounded-tl-2xl bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5),0_0_0_1px_rgb(0_0_0/0.06)]">
        {shots.map((src, i) => {
          const state =
            i === active ? "on" : i === (active - 1 + count) % count ? "out" : "wait";
          return (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={state}
              variants={{
                on: { opacity: 1, y: "0%", scale: 1, zIndex: 2 },
                out: reduce
                  ? { opacity: 0, zIndex: 1 }
                  : { opacity: 0, y: `${REEL.driftTo}%`, scale: 0.98, zIndex: 1 },
                wait: reduce
                  ? { opacity: 0, zIndex: 0 }
                  : { opacity: 0, y: `${REEL.riseFrom}%`, scale: 1.03, zIndex: 0 },
              }}
              transition={{ duration: reduce ? 0.2 : REEL.swap, ease: EASE_OUT_BEZIER }}
            >
              <Image
                src={src}
                alt={i === active ? (alts[i] ?? "") : ""}
                aria-hidden={i !== active}
                fill
                sizes={sizes}
                className="object-cover object-top-left"
              />
            </motion.div>
          );
        })}
      </div>
      {children}
    </div>
  );
}
