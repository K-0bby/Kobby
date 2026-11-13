"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ShotReel from "@/components/ux/shot-reel";
import type { Project } from "@/types/project";
import { pad2, projectHref, projectShots } from "@/data/data";
import { prefersReducedMotion } from "@/lib/motion";
import { tintStyle } from "@/lib/tint";
import Arrow from "@/components/ux/arrow";

/**
 * Sticky offset of the first card, and how much each next card steps down —
 * tighter on phones, where the nav is the same height but the screen isn't.
 */
const STICK = {
  desktop: { top: 96, step: 20 },
  phone: { top: 88, step: 12 },
};
/** How far a covered card shrinks and dims as the next one slides over it. */
const SCALE_DROP = 0.05;
const DIM_DROP = 0.1;
const DESKTOP = "(min-width: 980px)";

/** App-tile letters: first letter of up to two words ("Me-fie Directory" → "MD"). */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

const stickAt = (i: number, desktop: boolean) => {
  const s = desktop ? STICK.desktop : STICK.phone;
  return s.top + i * s.step;
};

/**
 * Featured work as a deck: each card pins under the nav and the next one
 * slides over it, pushing the covered card back (scale + dim). On phones the
 * cards are compact — shot, title, category — so a whole card fits on screen
 * while it's pinned; the full write-up is one tap away.
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
        if (!next || reduced) {
          inner.style.transform = "";
          inner.style.filter = "";
          return;
        }
        const top = next.getBoundingClientRect().top;
        const stick = stickAt(i + 1, mq.matches);
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
    <div ref={listRef} className="wide:gap-[14vh] flex flex-col gap-[10vh]">
      {projects.map((p, i) => (
        <div
          key={p.slug}
          data-stack=""
          // Per-card sticky offsets (phone / desktop) and stacking order are
          // data-driven.
          style={{
            ["--stick-phone" as string]: `${stickAt(i, false)}px`,
            ["--stick-desktop" as string]: `${stickAt(i, true)}px`,
            zIndex: i + 1,
          }}
          className="wide:top-(--stick-desktop) wide:h-[min(78vh,700px)] sticky top-(--stick-phone) h-[min(72svh,560px)]"
        >
          <Link
            data-view=""
            href={projectHref(p.slug)}
            aria-label={`${p.title} — view case study`}
            // The project's hue tints the tile, tag and screen panel.
            style={tintStyle(p.hue, p.brand)}
            className="border-line bg-surface wide:grid wide:grid-cols-[1.3fr_1fr] wide:gap-2 group/card flex h-full origin-top flex-col gap-1.5 overflow-hidden rounded-[28px] border p-1.5 text-inherit no-underline shadow-[0_40px_80px_-50px_rgb(0_0_0/0.45)] transition-[border-color] duration-250"
          >
            {/* Screens, set into a rich panel of the project's colour. */}
            <ShotReel
              shots={projectShots(p)}
              alt={`${p.title} website`}
              hue={p.hue}
              brand={p.brand}
              tone="deep"
              sizes="(min-width: 980px) 56vw, 100vw"
              className="wide:min-h-0 relative min-h-0 flex-1 overflow-hidden rounded-[22px]"
            />

            {/* Details */}
            <div className="bg-paper-2 wide:p-[clamp(24px,2.6vw,44px)] flex shrink-0 flex-col rounded-[22px] p-5">
              {/* Identity: app tile, name and client, year. */}
              <div className="flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className="tint-tile wide:size-13 grid size-11 shrink-0 place-items-center rounded-[14px] text-[15px] font-bold tracking-[-0.04em]"
                >
                  {initials(p.short)}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="wide:text-[20px] truncate text-[17px] font-semibold tracking-[-0.02em]">
                    {p.short}
                  </span>
                  <span className="text-ink-2 truncate text-[14px]">
                    {p.client !== p.title ? p.client : `${pad2(i + 1)} of ${total}`}
                  </span>
                </span>
                <span className="text-ink-2 ml-auto shrink-0 self-start pt-1 text-[15px]">
                  {p.year}
                </span>
              </div>

              {/* Tag */}
              <span className="tint-ink wide:mt-7 mt-4 flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em]">
                <span className="size-1.5 rounded-full bg-current" />
                {p.category}
              </span>

              {/* Headline + pitch */}
              <h3 className="wide:text-[clamp(26px,2.4vw,40px)] mt-2.5 mb-0 text-[clamp(21px,5.6vw,28px)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
                {p.headline ?? p.title}
              </h3>
              <p className="text-ink-2 wide:line-clamp-4 mt-4 mb-0 hidden text-[16px] leading-[1.6] text-pretty">
                {p.summary}
              </p>
              <div className="wide:flex mt-5 hidden flex-wrap gap-1.5">
                {p.technologies.map((t) => (
                  <span
                    key={t}
                    className="border-line bg-surface rounded-full border px-2.5 py-1 text-[12px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer: real facts, and the way in. */}
              <div className="border-line wide:mt-auto wide:pt-6 mt-4 flex items-end justify-between gap-6 border-t pt-4">
                <div className="wide:flex hidden gap-[clamp(20px,3vw,48px)]">
                  {(p.highlights ?? []).map((h) => (
                    <div key={h.label} className="flex flex-col gap-1">
                      <span className="text-[clamp(26px,2.4vw,40px)] leading-none font-semibold tracking-[-0.04em]">
                        {h.value}
                      </span>
                      <span className="text-ink-2 text-[13px] leading-snug">{h.label}</span>
                    </div>
                  ))}
                </div>
                <span className="wide:hidden text-[15px] font-semibold">View case study</span>
                <span
                  aria-hidden="true"
                  className="bg-btn text-btn-ink wide:size-12 grid size-10 shrink-0 place-items-center rounded-full text-[18px] transition-transform duration-300 group-hover/card:translate-x-1"
                >
                  <Arrow dir="right" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
