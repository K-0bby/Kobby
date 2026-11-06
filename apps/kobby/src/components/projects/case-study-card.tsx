import Link from "next/link";
import ShotReel from "@/components/ux/shot-reel";
import type { Project } from "@/types/project";
import { pad2, projectHref, projectShots } from "@/data/data";

/** Large split card used in the /projects case-study list. */
export default function CaseStudyCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <Link
      data-reveal=""
      data-view=""
      href={projectHref(p.slug)}
      aria-label={`${p.title} — read case study`}
      className="border-line bg-surface ease-out-soft hover:border-ink grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] overflow-hidden rounded-[20px] border text-inherit no-underline transition-[border-color,transform] duration-500"
    >
      <ShotReel
        shots={projectShots(p)}
        alt={`${p.title} website`}
        hue={p.hue}
        sizes="(min-width: 980px) 50vw, 100vw"
        className="relative min-h-[clamp(260px,32vw,440px)]"
      />
      <div className="flex flex-col gap-4 p-[clamp(24px,3vw,48px)]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-ink-3 font-mono text-xs font-medium tracking-[0.14em]">
            {pad2(index + 1)}
          </span>
          <span className="chip">{p.category}</span>
        </div>
        <h3 className="mt-auto mb-0 text-[clamp(28px,3vw,46px)] leading-none font-bold tracking-tighter text-balance">
          {p.title}
        </h3>
        <p className="text-ink-2 m-0 text-base leading-[1.55] text-pretty">{p.summary}</p>
        <div className="flex flex-wrap gap-2">
          {p.technologies.map((t) => (
            <span
              key={t}
              className="border-line bg-paper rounded-full border px-3 py-1.5 text-[13px] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="border-ink mt-1.5 flex items-center gap-2.5 self-start border-b-[1.5px] pb-0.75 text-base font-semibold">
          Read case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
