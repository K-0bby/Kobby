/**
 * Shared motion vocabulary. Every animation on the site draws its curve and
 * timings from here so nothing drifts per component.
 */

/** The house ease-out: fast start, long soft landing. */
export const EASE_OUT = "cubic-bezier(.2,.7,.1,1)";
/** Same curve as a bezier tuple, for motion/react transitions. */
export const EASE_OUT_BEZIER = [0.2, 0.7, 0.1, 1] as const;

/** Spring for the nav's sliding active pill. */
export const PILL_SPRING = { type: "spring", stiffness: 420, damping: 36 } as const;

/** Project shot reel: how long each screenshot holds, and the swap (seconds). */
export const REEL = {
  holdMs: 4200,
  swap: 0.9,
  /** Incoming shot rises from this far below (% of frame); outgoing drifts this far up. */
  riseFrom: 14,
  driftTo: -8,
} as const;

/** Case-study walkthrough: hold per screen (ms) and step open/close (s). */
export const WALKTHROUGH = {
  holdMs: 5200,
  open: 0.45,
} as const;

/** First-visit preloader choreography (ms). */
export const PRELOADER = {
  fontWaitMs: 800,
  enter: 600,
  beat: 250,
  unfold: 900,
  stagger: 90,
  hold: 700,
  /** Longest the full name will wait on page load before folding anyway. */
  maxLoadWaitMs: 3500,
  fold: 650,
  fly: 750,
  lift: 850,
  liftDelay: 120,
  /** Ease-in-out for folding and the curtain — decisive, not floaty. */
  foldEase: "cubic-bezier(.7,0,.3,1)",
} as const;

/** Nav + mobile menu timings (seconds, for motion/react). */
export const NAV_MOTION = {
  enter: 0.7,
  enterDelay: 0.1,
  menu: 0.35,
  menuItemStagger: 0.05,
  icon: 0.3,
} as const;

export const DURATION = {
  line: 800,
  fade: 650,
  name: 1100,
  badgeFade: 500,
  reveal: 750,
} as const;

/** Distance (px) a fading element travels while it settles. */
export const FADE_RISE = 12;
export const REVEAL_RISE = 28;

/** Follower cursor lerp factor per frame (0–1). Higher = snappier. */
export const CURSOR_LERP = 0.2;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
