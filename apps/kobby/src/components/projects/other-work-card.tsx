import Link from "next/link";
import ShotReel from "@/components/ux/shot-reel";
import type { Project } from "@/types/project";
import { projectHref, projectShots, stackLine } from "@/data/data";

/** Compact screenshot card for the "Other work" grid on /projects. */
export default function OtherWorkCard({ project: p }: { project: Project }) {
  return (
    <Link
      data-reveal=""
      data-view=""
      href={projectHref(p.slug)}
      className="flex flex-col gap-4.5 text-inherit no-underline"
    >
      <ShotReel
        shots={projectShots(p)}
        alt={`${p.title} website`}
        hue={p.hue}
        sizes="(min-width: 980px) 33vw, 100vw"
        className="relative aspect-16/10 overflow-hidden rounded-3xl transition-transform duration-600 ease-out-soft hover:scale-[.985]"
      />
      <div className="flex flex-col items-start gap-3">
        <span className="chip">{p.category}</span>
        <h3 className="m-0 text-[clamp(24px,2.2vw,32px)] leading-[1.05] font-bold tracking-[-0.04em] text-balance">
          {p.title}
        </h3>
      </div>
      <p className="m-0 text-base leading-[1.55] text-pretty text-ink-2">{p.summary}</p>
      <span className="font-mono text-xs leading-[1.7] tracking-[0.08em] text-ink-3">
        {stackLine(p)}
      </span>
    </Link>
  );
}
