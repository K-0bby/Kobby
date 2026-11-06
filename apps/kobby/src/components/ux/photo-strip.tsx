"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@repo/ui";
import { prefersReducedMotion } from "@/lib/motion";

export interface StripPhoto {
  src: string;
  alt: string;
  caption: string;
  /** Resting tilt in degrees. */
  tilt: number;
}

const DESKTOP = "(min-width: 980px)";

/**
 * A row of tilted, framed prints.
 *
 * Desktop: the prints sit in a spaced row; hovering one straightens it and
 * lifts it forward while the rest settle back.
 *
 * Phones: the section pins to the screen and scrolling down slides the prints
 * sideways until the last one is in view, then the page carries on. With
 * reduced motion it falls back to a plain swipeable row.
 */
export default function PhotoStrip({ photos }: { photos: StripPhoto[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  // Scroll-driven sliding is opted into after mount, so the server render (and
  // reduced motion) is the plain swipeable row.
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const pin = track?.parentElement;
    if (!outer || !track || !pin || prefersReducedMotion()) return;

    const mq = window.matchMedia(DESKTOP);
    let distance = 0;
    let stickTop = 0;
    let raf = 0;
    let lastWidth = 0;

    const reset = () => {
      outer.style.height = "";
      pin.style.top = "";
      track.style.transform = "";
    };

    const measure = () => {
      if (mq.matches) {
        setPinned(false);
        reset();
        return;
      }
      setPinned(true);
      lastWidth = window.innerWidth;
      // How far the row must travel for its last print to land in view.
      distance = Math.max(0, track.scrollWidth - lastWidth);
      // Pin only the strip itself, centred on screen — no empty bands above
      // or below it. The section is the strip's height plus the sideways
      // travel, so each pixel scrolled down moves the row one pixel across.
      //
      // Centred against 100svh, the *small* viewport height, which stays put
      // while a phone's address bar slides in and out. innerHeight doesn't,
      // and using it made the space around the strip breathe mid-scroll.
      const stripH = track.offsetHeight;
      pin.style.top = `max(0px, calc((100svh - ${stripH}px) / 2))`;
      stickTop = parseFloat(getComputedStyle(pin).top) || 0;
      outer.style.height = `${stripH + distance}px`;
      update();
    };

    // The address bar changes only the height; re-measure on width changes.
    const onResize = () => {
      if (window.innerWidth !== lastWidth) measure();
    };

    const update = () => {
      raf = 0;
      if (mq.matches || !distance) return;
      const top = outer.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (stickTop - top) / distance));
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Measure once images have laid out, and whenever the screen changes.
    const first = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", measure);

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", measure);
      reset();
    };
  }, []);

  return (
    <div ref={outerRef} className="wide:mx-0 relative -mx-[clamp(20px,5vw,80px)]">
      <div
        className={cn(
          "wide:static wide:h-auto wide:overflow-visible",
          pinned ? "sticky overflow-hidden" : "overflow-x-auto scrollbar-none"
        )}
      >
        <ul
          ref={trackRef}
          className={cn(
            "group/strip wide:w-auto wide:justify-center wide:gap-[clamp(28px,3.5vw,56px)] wide:px-0 flex w-max list-none gap-6 px-[clamp(20px,5vw,80px)] py-8 will-change-transform",
            !pinned && "snap-x snap-mandatory"
          )}
        >
          {photos.map((p) => (
            <li
              key={p.src}
              // Tilt is per photo; the hover straightens it.
              style={{ ["--tilt" as string]: `${p.tilt}deg` }}
              className="ease-out-soft wide:group-hover/strip:opacity-80 wide:hover:opacity-100! relative shrink-0 rotate-(--tilt) snap-center transition-[rotate,translate,scale,opacity] duration-500 hover:z-10 hover:-translate-y-3 hover:scale-[1.05] hover:rotate-0"
            >
              {/* Phones: a hairline outline only — a drop shadow would be cut
                  off by the sliding row. Desktop keeps the soft shadow. */}
              <figure className="bg-surface wide:w-[clamp(220px,20vw,290px)] wide:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35),0_0_0_1px_rgb(0_0_0/0.05)] m-0 w-[min(72vw,300px)] rounded-[18px] p-1.5 shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
                <div className="bg-line relative aspect-4/5 overflow-hidden rounded-xl">
                  <Image src={p.src} alt={p.alt} fill sizes="300px" className="object-cover" />
                </div>
                <figcaption className="text-ink-3 px-1.5 pt-2.5 pb-1 font-mono text-[10px] tracking-[0.14em]">
                  {p.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
