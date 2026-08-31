/**
 * Shared control rhythm.
 *
 * Every inline action on the site (card CTAs, nav actions, project paging)
 * uses one padding and radius so buttons don't drift per-page. Compose with
 * cn() and add only the colour variant at the call site:
 *
 *   <Button className={cn(ACTION_BUTTON, ACTION_BUTTON_SUBTLE)}>
 *
 * h-auto is load-bearing: the shadcn Base UI Button sizes itself with a fixed
 * height (h-8 by default), which wins over py-* and leaves the button its
 * original height no matter what vertical padding is set here.
 */
export const ACTION_BUTTON =
  "inline-flex h-auto cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors duration-200 sm:text-base";

/** Dark, high-emphasis action. */
export const ACTION_BUTTON_PRIMARY =
  "bg-black text-[#f5f5f5] hover:bg-gray-800";

/** Quiet action that darkens on hover — the project card CTA. */
export const ACTION_BUTTON_SUBTLE =
  "bg-gray-100 text-gray-700 hover:bg-black hover:text-white";

/** Bordered action used for paging between projects. */
export const ACTION_BUTTON_OUTLINE =
  "border-2 border-gray-200 bg-[#f9f5f5] text-gray-800 hover:bg-[#333]/30 hover:text-white";
