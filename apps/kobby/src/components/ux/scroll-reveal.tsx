"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { DURATION, EASE_OUT, REVEAL_RISE, prefersReducedMotion } from "@/lib/motion";

/** Trigger slightly before the element's top clears the bottom edge. */
const ROOT_MARGIN = "0px 0px -8% 0px";

/**
 * Fades + lifts every [data-reveal] element as it scrolls into view. Mounted
 * once in the root layout and re-armed on each route change.
 *
 * Only elements that start below the fold are hidden, and hiding happens in a
 * layout effect (before paint), so nothing already on screen ever blinks.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const pending = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          pending.delete(el);
          el.style.opacity = "";
          el.animate(
            [
              { opacity: 0, transform: `translateY(${REVEAL_RISE}px)` },
              { opacity: 1, transform: "none" },
            ],
            { duration: DURATION.reveal, easing: EASE_OUT, fill: "backwards" }
          );
        }
      },
      { rootMargin: ROOT_MARGIN }
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-rv])").forEach((el) => {
      el.setAttribute("data-rv", "");
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.style.opacity = "0";
        pending.add(el);
        io.observe(el);
      }
    });

    return () => {
      io.disconnect();
      // Anything still waiting is restored and un-marked, so a re-run (route
      // change, Strict Mode double-invoke) never strands it invisible.
      pending.forEach((el) => {
        el.style.opacity = "";
        el.removeAttribute("data-rv");
      });
    };
  }, [pathname]);

  return null;
}
