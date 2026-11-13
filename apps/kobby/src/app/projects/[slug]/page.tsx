import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import PageIntro from "@/components/ux/page-intro";
import ParallaxImage from "@/components/ux/parallax-image";
import Walkthrough from "@/components/projects/walkthrough";
import { tintStyle } from "@/lib/tint";
import { getProject, pad2, projectHref, projects } from "@/data/data";
import type { Project } from "@/types/project";
import Arrow from "@/components/ux/arrow";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: projectHref(p.slug) },
    openGraph: {
      title: `${p.title} — Gideon Hoenyefia`,
      description: p.summary,
      images: p.image ? [p.image] : undefined,
    },
  };
}

const SECTION = "mx-auto box-border max-w-360 px-[clamp(20px,5vw,80px)]";

type Section = { title: string; text: string } | { title: string; list: string[] };

/** Case-study sections in reading order; empty ones are left out entirely. */
function sectionsFor(p: Project): Section[] {
  const all: (Section | null)[] = [
    { title: "Overview", text: p.overview ?? p.summary },
    p.role ? { title: "Role & responsibilities", text: p.role } : null,
    p.challenge ? { title: "Challenge", text: p.challenge } : null,
    p.approach ? { title: "Approach", text: p.approach } : null,
    p.features?.length ? { title: "Key features", list: p.features } : null,
    p.decisions ? { title: "Technical decisions", text: p.decisions } : null,
    p.results ? { title: "Results & lessons", text: p.results } : null,
  ];
  return all.filter((s): s is Section => s !== null);
}

/** Every third shot spans the full row in a wider frame. */
const isWide = (i: number) => i % 3 === 2;

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;

  // Old links used numeric ids (/projects/3) — send them to the slug.
  if (/^\d+$/.test(slug)) {
    const legacy = projects.find((p) => p.id === Number(slug));
    if (legacy) permanentRedirect(projectHref(legacy.slug));
  }

  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length] ?? projects[0]!;
  const sections = sectionsFor(p);
  const alt = `${p.title} website screenshot`;

  const meta: { k: string; v: React.ReactNode }[] = [
    { k: "CLIENT", v: p.client },
    { k: "CATEGORY", v: p.category.charAt(0) + p.category.slice(1).toLowerCase() },
    { k: "STACK", v: p.technologies.join(", ") },
    { k: "YEAR", v: p.year },
  ];
  const links = [
    p.link && { label: "Live site", href: p.link },
    p.repo && { label: "Repository", href: p.repo },
  ].filter((l): l is { label: string; href: string } => !!l);
  if (links.length) {
    meta.push({
      k: "LINKS",
      v: (
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink flex items-center gap-1.5 border-b no-underline transition-[gap] duration-250 hover:gap-2.5"
            >
              {l.label} <Arrow dir="up-right" />
            </Link>
          ))}
        </span>
      ),
    });
  }

  return (
    <main>
      <PageIntro lineDelay={80} fadeDelay={200} />

      {/* --------------------------------------------------------------- Intro */}
      <section
        aria-labelledby="p-title"
        className={`${SECTION} pt-[clamp(140px,19vh,200px)] pb-[clamp(48px,6vw,80px)]`}
      >
        <div data-fade="" className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            className="text-ink-2 hover:text-ink flex items-center gap-2 font-mono text-[13px] font-medium tracking-[0.14em] no-underline transition-[gap,color] duration-250 hover:gap-3.5"
          >
            <Arrow dir="left" /> ALL PROJECTS
          </Link>
          <span className="eyebrow">
            CASE STUDY {pad2(i + 1)} / {pad2(projects.length)}
          </span>
        </div>
        <span data-fade="" className="chip mb-7 inline-block">
          {p.category}
        </span>
        <div className="overflow-hidden pb-[.08em]">
          <h1
            id="p-title"
            data-line=""
            className="m-0 max-w-[16ch] text-[clamp(44px,7.4vw,128px)] leading-[.93] font-bold tracking-[-0.06em] text-balance"
          >
            {p.title}
          </h1>
        </div>
        <p
          data-fade=""
          className="text-ink-2 mt-8 mb-0 max-w-180 text-[18px] leading-normal text-pretty"
        >
          {p.summary}
        </p>
        <dl
          data-fade=""
          className="border-ink mt-[clamp(48px,6vw,80px)] mb-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-t"
        >
          {meta.map((m) => (
            <div key={m.k} className="border-line flex flex-col gap-2 border-b py-5 pr-6">
              <dt className="text-ink-3 font-mono text-[11px] font-medium tracking-[0.14em]">
                {m.k}
              </dt>
              <dd className="text-ink m-0 text-base leading-[1.45] font-medium">{m.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------------------------------------------------- Hero shot */}
      <section aria-label="Project hero image" className={SECTION}>
        {p.image ? (
          <div
            data-reveal=""
            className="bg-panel-a relative aspect-video overflow-hidden rounded-[20px]"
          >
            <div className="absolute inset-[clamp(20px,4.5vw,72px)_clamp(20px,6vw,110px)_0] overflow-hidden rounded-t-xl bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5),0_0_0_1px_rgb(0_0_0/0.06)]">
              <ParallaxImage src={p.image} alt={alt} />
            </div>
          </div>
        ) : (
          // Work in progress without screenshots yet: hold the space in the
          // project's colour.
          <div
            data-reveal=""
            style={tintStyle(p.hue, p.brand)}
            className="shot-panel shot-panel--deep relative grid aspect-video place-items-center overflow-hidden rounded-[20px]"
          >
            <span className="rounded-full bg-black/35 px-3.5 py-2 font-mono text-[12px] font-medium tracking-[0.16em] text-white/85 backdrop-blur-sm">
              SCREENS COMING SOON
            </span>
          </div>
        )}
      </section>

      {/* --------------------------------------------------------- Case study */}
      <section
        aria-label="Case study"
        className={`${SECTION} flex flex-col pt-[clamp(96px,11vw,160px)]`}
      >
        {sections.map((s, k) => (
          <div
            key={s.title}
            data-reveal=""
            className="border-line grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-[clamp(40px,6vw,120px)] gap-y-5 border-t py-[clamp(40px,5vw,64px)]"
          >
            <div className="flex items-baseline gap-5">
              <span className="text-ink-3 font-mono text-[13px]">{pad2(k + 1)}</span>
              <h2 className="m-0 text-[clamp(28px,2.8vw,42px)] leading-none font-bold tracking-[-0.045em]">
                {s.title}
              </h2>
            </div>
            <div className="max-w-180">
              {"text" in s ? (
                <p className="m-0 text-[16px] leading-[1.55] text-pretty">
                  {s.text}
                </p>
              ) : (
                <ol className="border-line m-0 list-none border-t p-0">
                  {s.list.map((t, n) => (
                    <li
                      key={t}
                      className="border-line flex items-baseline gap-5 border-b py-4.5 text-[16px] leading-[1.45]"
                    >
                      <span className="text-ink-3 min-w-6 font-mono text-xs">{pad2(n + 1)}</span>
                      {t}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* -------------------------------------------------------- Walkthrough */}
      {p.walkthrough?.length ? (
        <section
          aria-labelledby="w-title"
          className={`${SECTION} pt-[clamp(64px,8vw,112px)] pb-[clamp(96px,11vw,160px)]`}
        >
          <div data-reveal="" className="mb-[clamp(36px,5vw,64px)] flex flex-col gap-6">
            <span className="eyebrow">WALKTHROUGH</span>
            <h2
              id="w-title"
              className="m-0 max-w-[18ch] text-[clamp(36px,4.6vw,72px)] leading-[.95] font-bold tracking-[-0.055em] text-balance"
            >
              How it works, screen by screen.
            </h2>
          </div>
          <div data-reveal="">
            <Walkthrough steps={p.walkthrough} hue={p.hue} brand={p.brand} name={p.title} />
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------ Gallery */}
      {!p.walkthrough?.length && p.gallery.length > 0 && (
        <section
          aria-labelledby="g-title"
          className={`${SECTION} pt-[clamp(64px,8vw,112px)] pb-[clamp(96px,11vw,160px)]`}
        >
          <div data-reveal="" className="mb-7 flex items-center justify-between gap-4">
            <h2 id="g-title" className="eyebrow m-0">
              SCREENS &amp; DETAILS
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
            {p.gallery.map((src, g) => (
              <div
                key={src}
                data-reveal=""
                className={
                  isWide(g)
                    ? "border-line bg-panel-a relative col-span-full aspect-21/9 overflow-hidden rounded-2xl border"
                    : "border-line bg-panel-a relative aspect-16/10 overflow-hidden rounded-2xl border"
                }
              >
                <Image
                  src={src}
                  alt={`${p.title} screen ${g + 1}`}
                  fill
                  sizes={
                    isWide(g) ? "(min-width: 1440px) 1280px, 92vw" : "(min-width: 980px) 46vw, 92vw"
                  }
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ Next project */}
      <section aria-label="Next project" className="border-line border-t">
        <Link
          data-view=""
          href={projectHref(next.slug)}
          className={`${SECTION} ease-out-soft block py-[clamp(64px,8vw,120px)] text-inherit no-underline transition-[padding] duration-400 hover:pl-[clamp(36px,6vw,104px)]`}
        >
          <span className="eyebrow mb-6 flex items-center gap-2">NEXT PROJECT <Arrow dir="right" /></span>
          <span className="block text-[clamp(44px,8vw,140px)] leading-[.92] font-bold tracking-[-0.06em] text-balance">
            {next.short}
          </span>
        </Link>
      </section>
    </main>
  );
}
