"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { cn } from "@repo/ui";
import LogoMark from "@/components/ux/logo-mark";
import ThemeIcon from "@/components/ux/theme-icon";
import { useTheme } from "@/hooks/use-theme";
import { useLenis } from "@/provider/lenis-provider";
import { RESUME_URL } from "@/data/data";
import { EASE_OUT_BEZIER, NAV_MOTION, PILL_SPRING } from "@/lib/motion";

/** Scroll distance (px) after which the pill lifts with a deeper shadow. */
const SCROLLED_AT = 24;
/**
 * Home sections the nav tracks, and which link each one lights up. "Selected
 * work" deliberately lights nothing: Projects has its own page, so the link
 * is only active there, never mid-scroll on home.
 */
const HOME_SECTIONS: Record<string, string> = {
  top: "",
  work: "",
  about: "about",
  capabilities: "about",
  process: "about",
  contact: "contact",
};

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { theme, toggle } = useTheme();
  const { lenis } = useLenis();
  const reduce = useReducedMotion();
  const dark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState("");
  // The menu remembers the route it was opened on, so navigating anywhere
  // closes it without an effect.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const closeMenu = () => setMenuPath(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Pick up a restored scroll position on reload.
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: freeze page scroll, focus the first item, and let
  // Escape close it and hand focus back to the Menu button.
  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuPath(null);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, lenis]);

  // On home, light up whichever section crosses the middle of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(HOME_SECTIONS[e.target.id] ?? "");
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(HOME_SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onHome]);

  const active = onHome ? section : pathname.startsWith("/projects") ? "projects" : "";
  const home = onHome ? "" : "/";
  const resume = RESUME_URL || "#contact";

  const links = [
    { id: "about", label: "About", href: `${home}#about` },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];
  const mobileLinks = [
    { label: "Home", href: onHome ? "#top" : "/", n: "00" },
    ...links.map((l, i) => ({ label: l.label, href: l.href, n: `0${i + 1}` })),
    { label: "Resume", href: resume, n: "04" },
  ];

  const shadow = scrolled
    ? "shadow-[0_12px_30px_-12px_rgb(0_0_0/0.22)]"
    : "shadow-[0_2px_10px_-4px_rgb(0_0_0/0.08)]";
  const themeLabel = dark ? "Switch to light mode" : "Switch to dark mode";
  const enter = reduce
    ? undefined
    : {
        initial: { opacity: 0, y: -24 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: NAV_MOTION.enter,
          delay: NAV_MOTION.enterDelay,
          ease: EASE_OUT_BEZIER,
        },
      };

  return (
    <>
      <motion.header
        {...enter}
        className="pointer-events-none fixed inset-x-0 top-4.5 z-50 flex items-center justify-center gap-2.5 px-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "border-line bg-nav pointer-events-auto flex h-15 items-center gap-1 rounded-full border px-1.5 backdrop-blur-md transition-[box-shadow,background-color,border-color] duration-250",
            shadow
          )}
        >
          <Link
            href={onHome ? "#top" : "/"}
            aria-label="Gideon Hoenyefia — home"
            className="group mr-1.5 flex no-underline"
          >
            <LogoMark className="group-hover:-rotate-8" />
          </Link>

          {/* Wide: links + Resume. The active pill slides between links. */}
          <LayoutGroup id="nav">
            <div className="nav:flex hidden items-center gap-1">
              {links.map((l) => {
                const on = active === l.id;
                return (
                  <Link
                    key={l.id}
                    href={l.href}
                    aria-current={on ? "page" : undefined}
                    className="text-ink hover:bg-paper-2 relative rounded-full px-4.5 py-2.75 text-base font-medium no-underline transition-colors duration-150"
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        className="bg-paper-2 absolute inset-0 rounded-full"
                        transition={reduce ? { duration: 0 } : PILL_SPRING}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                );
              })}
              <Link
                href={resume}
                className="group/resume bg-btn text-btn-ink hover:text-btn-ink ml-1.5 flex h-12 items-center gap-2 overflow-hidden rounded-full px-5.5 text-base font-semibold no-underline transition-[opacity,gap] duration-250 hover:gap-3 hover:opacity-90"
              >
                Resume
                <span
                  aria-hidden="true"
                  className="-mr-1 inline-block w-0 -translate-x-2 opacity-0 transition-[width,translate,opacity] duration-250 group-hover/resume:w-3 group-hover/resume:translate-x-0 group-hover/resume:opacity-100"
                >
                  ↗
                </span>
              </Link>
            </div>
          </LayoutGroup>

          {/* Compact: theme + Menu inside the pill */}
          <div className="nav:hidden flex items-center gap-1">
            <button
              type="button"
              onClick={toggle}
              aria-label={themeLabel}
              className="text-ink hover:bg-paper-2 flex size-11.5 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent transition-colors"
            >
              <ThemeIcon dark={dark} />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuPath(menuOpen ? null : pathname)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="bg-btn text-btn-ink relative h-11.5 min-w-20 cursor-pointer overflow-hidden rounded-full border-0 px-4.5 text-[15px] font-semibold"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  className="block"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: NAV_MOTION.icon, ease: EASE_OUT_BEZIER }}
                >
                  {menuOpen ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Wide: standalone round theme toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={themeLabel}
          className={cn(
            "border-line bg-nav text-ink nav:flex pointer-events-auto hidden size-15 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-[background-color,border-color,box-shadow,rotate] duration-250 hover:-rotate-14",
            shadow
          )}
        >
          <ThemeIcon dark={dark} />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={closeMenu}
              className="nav:hidden fixed inset-0 z-48 bg-black/25 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: NAV_MOTION.menu }}
            />
            <motion.div
              key="menu"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="border-line bg-surface nav:hidden fixed top-22.5 right-4 left-4 z-49 flex origin-top flex-col rounded-[28px] border p-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.25)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: NAV_MOTION.menu, ease: EASE_OUT_BEZIER }}
            >
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: NAV_MOTION.menu,
                    delay: 0.05 + i * NAV_MOTION.menuItemStagger,
                    ease: EASE_OUT_BEZIER,
                  }}
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={l.href}
                    onClick={closeMenu}
                    aria-current={
                      (l.label === "Projects" && active === "projects") ||
                      (l.label === "Home" && onHome)
                        ? "page"
                        : undefined
                    }
                    className="group hover:bg-paper-2 aria-[current=page]:bg-paper-2 flex items-center justify-between rounded-[18px] px-4 py-3.5 text-[32px] font-bold tracking-[-0.04em] no-underline transition-colors"
                  >
                    <span className="transition-transform duration-250 group-hover:translate-x-1">
                      {l.label}
                    </span>
                    <span className="text-ink-3 font-mono text-xs font-normal">{l.n}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="border-line text-ink-3 mt-2 flex items-center justify-between gap-3 border-t px-4 pt-4 pb-2 font-mono text-[11px] tracking-[0.16em]">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#22B35E] shadow-[0_0_0_3px_rgb(34_179_94/0.18)]" />
                  AVAILABLE FOR WORK
                </span>
                <span>ACCRA, GH</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
