"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** localStorage key — also read by the pre-paint script in layout.tsx. */
export const THEME_KEY = "gh-theme";

const read = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

// The pre-paint script already set the attribute, so the DOM is the source of
// truth; observing it keeps every toggle (nav pill + round button) in sync.
const subscribe = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

export function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  // Keeps shadcn primitives from @repo/ui (keyed on .dark) in step.
  root.classList.toggle("dark", t === "dark");
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {
    // Storage blocked — the theme still applies for this page view.
  }
}

export function useTheme() {
  // The pre-paint script applies the saved theme, but React's dev-only Strict
  // Mode remount resets <html> attributes — re-apply before paint. A no-op in
  // production, where the attribute is already correct.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") {
        if (read() !== saved || (saved === "dark") !== document.documentElement.classList.contains("dark")) {
          applyTheme(saved);
        }
      }
    } catch {
      // Storage blocked — keep whatever is on <html>.
    }
  }, []);

  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);
  const toggle = useCallback(() => applyTheme(read() === "dark" ? "light" : "dark"), []);
  return { theme, toggle };
}
