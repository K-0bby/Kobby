"use client";

import { useLayoutEffect } from "react";
import { DURATION, EASE_OUT, FADE_RISE, prefersReducedMotion } from "@/lib/motion";
import { PRELOADED_EVENT } from "@/components/ux/preloader";

interface PageIntroProps {
  /** Delay before the first [data-line] rises, and the stagger between lines (ms). */
  lineDelay: number;
  lineStep?: number;
  /** Delay before the first [data-fade] fades up, and its stagger (ms). */
  fadeDelay: number;
  fadeStep?: number;
  /** Home only: rise the giant name and fade the badge layer in. */
  hero?: boolean;
}

const NAME_DELAY = 200;
const BADGE_DELAY = 250;
/** The giant name rests via its CSS `translate`; this extra drop is animated on top. */
const NAME_START = "translateY(0.23em)";
const NAME_REST = "none";

/**
 * Entrance choreography for a page's opening copy: masked headline lines rise,
 * supporting copy fades up in sequence. Runs before paint and then releases
 * the `intro-pending` hold the pre-paint script set on <html>.
 */
export default function PageIntro({
  lineDelay,
  lineStep = 0,
  fadeDelay,
  fadeStep = 90,
  hero = false,
}: PageIntroProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("intro-pending");
      return;
    }

    const anims: Animation[] = [];

    const start = () => {
    const main = document.querySelector("main");

    main?.querySelectorAll<HTMLElement>("[data-line]").forEach((el, i) => {
      anims.push(
        el.animate([{ transform: "translateY(105%)" }, { transform: "none" }], {
          duration: DURATION.line,
          delay: lineDelay + i * lineStep,
          easing: EASE_OUT,
          fill: "backwards",
        })
      );
    });

    main?.querySelectorAll<HTMLElement>("[data-fade]").forEach((el, i) => {
      anims.push(
        el.animate(
          [
            { opacity: 0, transform: `translateY(${FADE_RISE}px)` },
            { opacity: 1, transform: "none" },
          ],
          { duration: DURATION.fade, delay: fadeDelay + i * fadeStep, easing: EASE_OUT, fill: "backwards" }
        )
      );
    });

    if (hero) {
      // Desktop and phone each have their own name block; animate whichever shows.
      main?.querySelectorAll<HTMLElement>("[data-name] > div").forEach((name) => {
        anims.push(
          name.animate(
            [
              { opacity: 0, transform: NAME_START },
              { opacity: 1, transform: NAME_REST },
            ],
            { duration: DURATION.name, delay: NAME_DELAY, easing: EASE_OUT, fill: "backwards" }
          )
        );
      });
      const badge = document.querySelector<HTMLElement>("[data-badge-layer]");
      if (badge) {
        anims.push(
          badge.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: DURATION.badgeFade,
            delay: BADGE_DELAY,
            fill: "backwards",
          })
        );
      }
    }

    // The animations' backwards fill now holds the start pose.
    root.classList.remove("intro-pending");
    };

    // On a first visit the preloader is still up: play the entrance the
    // moment its curtain lifts, not unseen behind it.
    if (root.classList.contains("preloading")) {
      window.addEventListener(PRELOADED_EVENT, start, { once: true });
      return () => {
        window.removeEventListener(PRELOADED_EVENT, start);
        anims.forEach((a) => a.cancel());
      };
    }

    start();
    return () => anims.forEach((a) => a.cancel());
  }, [lineDelay, lineStep, fadeDelay, fadeStep, hero]);

  return null;
}
