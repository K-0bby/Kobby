"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/motion";

/* --- Pendulum tuning ------------------------------------------------------ */
/** Angle (deg) the badge swings in from on load. */
const START_ANGLE = 13;
/** Spring stiffness and damping pulling the badge back to rest. */
const STIFFNESS = 38;
const DAMPING = 3.4;
/** Hard stop (deg) and how much velocity survives bouncing off it. */
const HARD_LIMIT = 30;
const LIMIT_BOUNCE = -0.3;
/** How far a drag may pull the badge (deg). */
const DRAG_LIMIT = 28;
/** Max angular velocity carried out of a fling (deg/s). */
const FLING_LIMIT = 160;
/** Idle sway toward the mouse: max angle and strength. */
const SWAY_LIMIT = 3;
const SWAY_GAIN = 7;
/** Longest frame step integrated, so a backgrounded tab can't explode it. */
const MAX_DT = 0.032;
const MIN_DRAG_DT = 0.008;
/** Card yaw from angular velocity, and its clamp (deg). */
const YAW_GAIN = 0.06;
const YAW_LIMIT = 10;
/** Distance (px, unscaled) from the layer's top to the strap pivot. */
const PIVOT_OFFSET = 80;
const DESKTOP = "(min-width: 980px)";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * The hero's hanging developer pass. A damped pendulum: it swings in on load,
 * sways gently toward the mouse, and can be grabbed and flung on desktop.
 * Touch devices get the swing-in only, so vertical page scroll is never
 * hijacked. Reduced motion holds it still.
 */
export default function BadgeLanyard() {
  const layerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const rig = rigRef.current;
    const holder = holderRef.current;
    if (!layer || !rig || !holder) return;
    if (prefersReducedMotion()) return;

    let th = START_ANGLE; // angle (deg)
    let om = 0; // angular velocity (deg/s)
    let target = 0;
    let dragging = false;
    let grabOff = 0;
    let dragT = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;

    // Scale comes from CSS (--badge-s on .hero), the single source of truth.
    const scale = () => parseFloat(getComputedStyle(layer).getPropertyValue("--badge-s")) || 1;

    const pivot = () => {
      const r = layer.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top - PIVOT_OFFSET * scale() };
    };

    const angleTo = (x: number, y: number) => {
      const p = pivot();
      return (Math.atan2(x - p.x, y - p.y) * 180) / Math.PI;
    };

    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const nt = clamp(-angleTo(e.clientX, e.clientY) + grabOff, -DRAG_LIMIT, DRAG_LIMIT);
        const now = performance.now();
        const dt = Math.max(MIN_DRAG_DT, (now - dragT) / 1000);
        om = om * 0.5 + ((nt - th) / dt) * 0.5;
        th = nt;
        dragT = now;
      } else if (e.pointerType === "mouse") {
        const p = pivot();
        target = clamp(
          (-(e.clientX - p.x) / window.innerWidth) * SWAY_GAIN,
          -SWAY_LIMIT,
          SWAY_LIMIT
        );
      }
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      om = clamp(om, -FLING_LIMIT, FLING_LIMIT);
      holder.style.cursor = "grab";
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !window.matchMedia(DESKTOP).matches) return;
      e.preventDefault();
      grabOff = th + angleTo(e.clientX, e.clientY);
      dragging = true;
      dragT = performance.now();
      om = 0;
      holder.style.cursor = "grabbing";
    };

    const loop = (now: number) => {
      const dt = Math.min(MAX_DT, (now - last) / 1000);
      last = now;
      if (!dragging) {
        const acc = -STIFFNESS * (th - target) - DAMPING * om;
        om += acc * dt;
        th += om * dt;
      }
      if (Math.abs(th) > HARD_LIMIT) {
        th = Math.sign(th) * HARD_LIMIT;
        om *= LIMIT_BOUNCE;
      }
      if (visible) {
        const yaw = clamp(-om * YAW_GAIN, -YAW_LIMIT, YAW_LIMIT);
        rig.style.transform = `rotate(${th.toFixed(3)}deg)`;
        holder.style.transform = `perspective(900px) rotateY(${yaw.toFixed(2)}deg)`;
        if (glossRef.current) {
          glossRef.current.style.backgroundPosition = `${(40 + th * 2.2 + yaw * 1.5).toFixed(1)}% 0`;
        }
        if (shadowRef.current) {
          shadowRef.current.style.transform = `translateX(${(-th * 1.4).toFixed(1)}px)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    // Skip style writes while the hero is scrolled away.
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
    });
    io.observe(holder);

    holder.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      holder.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      data-badge-layer=""
      className="wide:left-[calc(100%-clamp(210px,21vw,360px))] absolute top-0 left-1/2 z-3 -ml-42.5 h-px w-85 origin-[170px_0] scale-(--badge-s)"
    >
      <div
        ref={rigRef}
        className="absolute -top-20 left-0 w-85 origin-[170px_0] will-change-transform"
      >
        {/* Strap */}
        <div aria-hidden="true" className="relative h-100">
          <div className="lanyard-strap lanyard-strap--left">
            <div className="lanyard-stitch" />
            <div className="lanyard-text rotate-180">
              FULL-STACK ENGINEER · GIDEON · FULL-STACK ENGINEER · GIDEON
            </div>
          </div>
          <div className="lanyard-strap lanyard-strap--right">
            <div className="lanyard-stitch" />
            <div className="lanyard-text">GIDEON · DEVELOPER PASS · GIDEON · DEVELOPER PASS</div>
          </div>
          <div className="lanyard-loop">
            <div className="absolute top-3 right-1 left-1 border-t border-dashed border-white/22" />
          </div>
        </div>

        {/* Clip */}
        <div aria-hidden="true" className="relative z-3 mt-3.5 -mb-8.5 flex flex-col items-center">
          <div className="lanyard-clip-ring" />
          <div className="lanyard-clip-bar" />
          <div className="lanyard-clip-hook" />
        </div>

        {/* Badge */}
        <div className="relative">
          <div
            ref={shadowRef}
            aria-hidden="true"
            className="badge-wall-shadow absolute inset-[30px_10px_-10px_30px] rounded-3xl blur-[26px]"
          />
          <div
            ref={holderRef}
            role="img"
            aria-label="Developer ID badge: Gideon Hoenyefia, Full-Stack Engineer. Next.js, Express.js, PostgreSQL. Available."
            className="badge-holder relative box-border w-85 cursor-grab touch-pan-y rounded-[22px] px-3.5 pt-11.5 pb-3.5 select-none"
          >
            <div className="badge-hole top-4.25 left-1/2 -ml-8.25 h-2.5 w-16.5 rounded-md" />
            <div className="badge-hole top-4 left-5 size-3 rounded-full" />
            <div className="badge-hole top-4 right-5 size-3 rounded-full" />

            <div className="badge-card relative overflow-hidden rounded-xl shadow-[0_1px_2px_rgb(0_0_0/0.08),0_0_0_1px_rgb(0_0_0/0.04)]">
              <div className="relative h-75 overflow-hidden bg-[linear-gradient(180deg,#AEB3BD,#D9DBE0_70%,#E7E8EB)]">
                <Image
                  src="/images/me.png"
                  alt=""
                  fill
                  preload
                  draggable={false}
                  sizes="320px"
                  className="pointer-events-none object-cover object-[50%_18%]"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgb(0_0_0/0.45),rgb(0_0_0/0))]" />
                <div className="absolute top-3.5 right-4 left-4 flex justify-between font-mono text-[10px] font-medium tracking-[0.22em] text-white [text-shadow:0_1px_4px_rgb(0_0_0/0.5)]">
                  <span>DEVELOPER PASS</span>
                  <span>2026</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 px-5 pt-4.5 pb-4">
                <div className="text-[25px] leading-[1.05] font-bold tracking-[-0.035em]">
                  Gideon Hoenyefia
                </div>
                <div className="text-[15px] font-medium tracking-[-0.01em]">
                  Full-Stack Engineer
                </div>
                <div className="mt-0.5 font-mono text-[10px] tracking-[0.16em] text-(--gh-card-mut)">
                  NEXT.JS · EXPRESS.JS · POSTGRESQL
                </div>
                <div className="mt-2.5 mb-1.5 h-px bg-black/8" />
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-(--gh-card-mut)">
                  <span>BUILDING FOR THE WEB</span>
                  <span className="flex items-center gap-1.5 font-medium text-(--gh-card-tx)">
                    <span className="size-1.75 rounded-full bg-[#22B35E] shadow-[0_0_0_3px_rgb(34_179_94/0.18)]" />
                    AVAILABLE
                  </span>
                </div>
              </div>
            </div>
            <div ref={glossRef} aria-hidden="true" className="badge-gloss" />
          </div>
        </div>
      </div>
    </div>
  );
}
