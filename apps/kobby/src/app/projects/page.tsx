import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/ux/page-intro";
import StackedProjects from "@/components/projects/stacked-projects";
import Arrow from "@/components/ux/arrow";
import { featuredProjects, pad2, projectHref, projects, stackLine } from "@/data/data";
import { H2, H2_COUNT, LEDE, SECTION_HEAD } from "@/lib/typography";
import { tintStyle } from "@/lib/tint";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and selected work by Gideon Hoenyefia, full-stack engineer.",
  alternates: { canonical: "/projects" },
};

const SECTION = "mx-auto box-border max-w-360 px-[clamp(20px,5vw,80px)]";

/**
 * Projects, in three beats: the intro, the case studies (the strongest,
 * most visual work, as the same card deck as the home page), then the full
 * index of everything for scanning.
 */
export default function ProjectsPage() {
  return (
    <main>
      <PageIntro lineDelay={80} lineStep={90} fadeDelay={380} />

      {/* --------------------------------------------------------------- Intro */}
      <section
        aria-labelledby="pj-title"
        className={`${SECTION} pt-[clamp(150px,20vh,220px)] pb-[clamp(64px,8vw,112px)]`}
      >
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
          className="text-ink-2 mt-8 mb-0 max-w-135 text-[18px] leading-normal text-pretty"
        >
          Platforms, directories, and websites built end to end, from the interface to the data
          models underneath.
        </p>
      </section>

      {/* -------------------------------------------------------- Case studies */}
      <section aria-labelledby="cs-title" className={`${SECTION} pb-[clamp(96px,11vw,160px)]`}>
        <div data-reveal="" className={SECTION_HEAD}>
          <h2 id="cs-title" className={H2}>
            Case studies
            <span className={H2_COUNT}>({pad2(featuredProjects.length)})</span>
          </h2>
          <p className={LEDE}>
            The work I&apos;d show first: what each project solved, how it&apos;s built, and a
            walk through the screens.
          </p>
        </div>
        <StackedProjects projects={featuredProjects} />
      </section>

      {/* -------------------------------------------------------- All projects */}
      <section aria-labelledby="all-title" className={`${SECTION} pb-[clamp(96px,11vw,160px)]`}>
        <div data-reveal="" className={SECTION_HEAD}>
          <h2 id="all-title" className={H2}>
            All projects
            <span className={H2_COUNT}>({pad2(projects.length)})</span>
          </h2>
          <p className={LEDE}>Everything I&apos;ve built, at a glance. Open any one for the full story.</p>
        </div>

        <div data-reveal="" className="border-ink border-t">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              data-view=""
              href={projectHref(p.slug)}
              className="border-line ease-out-soft wide:flex wide:flex-wrap wide:gap-x-8 wide:py-5 wide:hover:pl-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-2 border-b py-4 text-inherit no-underline transition-[padding,background-color] duration-350"
            >
              <span className="text-ink-3 wide:flex-[0_0_40px] col-start-1 row-start-1 font-mono text-xs">
                {pad2(i + 1)}
              </span>
              <span className="wide:flex-[1_1_240px] col-start-2 row-start-1 min-w-0 text-[clamp(20px,1.8vw,26px)] font-semibold tracking-[-0.03em]">
                {p.short}
                {p.status === "in-progress" && (
                  <span className="tint-ink ml-3 align-middle font-mono text-[10px] font-medium tracking-[0.16em]" style={tintStyle(p.hue, p.brand)}>
                    ● IN PROGRESS
                  </span>
                )}
              </span>
              <span className="text-ink-2 wide:flex-[0_1_200px] col-span-2 col-start-2 row-start-2 font-mono text-[11px] font-medium tracking-[0.14em]">
                {p.category}
              </span>
              <span className="text-ink-3 wide:flex-[2_1_320px] col-span-2 col-start-2 row-start-3 min-w-0 font-mono text-xs leading-[1.7] tracking-[0.08em]">
                {stackLine(p)}
              </span>
              <span
                aria-hidden="true"
                className="col-start-3 row-start-1 flex-none justify-self-end text-lg"
              >
                <Arrow dir="up-right" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
