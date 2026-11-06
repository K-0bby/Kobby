"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@repo/ui";
import ShotStage from "@/components/ux/shot-stage";
import type { WalkthroughStep } from "@/types/project";
import { EASE_OUT_BEZIER, WALKTHROUGH } from "@/lib/motion";

interface WalkthroughProps {
  steps: WalkthroughStep[];
  hue: number;
  /** Project name, used in screen alt text. */
  name: string;
}

/**
 * A guided tour of the product, one screen per step. The step list sits
 * beside the screen; the active step opens to show what it does, and a
 * progress bar fills while that screen holds, then the tour moves on. Any step
 * can be chosen directly, which hands control to the visitor and stops the
 * auto-advance.
 */
export default function Walkthrough({ steps, hue, name }: WalkthroughProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Once a visitor picks a step, they're driving — stop auto-advancing.
  const [manual, setManual] = useState(false);

  const count = steps.length;
  const autoplay = !reduce && !manual && count > 1;
  const playing = autoplay && visible && !hovered;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (i: number) => {
    setManual(true);
    setActive(i);
  };

  // Arrow keys move between steps, per the tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + count) % count;
    select(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="grid gap-6 wide:grid-cols-[minmax(280px,0.42fr)_1fr] wide:gap-8"
    >
      {/* Steps */}
      <div
        role="tablist"
        aria-label={`${name} walkthrough`}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="order-2 flex flex-col gap-1 wide:order-1"
      >
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.src}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${baseId}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "group relative w-full cursor-pointer rounded-2xl border px-5 py-4 text-left transition-colors duration-250",
                on ? "border-line bg-surface" : "border-transparent bg-transparent hover:bg-surface/60"
              )}
            >
              <span className="flex items-center gap-3.5">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs transition-colors duration-250",
                    on ? "bg-signal text-white" : "bg-paper-2 text-ink-3 group-hover:text-ink-2"
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "text-[clamp(18px,1.5vw,21px)] font-bold tracking-[-0.03em] transition-colors duration-250",
                    on ? "text-ink" : "text-ink-2 group-hover:text-ink"
                  )}
                >
                  {s.title}
                </span>
              </span>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.span
                    key="detail"
                    className="block overflow-hidden"
                    initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: WALKTHROUGH.open, ease: EASE_OUT_BEZIER }}
                  >
                    <span className="block pt-2.5 pl-10.5 text-[15px] leading-normal text-pretty text-ink-2">
                      {s.text}
                    </span>
                    {autoplay && (
                      <span aria-hidden="true" className="mt-4 ml-10.5 block h-0.5 overflow-hidden rounded-full bg-line">
                        <span
                          key={active}
                          onAnimationEnd={() => setActive((n) => (n + 1) % count)}
                          style={{
                            animationDuration: `${WALKTHROUGH.holdMs}ms`,
                            animationPlayState: playing ? "running" : "paused",
                          }}
                          className="block h-full origin-left animate-reel-fill bg-signal"
                        />
                      </span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Screen */}
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="order-1 wide:order-2"
      >
        <ShotStage
          shots={steps.map((s) => s.src)}
          active={active}
          alts={steps.map((s) => `${name}: ${s.title}`)}
          hue={hue}
          sizes="(min-width: 980px) 60vw, 92vw"
          className="aspect-16/11 rounded-[28px]"
        />
      </div>
    </div>
  );
}
