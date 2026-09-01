"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { cn } from "@repo/ui";
import { ACTION_BUTTON, ACTION_BUTTON_SUBTLE } from "@/lib/ui";
import { INTERNAL_NAV_KEY, PREV_PATH_KEY } from "@/provider/navigation-tracker";

/** Human names for the routes a visitor can return to. */
const ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "/projects": "Projects",
  "/blog": "Blog",
};

function labelForPath(path: string | null | undefined): string | null {
  if (!path) return null;
  if (ROUTE_LABELS[path]) return ROUTE_LABELS[path];
  if (path.startsWith("/projects/")) return "Project";
  return null;
}

/**
 * Whether the previous history entry belongs to this site.
 *
 * Read at click time: these browser APIs only exist on the client, and by the
 * time a click happens we are unambiguously there.
 */
function hasInSiteHistory(): boolean {
  if (window.history.length <= 1) return false;
  try {
    return sessionStorage.getItem(INTERNAL_NAV_KEY) === "1";
  } catch {
    return false;
  }
}

// sessionStorage has no change event worth subscribing to here — the value is
// written before this component mounts and doesn't change while it's on screen.
const NO_SUBSCRIPTION = () => () => {};

const readPreviousPath = () => {
  try {
    return sessionStorage.getItem(PREV_PATH_KEY);
  } catch {
    return null;
  }
};

// The server can't know where the visitor came from, so it renders the
// fallback label; useSyncExternalStore swaps in the real one after hydration
// without a mismatch.
const readPreviousPathOnServer = () => null;

interface BackButtonProps {
  /** Where to go when there is no in-site history to return to. */
  fallbackHref: string;
  /** Overrides the derived "Back to X" text. */
  label?: string;
  className?: string;
}

/**
 * Returns the visitor to the page they came from and says so by name, without
 * ever bouncing them off the site. Anyone who deep-linked straight in has no
 * in-site entry to return to, so they get fallbackHref instead.
 */
export default function BackButton({ fallbackHref, label, className }: BackButtonProps) {
  const router = useRouter();
  const previousPath = useSyncExternalStore(
    NO_SUBSCRIPTION,
    readPreviousPath,
    readPreviousPathOnServer
  );

  // Prefer where they actually came from; fall back to where the button will
  // send them if that's unknown.
  const destination = labelForPath(previousPath) ?? labelForPath(fallbackHref);
  const text = label ?? (destination ? `Back to ${destination}` : "Back");

  const handleClick = () => {
    if (hasInSiteHistory()) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(ACTION_BUTTON, ACTION_BUTTON_SUBTLE, className)}
    >
      <CaretLeft size={20} />
      <span>{text}</span>
    </button>
  );
}
