"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Set once the visitor has moved between pages within this site. */
export const INTERNAL_NAV_KEY = "kobby:internal-nav";

/** The pathname the visitor was on immediately before the current one. */
export const PREV_PATH_KEY = "kobby:prev-path";

/**
 * Records where the visitor came from, so BackButton can name its destination.
 *
 * document.referrer can't do this alone: App Router navigations use pushState,
 * which never updates it, so someone who arrives from Google and then clicks
 * through to a project still reports Google. That makes referrer unable to
 * distinguish "deep-linked straight here" (going back leaves the site) from
 * "browsed here from the homepage" (going back is exactly right).
 *
 * Session-scoped, so a new tab starts clean.
 */
export default function NavigationTracker() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);
  const isFirstRender = useRef(true);
  const isPopNavigation = useRef(false);

  // A popstate means the visitor moved through history rather than forward
  // into a new page. The entry we'd record would be the one they just left,
  // not the one behind them, so the recorded path is dropped instead.
  useEffect(() => {
    const onPopState = () => {
      isPopNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPath.current = pathname;

      // On a full page load the referrer *is* the previous page, and is
      // trustworthy as long as it's ours.
      try {
        const referrer = document.referrer;
        if (referrer) {
          const url = new URL(referrer);
          if (url.origin === window.location.origin) {
            sessionStorage.setItem(PREV_PATH_KEY, url.pathname);
            sessionStorage.setItem(INTERNAL_NAV_KEY, "1");
          }
        }
      } catch {
        // No referrer, malformed, or storage blocked — treat as a cold entry.
      }
      return;
    }

    try {
      if (isPopNavigation.current) {
        // Direction is unknown after a back/forward, so claiming a destination
        // would risk naming the wrong one. BackButton falls back to its href.
        sessionStorage.removeItem(PREV_PATH_KEY);
      } else if (previousPath.current) {
        sessionStorage.setItem(PREV_PATH_KEY, previousPath.current);
      }
      sessionStorage.setItem(INTERNAL_NAV_KEY, "1");
    } catch {
      // Private mode or blocked storage — BackButton falls back to its href.
    }

    isPopNavigation.current = false;
    previousPath.current = pathname;
  }, [pathname]);

  return null;
}
