import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/ssr";
import { cn } from "@repo/ui";

const ICONS = {
  right: ArrowRightIcon,
  left: ArrowLeftIcon,
  up: ArrowUpIcon,
  down: ArrowDownIcon,
  "up-right": ArrowUpRightIcon,
} as const;

/**
 * The site's arrow: a Phosphor icon sized to the text around it (1em) and
 * nudged onto the baseline, so it reads like a glyph in the sentence.
 * Decorative — the link or button it sits in carries the meaning.
 */
export default function Arrow({
  dir,
  className,
  weight = "bold",
}: {
  dir: keyof typeof ICONS;
  className?: string;
  weight?: "regular" | "bold";
}) {
  const Icon = ICONS[dir];
  return (
    <Icon
      aria-hidden="true"
      size="1em"
      weight={weight}
      className={cn("inline-block shrink-0 translate-y-[0.06em]", className)}
    />
  );
}
