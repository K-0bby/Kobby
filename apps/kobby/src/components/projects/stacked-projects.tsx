"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ShotReel from "@/components/ux/shot-reel";
import type { Project } from "@/types/project";
import { pad2, projectHref, projectShots } from "@/data/data";
import { prefersReducedMotion } from "@/lib/motion";

/** Sticky offset of the first card, and how much each next card steps down. */
const STICK_TOP = 96;
const STICK_STEP = 20;
/** How far a covered card shrinks and dims as the next one slides over it. */
const SCALE_DROP = 0.05;
const DIM_DROP = 0.1;
const DESKTOP = "(min-width: 980px)";

/**
 * Featured work as a deck: on desktop each card pins under the nav and the
 * next one slides over it, pushing the covered card back (scale + dim). Below
 * 980px the cards simply stack.
 */
export default function StackedProjects({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mq = window.matchMedia(DESKTOP);
    const reduced = prefersReducedMotion();
    let raf = 0;

    const update = () => {
      raf = 0;
      const cards = Array.from(list.querySelectorAll<HTMLElement>("[data-stack]"));
      const H = window.innerHeight;
      cards.forEach((card, i) => {
        const inner = card.firstElementChild as HTMLElement | null;
        if (!inner) return;
        const next = cards[i + 1];
        if (!next || !mq.matches || reduced) {
          inner.style.transform = "";
          inner.style.filter = "";
          return;
        }
        const top = next.getBoundingClientRect().top;
        const stick = STICK_TOP + (i + 1) * STICK_STEP;
        const p = Math.min(1, Math.max(0, (H - top) / (H - stick)));
        inner.style.transform = `scale(${(1 - SCALE_DROP * p).toFixed(4)})`;
        inner.style.filter = `brightness(${(1 - DIM_DROP * p).toFixed(3)})`;
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", schedule);
    };
  }, []);

  const total = pad2(projects.length);

  return (
    <div ref={listRef} className="wide:gap-[14vh] flex flex-col gap-6">
      {projects.map((p, i) => (
        <div
          key={p.slug}
          data-stack=""
          // Per-card sticky offset and stacking order are data-driven; the
          // offset only applies once the cards actually pin (wide).
          style={{ ["--stick-top" as string]: `${STICK_TOP + i * STICK_STEP}px`, zIndex: i + 1 }}
          className="wide:sticky wide:top-(--stick-top) wide:h-[min(78vh,700px)] relative"
        >
          <Link
            data-view=""
            href={projectHref(p.slug)}
            aria-label={`${p.title} — view case study`}
            className="border-line bg-surface grid h-full origin-top grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] overflow-hidden rounded-[20px] border text-inherit no-underline shadow-[0_40px_80px_-50px_rgb(0_0_0/0.45)] transition-[border-color] duration-250"
          >
            <ShotReel
              shots={projectShots(p)}
              alt={`${p.title} website`}
              hue={p.hue}
              sizes="(min-width: 980px) 50vw, 100vw"
              className="relative min-h-[clamp(260px,40vw,340px)]"
            />
            <div className="flex flex-col gap-4.5 p-[clamp(24px,3.5vw,56px)]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-ink-3 font-mono text-xs font-medium tracking-[0.14em]">
                  {pad2(i + 1)} / {total}
                </span>
                <span className="chip">{p.category}</span>
              </div>
              <h3 className="mt-auto mb-0 text-[clamp(30px,3.4vw,54px)] leading-[.98] font-bold tracking-tighter text-balance">
                {p.title}
              </h3>
              <p className="text-ink-2 m-0 text-base leading-[1.55] text-pretty">{p.summary}</p>
              <div className="flex flex-wrap gap-2">
                {p.technologies.map((t) => (
                  <span
                    key={t}
                    className="border-line bg-paper rounded-full border px-3 py-1.5 text-[13px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="border-ink mt-1.5 flex items-center gap-2.5 self-start border-b-[1.5px] pb-0.75 text-base font-semibold">
                View case study <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
