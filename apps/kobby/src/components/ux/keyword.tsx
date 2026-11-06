import { cn } from "@repo/ui";

/** Each keyword's icon has its own small personality on hover. */
// Written out in full so Tailwind can see every class at build time.
const MOTIONS = {
  bounce: "motion-safe:group-hover/kw:animate-kw-bounce",
  spin: "motion-safe:group-hover/kw:animate-kw-spin",
  wiggle: "motion-safe:group-hover/kw:animate-kw-wiggle",
  pop: "motion-safe:group-hover/kw:animate-kw-pop",
  flip: "motion-safe:group-hover/kw:animate-kw-flip",
} as const;

interface KeywordProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  motion: keyof typeof MOTIONS;
  /**
   * Punctuation that follows the keyword (",", "."). Kept inside the
   * unbreakable group so it never wraps onto a line of its own.
   */
  trail?: string;
}

/**
 * An inline highlighted word in running copy, paired with a small blue icon.
 * On hover the icon plays its motion and a blue underline draws in beneath
 * the word. Motion is skipped for reduced-motion users.
 */
export default function Keyword({ children, icon, motion, trail }: KeywordProps) {
  return (
    <span className="group/kw inline-flex items-baseline gap-1 whitespace-nowrap">
      <span className="bg-[linear-gradient(var(--color-signal),var(--color-signal))] bg-size-[0%_1.5px] bg-bottom-left bg-no-repeat font-semibold text-ink transition-[background-size] duration-400 ease-out-soft group-hover/kw:bg-size-[100%_1.5px]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "inline-grid size-[1.05em] translate-y-[0.12em] place-items-center self-center text-signal",
          MOTIONS[motion]
        )}
      >
        {icon}
      </span>
      {trail && <span className="-ml-0.5">{trail}</span>}
    </span>
  );
}
