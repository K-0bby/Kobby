import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/ux/page-intro";
import CaseStudyCard from "@/components/projects/case-study-card";
import OtherWorkCard from "@/components/projects/other-work-card";
import {
  featuredProjects,
  otherProjects,
  pad2,
  projectHref,
  projects,
  stackLine,
} from "@/data/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and selected work by Gideon Hoenyefia, full-stack engineer.",
  alternates: { canonical: "/projects" },
};

const SECTION = "mx-auto box-border max-w-360 px-[clamp(20px,5vw,80px)]";

export default function ProjectsPage() {
  return (
    <main>
      <PageIntro lineDelay={80} lineStep={90} fadeDelay={380} />

      {/* ------------------------------------------------------- Intro + index */}
      <section
        aria-labelledby="pj-title"
        className={`${SECTION} pt-[clamp(150px,20vh,220px)] pb-[clamp(64px,8vw,112px)]`}
      >
        <span data-fade="" className="eyebrow mb-8 block">
          PROJECTS / {pad2(projects.length)}
        </span>
        <h1
          id="pj-title"
          aria-label="Projects I've built, and how they came together."
          className="m-0 text-[clamp(44px,7vw,120px)] leading-[.95] font-bold tracking-[-0.06em]"
        >
          {["Projects I've built,", "and how they came together."].map((line) => (
            <span
              key={line}
              aria-hidden="true"
              className="mb-[-0.06em] block overflow-hidden pb-[.06em]"
            >
              <span data-line="" className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-fade=""
          className="text-ink-2 mt-8 mb-0 max-w-135 text-[clamp(17px,1.35vw,20px)] leading-normal text-pretty"
        >
          Platforms, directories, and websites built end to end, from data models through to the
          interfaces people use.
        </p>

        <div data-fade="" className="border-ink mt-[clamp(56px,7vw,96px)] border-t">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              data-view=""
              href={projectHref(p.slug)}
              className="border-line ease-out-soft flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b py-5 text-inherit no-underline transition-[padding,background-color] duration-350 hover:pl-4"
            >
              <span className="text-ink-3 flex-[0_0_40px] font-mono text-xs">{pad2(i + 1)}</span>
              <span className="flex-[1_1_240px] text-[clamp(20px,1.8vw,26px)] font-semibold tracking-[-0.03em]">
                {p.short}
              </span>
              <span className="text-ink-2 flex-[0_1_200px] font-mono text-[11px] font-medium tracking-[0.14em]">
                {p.category}
              </span>
              <span className="text-ink-3 flex-[2_1_320px] font-mono text-xs leading-[1.7] tracking-[0.08em]">
                {stackLine(p)}
              </span>
              <span aria-hidden="true" className="flex-none text-lg">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- Case studies */}
      <section aria-labelledby="cs-title" className={`${SECTION} pb-[clamp(96px,11vw,160px)]`}>
        <div data-reveal="" className="mb-8 flex items-center justify-between gap-4">
          <h2 id="cs-title" className="eyebrow m-0">
            01 / CASE STUDIES
          </h2>
          <span className="eyebrow">{pad2(featuredProjects.length)} PROJECTS</span>
        </div>
        <div className="flex flex-col gap-6">
          {featuredProjects.map((p, i) => (
            <CaseStudyCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Other work */}
      <section aria-labelledby="ow-title" className={`${SECTION} pb-[clamp(96px,11vw,160px)]`}>
        <div data-reveal="" className="mb-8 flex items-center justify-between gap-4">
          <h2 id="ow-title" className="eyebrow m-0">
            02 / OTHER WORK
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-6 gap-y-12">
          {otherProjects.map((p) => (
            <OtherWorkCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
