"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useLenis } from "@/provider/lenis-provider";
import { EASE_OUT, PRELOADER, prefersReducedMotion } from "@/lib/motion";

/** Fired on window when the preloader has cleared; PageIntro waits for it. */
export const PRELOADED_EVENT = "gh:preloaded";

/** Set once the sequence has completed in this page load. */
let played = false;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Resolves when the page and its images have fully loaded. */
const pageLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

/**
 * The preloader. "GH" rises in, unfolds into "Gideon Hoenyefia", holds
 * while the page finishes loading, folds back to "GH", then flies up into
 * the nav's GH mark as the curtain lifts — introducing the logo as the name it
 * stands for.
 *
 * It plays on every full page load (open, refresh), not on in-site
 * navigation, and never under reduced motion. The overlay is server-rendered
 * and shown from the first frame by the pre-paint script's `.preloading`
 * class, so the page underneath is never visible until the sequence ends.
 * Escape skips it.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  // Hold page scroll while the curtain is down.
  useEffect(() => {
    if (!lenis || !document.documentElement.classList.contains("preloading")) return;
    lenis.stop();
    const release = () => lenis.start();
    window.addEventListener(PRELOADED_EVENT, release, { once: true });
    return () => window.removeEventListener(PRELOADED_EVENT, release);
  }, [lenis]);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const word = wordRef.current;
    if (!root || !word || played || prefersReducedMotion()) {
      html.classList.remove("preloading");
      return;
    }

    // React's dev-only Strict Mode remount strips <html> classes the
    // pre-paint script set — restore the hold before anything paints.
    html.classList.add("preloading", "intro-pending");

    const rests = Array.from(root.querySelectorAll<HTMLElement>("[data-rest]"));
    const anims: Animation[] = [];
    // Set when this run is torn down (unmount, Strict Mode's throwaway mount).
    // A disposed run must never lift the curtain — the next run owns it.
    let disposed = false;

    const play = (el: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
      const a = el.animate(frames, { fill: "both", ...opts });
      anims.push(a);
      return a.finished;
    };

    const finish = () => {
      if (disposed || played) return;
      played = true;
      html.classList.remove("preloading");
      window.dispatchEvent(new Event(PRELOADED_EVENT));
    };

    const run = async () => {
      // Measure against the real font, but never wait long for it.
      await Promise.race([document.fonts?.ready, wait(PRELOADER.fontWaitMs)]);
      if (disposed) return;
      const widths = rests.map((r) => r.scrollWidth);
      const open = (i: number) => `${widths[i]}px`;

      // 1 — "GH." rises in.
      await play(
        word,
        [
          { opacity: 0, transform: "translateY(24%)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: PRELOADER.enter, easing: EASE_OUT }
      );
      await wait(PRELOADER.beat);

      // 2 — unfold into the full name.
      await Promise.all(
        rests.map((r, i) =>
          play(
            r,
            // Letters fade in only once there's room for them.
            [
              { width: "0px", opacity: 0 },
              { opacity: 0, offset: 0.35 },
              { width: open(i), opacity: 1 },
            ],
            { duration: PRELOADER.unfold, easing: EASE_OUT, delay: i * PRELOADER.stagger }
          )
        )
      );

      // 3 — hold on the full name, and until the page has really loaded
      //     (capped, so a slow image can never trap the visitor).
      await Promise.all([
        wait(PRELOADER.hold),
        Promise.race([pageLoaded(), wait(PRELOADER.maxLoadWaitMs)]),
      ]);
      if (disposed) return;

      // 4 — fold back to the monogram.
      await Promise.all(
        rests.map((r, i) =>
          play(
            r,
            // Letters clear out first, then the gap closes.
            [
              { width: open(i), opacity: 1 },
              { opacity: 0, offset: 0.45 },
              { width: "0px", opacity: 0 },
            ],
            { duration: PRELOADER.fold, easing: PRELOADER.foldEase, delay: i * PRELOADER.stagger }
          )
        )
      );

      // 5 — the monogram flies into the nav mark while the curtain lifts.
      const from = word.getBoundingClientRect();
      const to = document.querySelector("[data-logo-mark]")?.getBoundingClientRect();
      const flight = to
        ? `translate(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${
            to.top + to.height / 2 - (from.top + from.height / 2)
          }px) scale(${(to.height * 0.5) / from.height})`
        : "translateY(-40%) scale(0.4)";

      await Promise.all([
        play(
          word,
          [
            { transform: "none", opacity: 1 },
            { transform: flight, opacity: 0 },
          ],
          { duration: PRELOADER.fly, easing: PRELOADER.foldEase }
        ),
        play(root, [{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }], {
          duration: PRELOADER.lift,
          easing: PRELOADER.foldEase,
          delay: PRELOADER.liftDelay,
        }),
      ]);
      finish();
    };

    // A cancelled animation rejects; only a live run may treat that as done.
    run().catch(() => finish());

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      anims.forEach((a) => a.finish());
      finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      window.removeEventListener("keydown", onKey);
      anims.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="preloader bg-paper fixed inset-0 z-100 items-center justify-center"
    >
      <div
        ref={wordRef}
        className="text-ink flex items-baseline text-[clamp(44px,9vw,150px)] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap opacity-0"
      >
        <span>G</span>
        <span data-rest="" className="inline-block w-0 overflow-hidden opacity-0">
          ideon&nbsp;
        </span>
        <span>H</span>
        <span data-rest="" className="inline-block w-0 overflow-hidden opacity-0">
          oenyefia
        </span>
        {/* <span className="text-signal">.</span> */}
      </div>
      <span className="text-ink-3 absolute bottom-[clamp(24px,5vh,48px)] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em]">
        ACCRA, GH
      </span>
    </div>
  );
}
