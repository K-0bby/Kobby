import Link from "next/link";
import ShotReel from "@/components/ux/shot-reel";
import type { Project } from "@/types/project";
import { projectHref, projectShots } from "@/data/data";
import { tintStyle } from "@/lib/tint";

/**
 * A project in the home page's Recent work grid: its screens playing in a rich
 * panel of the project's colour, with the name and its status underneath —
 * "In progress" for live work, otherwise the year it shipped.
 */
export default function WebsiteCard({ project: p }: { project: Project }) {
  const inProgress = p.status === "in-progress";
  return (
    <Link
      data-reveal=""
      data-view=""
      href={projectHref(p.slug)}
      aria-label={`${p.title} — view case study`}
      style={tintStyle(p.hue, p.brand)}
      className="group/site flex flex-col gap-4 text-inherit no-underline"
    >
      <ShotReel
        shots={projectShots(p)}
        alt={`${p.title} website`}
        hue={p.hue}
        brand={p.brand}
        tone="deep"
        sizes="(min-width: 980px) 46vw, 100vw"
        className="ease-out-soft relative aspect-4/3 overflow-hidden rounded-[22px] transition-transform duration-600 group-hover/site:scale-[.985]"
      />
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="m-0 text-[clamp(19px,1.6vw,24px)] font-semibold tracking-[-0.02em]">
          {p.title}
        </h3>
        <span
          className={`flex shrink-0 items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em] ${inProgress ? "tint-ink" : "text-ink-3"}`}
        >
          {inProgress && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
          {inProgress ? "IN PROGRESS" : p.year}
        </span>
      </div>
    </Link>
  );
}
