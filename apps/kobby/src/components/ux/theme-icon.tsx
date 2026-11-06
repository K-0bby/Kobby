"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT_BEZIER, NAV_MOTION } from "@/lib/motion";

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Moon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

function Sun() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
      <circle cx={12} cy={12} r={4} />
      {RAY_ANGLES.map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={12 + Math.cos(r) * 7.5}
            y1={12 + Math.sin(r) * 7.5}
            x2={12 + Math.cos(r) * 10}
            y2={12 + Math.sin(r) * 10}
          />
        );
      })}
    </svg>
  );
}

/**
 * Sun in light mode, moon in dark — the icon shows the current theme. On
 * toggle the outgoing icon spins away as the incoming one spins in.
 */
export default function ThemeIcon({ dark }: { dark: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative grid size-5 place-items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          className="absolute inset-0 grid place-items-center"
          initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: NAV_MOTION.icon, ease: EASE_OUT_BEZIER }}
        >
          {dark ? <Moon /> : <Sun />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
