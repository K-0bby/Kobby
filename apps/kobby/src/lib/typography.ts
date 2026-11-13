/**
 * Section header system, shared across pages: a one-line heading with a small
 * superscript count, and a short grey intro line on the right, sitting on the
 * heading's baseline.
 *
 * Text sizes follow two fixed steps: 18px for intro lines (LEDE), 16px for
 * reading text.
 */

/** Header row: heading left, intro line right; stacks on phones. */
export const SECTION_HEAD =
  "mb-[clamp(32px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-x-12 gap-y-6";

/** One-line section heading. */
export const H2 =
  "wide:text-[clamp(56px,6vw,104px)] m-0 flex items-start gap-[0.12em] text-[10.5vw] leading-[.9] font-bold tracking-[-0.06em] whitespace-nowrap";

/** The small count set high beside a heading, e.g. (04). */
export const H2_COUNT =
  "text-ink-2 mt-[0.05em] text-[clamp(14px,1.4vw,20px)] font-medium tracking-normal";

/** Intro line beside a heading — the 18px lead size. */
export const LEDE =
  "text-ink-2 wide:justify-self-end m-0 max-w-95 text-[18px] leading-normal text-pretty";
