"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import CopyEmailButton from "@/components/ux/copy-email-button";
import LocalTime from "@/components/ux/local-time";
import { useLenis } from "@/provider/lenis-provider";
import { contact, socials } from "@/data/data";
import { DURATION, EASE_OUT, prefersReducedMotion } from "@/lib/motion";
import Arrow from "@/components/ux/arrow";

/** Font size used to measure the outlined name before scaling it to fit. */
const MEASURE_PX = 100;

/**
 * Site-wide contact footer (#contact). Its outlined name is sized to exactly
 * fill the container width, and rises in the first time it scrolls into view.
 */
export default function Footer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const { lenis, scrollTo } = useLenis();

  useEffect(() => {
    const box = boxRef.current;
    const name = nameRef.current;
    if (!box || !name) return;

    const fit = () => {
      name.style.fontSize = `${MEASURE_PX}px`;
      const w = name.scrollWidth;
      if (w) name.style.fontSize = `${((MEASURE_PX * box.clientWidth) / w).toFixed(2)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);

    let io: IntersectionObserver | undefined;
    if (!prefersReducedMotion()) {
      io = new IntersectionObserver(
        ([e]) => {
          if (!e?.isIntersecting) return;
          io?.disconnect();
          name.animate(
            [
              { opacity: 0, transform: "translateY(40%)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: DURATION.name, easing: EASE_OUT, fill: "backwards" }
          );
        },
        { threshold: 0.2 }
      );
      io.observe(box);
    }

    return () => {
      window.removeEventListener("resize", fit);
      io?.disconnect();
    };
  }, []);

  const toTop = () => {
    if (lenis) scrollTo(0);
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="bg-foot text-[#F5F5F2] transition-colors duration-250"
    >
      <div className="mx-auto box-border max-w-360 px-[clamp(20px,5vw,80px)] pt-[clamp(96px,11vw,160px)] pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[13px] font-medium tracking-[0.2em]">
          <span className="text-[#8E8E96]">GET IN TOUCH</span>
          <span className="flex items-center gap-2.5 text-[#D6D6DA]">
            <span className="bg-signal size-2.25 rounded-full shadow-[0_0_0_4px_rgb(79_123_255/0.18)]" />
            AVAILABLE FOR WORK
          </span>
        </div>
        <div className="mt-10 mb-[clamp(56px,7vw,96px)] h-px bg-[#2E2E33]" />

        <h2
          id="contact-title"
          className="m-0 max-w-[12ch] text-[clamp(44px,6.4vw,104px)] leading-[.95] font-bold tracking-[-0.06em] text-balance"
        >
          Have something worth <span className="text-signal">building</span>?
        </h2>
        <p className="mt-7 max-w-125 text-[18px] leading-normal text-pretty text-[#A3A3AA]">
          I&apos;m always interested in thoughtful ideas, ambitious products, and meaningful
          collaborations.
        </p>

        <div className="mt-[clamp(48px,6vw,80px)] flex flex-wrap items-center justify-between gap-x-12 gap-y-7">
          <div className="flex min-w-0 flex-wrap items-center gap-4.5">
            <Link
              href={`mailto:${contact.email}`}
              className="hover:text-signal text-[clamp(24px,3.4vw,52px)] font-medium tracking-[-0.035em] wrap-anywhere text-[#F5F5F2] no-underline transition-colors duration-150"
            >
              {contact.email}
            </Link>
            <CopyEmailButton email={contact.email} />
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-signal flex items-center gap-1.5 font-mono text-[13px] font-medium tracking-[0.16em] text-[#D6D6DA] no-underline transition-[color,gap] duration-250 hover:gap-2.5"
              >
                {s.label}
                <Arrow dir="up-right" />
              </Link>
            ))}
          </div>
        </div>

        <div ref={boxRef} aria-hidden="true" className="mt-[clamp(72px,9vw,140px)] overflow-hidden">
          <div
            ref={nameRef}
            className="inline-block pr-[.02em] pb-[.06em] text-[12vw] leading-[.9] font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent transition-[-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1px_#44444B] hover:[-webkit-text-stroke-color:#4F7BFF]"
          >
            gideon hoenyefia
          </div>
        </div>
        <div className="mt-6 h-px bg-[#2E2E33]" />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 font-mono text-[13px] tracking-[0.12em] text-[#8E8E96]">
          <span>© {new Date().getFullYear()} gideon hoenyefia</span>
          <LocalTime />
          <button
            type="button"
            onClick={toTop}
            className="hover:text-signal flex cursor-pointer items-center gap-2 border-0 bg-transparent px-0 py-1.5 font-[inherit] tracking-[0.2em] text-[#D6D6DA] transition-[color,gap] duration-250 hover:gap-3"
          >
            BACK TO TOP <Arrow dir="up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
