"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { cn } from "@repo/ui";
import { contact, socials } from "@/data/data";
import Arrow from "@/components/ux/arrow";

/** Icon for each social, keyed by its label in data.ts. */
const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: "fill" }>> = {
  X: XLogoIcon,
  LINKEDIN: LinkedinLogoIcon,
  GITHUB: GithubLogoIcon,
  WHATSAPP: WhatsappLogoIcon,
};

/** Display order, left to right, with email last. */
const ORDER = ["X", "LINKEDIN", "GITHUB", "WHATSAPP"];

/** Each icon's resting lift (px) and lean (deg) — a loose, hand-set wave. */
const WAVE = [
  { y: 0, r: -6 },
  { y: 5, r: 3 },
  { y: 9, r: -2 },
  { y: 5, r: 4 },
  { y: -1, r: -4 },
];

/** Grace period (ms) so the pointer can travel from the label onto the icons. */
const CLOSE_DELAY = 160;
/** Spring for each icon popping out, and the stagger between them (s). */
const POP = { type: "spring", stiffness: 520, damping: 26, mass: 0.7 } as const;
const STAGGER = 0.045;

/**
 * "Let's Connect": hover it (or focus it with the keyboard) and a row of
 * social icons pops out beneath in a staggered wave. On touch, a tap toggles
 * the row; tapping anywhere else closes it.
 */
export default function ConnectReveal({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduce = useReducedMotion();
  const listId = useId();

  const links = [
    ...ORDER.map((label) => socials.find((s) => s.label === label)).filter(
      (s): s is (typeof socials)[number] => !!s
    ),
    { label: "EMAIL", href: `mailto:${contact.email}` },
  ];

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  // Close on an outside tap/click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-flex", className)}
      // Mouse hover opens; touch is handled by the tap below so a tap doesn't
      // open and immediately close.
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hideSoon();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-full border-0 bg-transparent px-0 py-1 text-[15px] font-medium transition-colors duration-200",
          open ? "text-ink" : "text-ink-2 hover:text-ink"
        )}
      >
        Let&apos;s Connect
        <motion.span
          aria-hidden="true"
          className="inline-block"
          animate={reduce ? undefined : { rotate: open ? 45 : 0 }}
          transition={POP}
        >
          <Arrow dir="up-right" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            aria-label="Social links"
            // Centred under the label.
            className="absolute top-full left-1/2 z-10 m-0 flex -translate-x-1/2 list-none gap-2 p-0 pt-3"
            initial="hidden"
            animate="shown"
            exit="hidden"
            variants={{
              shown: { transition: { staggerChildren: STAGGER } },
              hidden: { transition: { staggerChildren: STAGGER * 0.6, staggerDirection: -1 } },
            }}
          >
            {links.map((s, i) => {
              const Icon = ICONS[s.label] ?? EnvelopeSimpleIcon;
              const wave = WAVE[i % WAVE.length]!;
              const external = !s.href.startsWith("mailto:");
              return (
                <motion.li
                  key={s.label}
                  variants={{
                    hidden: reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: -10, scale: 0.4, rotate: wave.r * 3 },
                    shown: reduce
                      ? { opacity: 1 }
                      : { opacity: 1, y: wave.y, scale: 1, rotate: wave.r },
                  }}
                  transition={POP}
                >
                  <Link
                    href={s.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={s.label === "EMAIL" ? `Email ${contact.email}` : s.label.charAt(0) + s.label.slice(1).toLowerCase()}
                    // Close the row once a destination is chosen.
                    onClick={() => setOpen(false)}
                    // Hover (mouse) and press (touch) get the same reaction:
                    // the icon darkens and grows; a press also dips slightly.
                    className="bg-paper-2 text-ink-2 hover:bg-ink hover:text-paper active:bg-ink active:text-paper flex size-10 items-center justify-center rounded-full no-underline shadow-[0_6px_16px_-10px_rgb(0_0_0/0.4)] transition-[background-color,color,scale] duration-200 [-webkit-tap-highlight-color:transparent] hover:scale-110 active:scale-95"
                  >
                    <Icon size={18} weight="fill" />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
