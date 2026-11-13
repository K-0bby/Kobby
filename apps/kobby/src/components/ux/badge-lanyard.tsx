"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/motion";
import { PRELOADED_EVENT } from "@/components/ux/preloader";

/* ---------------------------------------------------------------------------
   The hero's developer pass, hanging from a flexible lanyard.

   Physics, in the layer's own unscaled px (the layer scales with --badge-s):
   - The pass is a free body hanging from the clip point. It's pulled by
     gravity and held by the strap, which acts like a stretchy cord: slack
     when the pass is pushed toward the neck, springing back once it's pulled
     past its length.
   - The pass's tilt follows the strap's direction with a little lag, so it
     wobbles as it moves.
   - The two ribbons are Verlet ropes pinned at the neck and at the clip, so
     they bend, fold when slack, and trail behind fast movement.
   --------------------------------------------------------------------------- */

/** Strap length: neck pivot to clip, rig-local (the clip loop sits at y=400). */
const STRAP_LENGTH = 400;
/** Gravity on the pass (px/s²). Sets how fast it falls and swings. */
const GRAVITY = 6000;
/** How hard the strap pulls back once stretched past its length (1/s²). */
const STRAP_STIFFNESS = 900;
/** Damping along the strap while stretched — stops it twanging forever. */
const STRAP_DAMPING = 14;
/** Air drag on the pass (1/s) — enough that swings carry but settle in a few seconds. */
const AIR_DRAG = 1.1;
/** Furthest the pass can be dragged from the neck, as a share of the strap. */
const DRAG_REACH = 1.25;
/** The strap can stretch, but never beyond this share of its length. */
const MAX_STRETCH = 1.3;
/** Fastest the pass can be thrown (px/s) — a hand, not a cannon. */
const MAX_THROW = 1700;

/** Tilt spring: how quickly the pass lines up with its strap, and its damping. */
const TILT_STIFFNESS = 70;
const TILT_DAMPING = 7;
const TILT_LIMIT = 50;
/** On phones the pass rests with a slight lean. */
const MOBILE_REST_TILT = -4;

/** Card yaw from sideways speed, and its clamp (deg). */
const YAW_GAIN = 0.018;
const YAW_LIMIT = 12;
/** Idle sway: a gentle sideways breeze toward the mouse (px/s²). */
const SWAY_FORCE = 260;
/**
 * Hover push: moving the cursor across the card brushes it along. Each pixel
 * of pointer movement adds this much velocity (px/s), sideways and vertically,
 * plus a little spin, all capped so a fast flick can't launch it.
 */
const HOVER_PUSH_X = 5.5;
const HOVER_PUSH_Y = 3;
const HOVER_SPIN = 1.1;
const HOVER_MAX_SPEED = 900;

/** Drop-in: start this far above the resting spot, with a sideways nudge. */
const DROP_HEIGHT = 760;
const DROP_NUDGE = 260;

/** Longest frame step integrated, so a backgrounded tab can't explode it. */
const MAX_DT = 0.032;
const MIN_DRAG_DT = 0.008;
const DESKTOP = "(min-width: 980px)";

/* --- Ribbons ---------------------------------------------------------------- */
const ROPE_POINTS = 16;
/** Ribbon length relative to the rest distance — a touch of slack. */
const ROPE_SLACK = 1.03;
const ROPE_GRAVITY = 2600;
/** Velocity kept per frame; lower = calmer ribbons. */
const ROPE_DAMPING = 0.982;
/** Constraint passes per frame; more = less stretchy. */
const ROPE_ITERATIONS = 18;
/** Ribbon ends in rig-local coordinates: at the neck, and into the loop. */
const RIBBONS = [
  { top: { x: 126, y: -10 }, bottom: { x: 162, y: 396 } },
  { top: { x: 214, y: -10 }, bottom: { x: 178, y: 396 } },
];
/** Text woven into each ribbon, top to bottom. */
const RIBBON_TEXT = [
  "FULL-STACK ENGINEER · GIDEON · FULL-STACK ENGINEER",
  "GIDEON · DEVELOPER PASS · GIDEON · DEVELOPER PASS",
];

/** Rig's top edge relative to the layer (desktop hangs from just above). */
const RIG_TOP = { desktop: -80, phone: -443 };
const CENTER_X = 170;

type Pt = { x: number; y: number };

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const toRad = (d: number) => (d * Math.PI) / 180;

/** Smooth SVG path through a chain of points (quadratic through midpoints). */
function ropePath(pts: Pt[]): string {
  const first = pts[0];
  const end = pts[pts.length - 1];
  if (!first || !end) return "";
  let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    const n = pts[i + 1]!;
    d += ` Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${((p.x + n.x) / 2).toFixed(1)} ${((p.y + n.y) / 2).toFixed(1)}`;
  }
  return `${d} L${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

/** A Verlet rope of fixed length, pinned at both ends. */
class Rope {
  pts: Pt[] = [];
  prev: Pt[] = [];
  seg = 0;

  reset(a: Pt, b: Pt, length: number) {
    this.seg = length / (ROPE_POINTS - 1);
    this.pts = Array.from({ length: ROPE_POINTS }, (_, i) => {
      const t = i / (ROPE_POINTS - 1);
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    });
    this.prev = this.pts.map((p) => ({ ...p }));
  }

  step(a: Pt, b: Pt, dt: number) {
    const n = this.pts.length;
    const g = ROPE_GRAVITY * dt * dt;
    for (let i = 1; i < n - 1; i++) {
      const p = this.pts[i]!;
      const q = this.prev[i]!;
      const vx = (p.x - q.x) * ROPE_DAMPING;
      const vy = (p.y - q.y) * ROPE_DAMPING;
      q.x = p.x;
      q.y = p.y;
      p.x += vx;
      p.y += vy + g;
    }
    for (let k = 0; k < ROPE_ITERATIONS; k++) {
      Object.assign(this.pts[0]!, a);
      Object.assign(this.pts[n - 1]!, b);
      for (let i = 0; i < n - 1; i++) {
        const p = this.pts[i]!;
        const q = this.pts[i + 1]!;
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        // Only pull links that are too long — a ribbon can fold, not push.
        if (dist <= this.seg) continue;
        const pinnedP = i === 0;
        const pinnedQ = i + 1 === n - 1;
        const share = pinnedP || pinnedQ ? 1 : 0.5;
        const corr = ((dist - this.seg) / dist) * share;
        if (!pinnedP) {
          p.x += dx * corr;
          p.y += dy * corr;
        }
        if (!pinnedQ) {
          q.x -= dx * corr;
          q.y -= dy * corr;
        }
      }
    }
    Object.assign(this.pts[0]!, a);
    Object.assign(this.pts[n - 1]!, b);
  }
}

/**
 * Grab it — mouse or finger — and move it anywhere within the strap's reach;
 * let go and it falls, catches and swings. Hovering and moving the cursor
 * across it brushes it along. On load it drops in from above. A scroll that
 * starts on the card moves the card, not the page. Reduced motion hangs it
 * still.
 */
export default function BadgeLanyard() {
  const layerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  // Per ribbon: [body, stitching, top layer] — the text rides on the body.
  const ribbonRefs = useRef<(SVGPathElement | null)[]>([]);
  const ribbonId = useId().replace(/:/g, "");

  useEffect(() => {
    const layer = layerRef.current;
    const rig = rigRef.current;
    const holder = holderRef.current;
    if (!layer || !rig || !holder) return;

    const reduced = prefersReducedMotion();
    const desktop = window.matchMedia(DESKTOP);
    const rigTop = () => (desktop.matches ? RIG_TOP.desktop : RIG_TOP.phone);
    const restTilt = () => (desktop.matches ? 0 : MOBILE_REST_TILT);
    /** The neck: where the strap hangs from. */
    const neck = (): Pt => ({ x: CENTER_X, y: rigTop() });
    /** Where the clip rests, straight below the neck. */
    const restClip = (): Pt => ({ x: CENTER_X, y: rigTop() + STRAP_LENGTH });

    // Pass state: clip position, velocity, tilt and its rate.
    let c = restClip();
    let v: Pt = { x: 0, y: 0 };
    let tilt = restTilt();
    let tiltV = 0;
    let breeze = 0;

    // Pointer state.
    let hovering = false;
    let dragging = false;
    let grab: Pt = { x: 0, y: 0 };
    let dragT = 0;

    // Drop-in: hold it above the screen until the page is revealed.
    let held = !reduced;
    if (held) {
      c = { x: c.x, y: c.y - DROP_HEIGHT };
    }
    const release = () => {
      if (!held) return;
      held = false;
      v = { x: (Math.random() < 0.5 ? -1 : 1) * DROP_NUDGE, y: 0 };
    };

    /** A rig-local point placed by the current clip position and tilt. */
    const place = (p: Pt): Pt => {
      const a = toRad(tilt);
      const dx = p.x - CENTER_X;
      const dy = p.y - STRAP_LENGTH;
      return {
        x: c.x + dx * Math.cos(a) - dy * Math.sin(a),
        y: c.y + dx * Math.sin(a) + dy * Math.cos(a),
      };
    };

    const ropes = RIBBONS.map(() => new Rope());
    const ribbonTop = (r: (typeof RIBBONS)[number]): Pt => ({ x: r.top.x, y: rigTop() + r.top.y });
    const resetRopes = () => {
      RIBBONS.forEach((r, i) => {
        const top = ribbonTop(r);
        const restBottom = { x: r.bottom.x, y: rigTop() + r.bottom.y };
        const len = Math.hypot(restBottom.x - top.x, restBottom.y - top.y) * ROPE_SLACK;
        ropes[i]!.reset(top, place(r.bottom), len);
      });
    };
    const stepRopes = (dt: number) =>
      RIBBONS.forEach((r, i) => ropes[i]!.step(ribbonTop(r), place(r.bottom), dt));
    const drawRopes = () =>
      ropes.forEach((rope, i) => {
        const d = ropePath(rope.pts);
        for (let k = 0; k < 3; k++) ribbonRefs.current[i * 3 + k]?.setAttribute("d", d);
      });

    const yawOf = () => clamp(-v.x * YAW_GAIN, -YAW_LIMIT, YAW_LIMIT);
    const render = () => {
      // The rig's transform origin is the clip loop, so this lands the loop on
      // the clip position and tilts the pass around it.
      const rest = restClip();
      rig.style.transform = `translate(${(c.x - rest.x).toFixed(1)}px, ${(c.y - rest.y).toFixed(1)}px) rotate(${tilt.toFixed(2)}deg)`;
      const yaw = yawOf();
      holder.style.transform = `perspective(900px) rotateY(${yaw.toFixed(2)}deg)`;
      if (glossRef.current) {
        glossRef.current.style.backgroundPosition = `${(40 + tilt * 2.2 + yaw * 1.5).toFixed(1)}% 0`;
      }
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateX(${(-tilt * 1.4).toFixed(1)}px)`;
      }
      drawRopes();
    };

    resetRopes();
    render();

    // Reduced motion: no drop, no swing — let the ribbons settle into their
    // natural hang once and draw everything still.
    if (reduced) {
      const settle = () => {
        c = restClip();
        tilt = restTilt();
        resetRopes();
        for (let i = 0; i < 240; i++) stepRopes(1 / 60);
        render();
      };
      settle();
      desktop.addEventListener("change", settle);
      return () => desktop.removeEventListener("change", settle);
    }

    const html = document.documentElement;
    if (html.classList.contains("preloading")) {
      window.addEventListener(PRELOADED_EVENT, release, { once: true });
    } else {
      release();
    }

    // Screen ↔ layer coordinates (the layer is scaled about (170, 0)).
    const scale = () => parseFloat(getComputedStyle(layer).getPropertyValue("--badge-s")) || 1;
    const toLayer = (clientX: number, clientY: number): Pt => {
      const r = layer.getBoundingClientRect();
      const s = scale();
      return { x: (clientX - r.left) / s, y: (clientY - r.top) / s };
    };

    /** Keep a point within reach of the neck. */
    const withinReach = (p: Pt): Pt => {
      const n = neck();
      const dx = p.x - n.x;
      const dy = p.y - n.y;
      const d = Math.hypot(dx, dy);
      const max = STRAP_LENGTH * DRAG_REACH;
      return d <= max ? p : { x: n.x + (dx / d) * max, y: n.y + (dy / d) * max };
    };

    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const p = toLayer(e.clientX, e.clientY);
        const next = withinReach({ x: p.x - grab.x, y: p.y - grab.y });
        const now = performance.now();
        const dt = Math.max(MIN_DRAG_DT, (now - dragT) / 1000);
        // Smoothed hand velocity, carried into the throw on release.
        v = {
          x: v.x * 0.5 + ((next.x - c.x) / dt) * 0.5,
          y: v.y * 0.5 + ((next.y - c.y) / dt) * 0.5,
        };
        c = next;
        dragT = now;
      } else if (e.pointerType === "mouse" && desktop.matches) {
        // A soft breeze toward the pointer.
        const r = layer.getBoundingClientRect();
        breeze = clamp((e.clientX - (r.left + r.width / 2)) / window.innerWidth, -1, 1) * SWAY_FORCE;

        // Brushing across the card pushes it the way the cursor is moving.
        if (hovering && !held) {
          const s = scale();
          v = { x: v.x + (e.movementX / s) * HOVER_PUSH_X, y: v.y + (e.movementY / s) * HOVER_PUSH_Y };
          const speed = Math.hypot(v.x, v.y);
          if (speed > HOVER_MAX_SPEED) {
            v = { x: (v.x / speed) * HOVER_MAX_SPEED, y: (v.y / speed) * HOVER_MAX_SPEED };
          }
          tiltV -= e.movementX * HOVER_SPIN;
        }
      }
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      holder.style.cursor = "grab";
      // Throw with the hand's speed, capped so a flick can't launch it away.
      const speed = Math.hypot(v.x, v.y);
      if (speed > MAX_THROW) v = { x: (v.x / speed) * MAX_THROW, y: (v.y / speed) * MAX_THROW };
    };

    const onDown = (e: PointerEvent) => {
      // Mouse, pen or finger — the card can be grabbed on any device.
      if (held) return;
      e.preventDefault();
      // Keep receiving the finger's moves even if it slides off the card.
      holder.setPointerCapture?.(e.pointerId);
      const p = toLayer(e.clientX, e.clientY);
      grab = { x: p.x - c.x, y: p.y - c.y };
      dragging = true;
      dragT = performance.now();
      v = { x: 0, y: 0 };
      holder.style.cursor = "grabbing";
    };

    let last = performance.now();
    let raf = 0;
    let visible = true;

    const loop = (now: number) => {
      const dt = Math.min(MAX_DT, (now - last) / 1000);
      last = now;

      if (!held && !dragging) {
        // Gravity, a breath of breeze, and air drag.
        let ax = breeze - AIR_DRAG * v.x;
        let ay = GRAVITY - AIR_DRAG * v.y;
        // The strap: slack until it's pulled past its length, then it springs.
        const n = neck();
        const dx = c.x - n.x;
        const dy = c.y - n.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d > STRAP_LENGTH) {
          const ux = dx / d;
          const uy = dy / d;
          const stretch = d - STRAP_LENGTH;
          const along = v.x * ux + v.y * uy;
          const pull = STRAP_STIFFNESS * stretch + STRAP_DAMPING * along;
          ax -= ux * pull;
          ay -= uy * pull;
        }
        v = { x: v.x + ax * dt, y: v.y + ay * dt };
        c = { x: c.x + v.x * dt, y: c.y + v.y * dt };

        // Hard limit: the strap can't stretch past MAX_STRETCH. Snap back onto
        // that circle and drop the outward part of the velocity.
        const ex = c.x - n.x;
        const ey = c.y - n.y;
        const ed = Math.hypot(ex, ey) || 1;
        const maxLen = STRAP_LENGTH * MAX_STRETCH;
        if (ed > maxLen) {
          const ux = ex / ed;
          const uy = ey / ed;
          c = { x: n.x + ux * maxLen, y: n.y + uy * maxLen };
          const out = v.x * ux + v.y * uy;
          if (out > 0) v = { x: v.x - out * ux, y: v.y - out * uy };
        }
      }

      // Tilt: line the pass up with its strap — fully when taut, less when
      // slack — with a springy lag so it wobbles as it moves.
      if (!held) {
        const n = neck();
        const dx = c.x - n.x;
        const dy = c.y - n.y;
        const d = Math.hypot(dx, dy) || 1;
        const strapAngle = -(Math.atan2(dx, dy) * 180) / Math.PI;
        const taut = clamp(d / STRAP_LENGTH, 0, 1);
        const goal = clamp(strapAngle * taut + restTilt(), -TILT_LIMIT, TILT_LIMIT);
        const ta = TILT_STIFFNESS * (goal - tilt) - TILT_DAMPING * tiltV;
        tiltV += ta * dt;
        tilt += tiltV * dt;
      }

      if (visible) {
        stepRopes(dt);
        render();
      }
      raf = requestAnimationFrame(loop);
    };

    const onBreakpoint = () => {
      c = restClip();
      v = { x: 0, y: 0 };
      tilt = restTilt();
      tiltV = 0;
      resetRopes();
      render();
    };
    desktop.addEventListener("change", onBreakpoint);

    // Skip simulation and style writes while the hero is scrolled away.
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
    });
    // Watch the hero itself: the layer's direct wrapper is `display: contents`
    // on desktop and never reports as on screen.
    io.observe(layer.closest("section") ?? layer);

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    holder.addEventListener("pointerenter", onEnter);
    holder.addEventListener("pointerleave", onLeave);
    holder.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      desktop.removeEventListener("change", onBreakpoint);
      holder.removeEventListener("pointerenter", onEnter);
      holder.removeEventListener("pointerleave", onLeave);
      holder.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener(PRELOADED_EVENT, release);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      data-badge-layer=""
      // Phones: the pass sits in the hero's flow, centred, its height reserved
      // at the scaled size. Desktop: it hangs from the top on its strap.
      className="wide:absolute wide:top-0 wide:left-[calc(100%-clamp(210px,21vw,360px))] wide:-ml-42.5 wide:h-px wide:z-3 relative z-1 mx-auto h-[calc(512px*var(--badge-s))] w-85 shrink-0 origin-[170px_0] scale-(--badge-s)"
    >
      {/* Lanyard ribbons: shapes come from the rope simulation every frame.
          Faint on phones, where they run up behind the headline. */}
      <svg
        aria-hidden="true"
        className="wide:opacity-100 pointer-events-none absolute top-0 left-0 h-px w-85 overflow-visible opacity-25"
      >
        {RIBBON_TEXT.map((text, i) => (
          <g key={text}>
            {/* Ribbon body */}
            <path
              id={`${ribbonId}-r${i}`}
              ref={(el) => {
                ribbonRefs.current[i * 3] = el;
              }}
              fill="none"
              stroke="var(--gh-strap)"
              strokeWidth={24}
              strokeLinejoin="round"
            />
            {/* Stitching: a dashed band, mostly covered by the next layer so
                only its edges show — stitches along both sides. */}
            <path
              ref={(el) => {
                ribbonRefs.current[i * 3 + 1] = el;
              }}
              fill="none"
              stroke="rgb(255 255 255 / 0.22)"
              strokeWidth={19}
              strokeDasharray="3 3"
              strokeLinejoin="round"
            />
            <path
              ref={(el) => {
                ribbonRefs.current[i * 3 + 2] = el;
              }}
              fill="none"
              stroke="var(--gh-strap)"
              strokeWidth={17}
              strokeLinejoin="round"
            />
            {/* Woven text, following the ribbon's curve. */}
            <text
              fill="rgb(255 255 255 / 0.72)"
              fontFamily="var(--font-mono)"
              fontSize={8.5}
              fontWeight={500}
              letterSpacing="0.28em"
              dominantBaseline="central"
            >
              <textPath href={`#${ribbonId}-r${i}`} startOffset="12%">
                {text}
              </textPath>
            </text>
          </g>
        ))}
      </svg>

      <div
        ref={rigRef}
        // Transform origin is the clip loop (170, 400): the physics places the
        // loop and tilts the pass around it.
        className="wide:-top-20 absolute -top-110.75 left-0 w-85 origin-[170px_400px] will-change-transform"
      >
        {/* Strap length — the ribbons themselves are drawn by the SVG above;
            this keeps the clip and pass where they hang. */}
        <div aria-hidden="true" className="wide:opacity-100 relative h-100 opacity-25">
          <div className="lanyard-loop">
            <div className="absolute top-3 right-1 left-1 border-t border-dashed border-white/22" />
          </div>
        </div>

        {/* Clip */}
        <div
          aria-hidden="true"
          className="relative z-3 mt-3.5 -mb-8.5 flex flex-col items-center"
        >
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
            className="badge-holder relative box-border w-85 cursor-grab touch-none rounded-[22px] px-3.5 pt-11.5 pb-3.5 select-none"
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
