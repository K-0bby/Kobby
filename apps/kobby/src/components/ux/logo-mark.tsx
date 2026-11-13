import { cn } from "@repo/ui";

/**
 * The round "GH" monogram, haloed by a thin signal-blue ring that breathes very
 * slowly — present enough to feel alive, quiet enough to go unnoticed.
 */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <span
      // Landing spot for the preloader's monogram as it flies into the nav.
      data-logo-mark=""
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full bg-mark text-[15px] font-black tracking-[-0.08em] text-[#FAFAF8] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)] transition-transform duration-250 ease-out",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-0.75 rounded-full border-[1.5px] border-signal motion-safe:animate-ring-breathe"
      />
      <span className="-translate-x-px">GH</span>
    </span>
  );
}
