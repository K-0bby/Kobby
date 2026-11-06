import Link from "next/link";
import BadgeLanyard from "@/components/ux/badge-lanyard";
import FitText from "@/components/ux/fit-text";
import Keyword from "@/components/ux/keyword";
import PhotoStrip, { type StripPhoto } from "@/components/ux/photo-strip";
import {
  Basketball,
  BookOpen,
  Compass,
  Cursor,
  Database,
  Flask,
  IdentificationBadge,
  MapPin,
  PencilSimpleLine,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import PageIntro from "@/components/ux/page-intro";
import StackedProjects from "@/components/projects/stacked-projects";
import {
  capabilities,
  featuredProjects,
  otherProjects,
  pad2,
  processSteps,
  projectHref,
  stackLine,
} from "@/data/data";

const HEADLINE = ["I build digital", "experiences that", "feel as good as", "they work."];

const HERO_FACTS = [
  "3+ YEARS BUILDING FOR THE WEB",
  "NEXT.JS · EXPRESS.JS · POSTGRESQL",
  "ACCRA 2026, ACCREDITATION PLATFORM",
  "ENS CREATIVES, FULL-STACK SITE & CMS",
];

/**
 * The About strip reads left to right as a day: build, recharge, play. Add a
 * photo here when there's a good one and the strip spaces itself.
 */
const ABOUT_PHOTOS: StripPhoto[] = [
  {
    src: "/images/code-1.jpg",
    alt: "Feet up at the desk beside an open laptop and a cold drink",
    caption: "01 · BUILDING IT",
    tilt: -5,
  },
  {
    src: "/images/cafe-accra.png",
    alt: "Gideon reading a book in headphones at Café Accra",
    caption: "02 · A FEW CHAPTERS IN",
    tilt: 2,
  },
  {
    src: "/images/basketball.jpg",
    alt: "A basketball on a rain-soaked indoor court",
    caption: "03 · THEN, THE COURT",
    tilt: 5,
  },
];

const SECTION_X = "px-[clamp(20px,5vw,80px)]";
const H2 = "m-0 text-[clamp(44px,6vw,96px)] leading-[.95] font-bold tracking-[-0.058em]";

export default function Home() {
  return (
    <main>
      <PageIntro lineDelay={120} lineStep={80} fadeDelay={520} hero />

      {/* ------------------------------------------------------------- Hero */}
      {/* Phones read top to bottom: headline, a line about me, the pass, then
          the name. Desktop keeps copy left, pass hanging right, name along the
          foot. */}
      <section
        id="top"
        aria-label="Introduction"
        className="hero wide:block wide:min-h-[max(100vh,880px)] relative flex flex-col overflow-hidden"
      >
        <div className="wide:contents order-2">
          <BadgeLanyard />
        </div>

        <div
          className={`relative z-2 order-1 mx-auto box-border w-full max-w-360 ${SECTION_X} wide:pt-[clamp(150px,21vh,230px)] wide:pb-[calc(15vw+48px)] pt-32 pb-12`}
        >
          <h1
            aria-label="I build digital experiences that feel as good as they work."
            className="wide:max-w-[58%] wide:text-[clamp(38px,6.3vw,112px)] m-0 max-w-full text-[clamp(34px,9vw,64px)] leading-[.98] font-bold tracking-[-0.058em]"
          >
            {HEADLINE.map((line) => (
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
            className="text-ink-2 wide:mt-9 wide:ml-0 wide:max-w-125 wide:text-left mt-8 mb-0 ml-auto max-w-76 text-right text-[clamp(17px,1.35vw,20px)] leading-normal text-pretty"
          >
            I&apos;m Gideon Hoenyefia, a full-stack engineer turning ambitious ideas into fast,
            intuitive, and beautifully crafted products, from the interface to the database.
          </p>
          <ul
            data-fade=""
            className="text-ink-2 wide:flex mt-8 mb-0 hidden list-none flex-col gap-2.25 p-0 font-mono text-[clamp(11px,1vw,14px)] tracking-[0.12em]"
          >
            {HERO_FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div data-fade="" className="wide:flex mt-11 hidden flex-wrap items-center gap-8">
            <Link
              href="#work"
              className="border-ink flex items-center gap-2.5 border-b-[1.5px] pb-1 text-[clamp(17px,1.4vw,21px)] font-medium no-underline transition-[gap] duration-250 hover:gap-3.5"
            >
              See selected work <span aria-hidden="true">↓</span>
            </Link>
            <Link
              href="#contact"
              className="text-ink-2 hover:text-ink flex items-center gap-2 text-[clamp(15px,1.2vw,18px)] font-medium no-underline transition-colors"
            >
              Let&apos;s Connect <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Desktop: one line along the foot, cropped at the baseline. */}
        <div
          aria-hidden="true"
          data-name=""
          className="wide:block pointer-events-none absolute inset-x-0 bottom-0 z-1 hidden overflow-hidden"
        >
          {/* Scaled to exactly span the viewport so the full name always shows. */}
          <FitText className="text-ink translate-x-[-0.035em] translate-y-[0.17em] pr-[0.02em] text-[10.6vw] leading-[.78] font-extrabold tracking-[-0.07em] transition-colors duration-250">
            GIDEON HOENYEFIA
          </FitText>
        </div>

        {/* Phones: stacked on two lines, sized so HOENYEFIA spans the width,
            rising up under the pass. */}
        <div
          aria-hidden="true"
          data-name=""
          className={`wide:hidden pointer-events-none relative z-0 order-3 mt-0 ${SECTION_X} pb-6`}
        >
          <FitText className="text-ink pr-[0.02em] text-[17vw] leading-[.84] font-extrabold tracking-[-0.07em] transition-colors duration-250">
            GIDEON
            <br />
            HOENYEFIA
          </FitText>
        </div>
      </section>

      {/* ------------------------------------------------------ Selected work */}
      <section
        id="work"
        aria-labelledby="work-title"
        className={`mx-auto box-border max-w-360 ${SECTION_X} pt-[clamp(96px,11vw,160px)] pb-10`}
      >
        <div
          data-reveal=""
          className="mb-[clamp(56px,7vw,96px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-x-12 gap-y-8"
        >
          <div className="flex flex-col gap-7">
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2
              id="work-title"
              className="m-0 text-[clamp(48px,8vw,128px)] leading-[.9] font-bold tracking-[-0.06em]"
            >
              Selected work
            </h2>
          </div>
          <p className="text-ink-2 m-0 max-w-105 justify-self-end text-[clamp(17px,1.35vw,20px)] leading-normal text-pretty">
            A collection of digital experiences I&apos;ve helped bring to life.
          </p>
        </div>

        <StackedProjects projects={featuredProjects} />

        <div data-reveal="" className="mt-[clamp(96px,10vw,140px)]">
          <div className="border-ink flex items-center justify-between gap-4 border-b pb-5">
            <span className="eyebrow">ALSO BUILT</span>
            <Link
              href="/projects"
              className="flex items-center gap-2 text-[15px] font-semibold no-underline transition-[gap] duration-250 hover:gap-3.5"
            >
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          {otherProjects.map((m) => (
            <Link
              key={m.slug}
              data-view=""
              href={projectHref(m.slug)}
              className="border-line ease-out-soft grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] items-baseline gap-x-10 gap-y-2.5 border-b py-7 text-inherit no-underline transition-[padding] duration-350 hover:pl-4"
            >
              <div className="text-[clamp(24px,2.4vw,34px)] font-bold tracking-[-0.04em]">
                {m.title}
              </div>
              <div className="text-ink-2 text-base leading-normal text-pretty">{m.summary}</div>
              <div className="text-ink-3 font-mono text-xs leading-[1.7] tracking-widest">
                {stackLine(m)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- About */}
      <section
        id="about"
        aria-labelledby="about-title"
        className="bg-paper-2 mt-[clamp(96px,10vw,140px)] transition-colors duration-250"
      >
        {/* Phones end on the sliding strip, so the section closes tight
            beneath it rather than adding a full section gap. */}
        <div
          className={`mx-auto box-border max-w-360 ${SECTION_X} wide:pb-[clamp(96px,11vw,160px)] pt-[clamp(96px,11vw,160px)] pb-8`}
        >
          <span data-reveal="" className="eyebrow mb-10 block">
            02 / ABOUT
          </span>
          <div
            data-reveal=""
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-[clamp(48px,6vw,120px)] gap-y-12"
          >
            <h2 id="about-title" className={`${H2} text-balance`}>
              Curiosity drives me. Craft defines my work.
            </h2>
            <div className="flex max-w-155 flex-col gap-5.5 pt-2">
              <p className="text-ink-2 m-0 text-[clamp(18px,1.5vw,22px)] leading-[1.6] text-pretty">
                I&apos;m a full-stack engineer based in{" "}
                <Keyword icon={<MapPin weight="fill" />} motion="bounce" trail=",">
                  Accra
                </Keyword>{" "}
                turning abstract ideas into clean, scalable products, from the{" "}
                <Keyword icon={<Cursor weight="fill" />} motion="wiggle">
                  interface
                </Keyword>{" "}
                people see to the{" "}
                <Keyword icon={<Database weight="fill" />} motion="pop">
                  database
                </Keyword>{" "}
                underneath.
              </p>
              <p className="text-ink-2 m-0 text-[17px] leading-[1.7] text-pretty">
                Over 3+ years I&apos;ve shipped an{" "}
                <Keyword icon={<IdentificationBadge weight="fill" />} motion="flip">
                  accreditation platform
                </Keyword>{" "}
                for the African Athletics Championships, a{" "}
                <Keyword icon={<Compass weight="fill" />} motion="spin">
                  business directory
                </Keyword>{" "}
                connecting Ghanaian businesses and communities across Ghana and the UK, and{" "}
                <Keyword icon={<PencilSimpleLine weight="fill" />} motion="wiggle">
                  CMS-powered sites
                </Keyword>{" "}
                that let small teams manage their own content.
              </p>
              <p className="text-ink-2 m-0 text-[17px] leading-[1.7] text-pretty">
                I believe code should be efficient, maintainable, and purposeful. Alongside
                building, I&apos;m drawn to{" "}
                <Keyword icon={<ShieldCheck weight="fill" />} motion="pop">
                  cybersecurity
                </Keyword>{" "}
                and the part it plays in products people can trust.
              </p>
              <p className="text-ink-2 m-0 text-[17px] leading-[1.7] text-pretty">
                Off the keyboard you&apos;ll find me on the{" "}
                <Keyword icon={<Basketball weight="fill" />} motion="spin" trail=",">
                  basketball court
                </Keyword>{" "}
                deep in a{" "}
                <Keyword icon={<Flask weight="fill" />} motion="wiggle" trail=",">
                  side project
                </Keyword>{" "}
                or with a good{" "}
                <Keyword icon={<BookOpen weight="fill" />} motion="flip" trail=".">
                  book
                </Keyword>
              </p>
              <Link
                href="#capabilities"
                className="border-ink mt-2 flex items-center gap-2.5 self-start border-b-[1.5px] pb-0.75 text-base font-semibold no-underline transition-[gap] duration-250 hover:gap-4"
              >
                More about me <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div data-reveal="" className="mt-[clamp(56px,7vw,96px)]">
            <PhotoStrip photos={ABOUT_PHOTOS} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Capabilities */}
      <section
        id="capabilities"
        aria-labelledby="cap-title"
        className={`mx-auto box-border max-w-360 ${SECTION_X} wide:pt-[clamp(96px,11vw,160px)] pt-16 pb-[clamp(96px,11vw,160px)]`}
      >
        <div data-reveal="" className="mb-[clamp(48px,6vw,80px)] flex flex-col gap-7">
          <span className="eyebrow">03 / CAPABILITIES</span>
          <h2 id="cap-title" className={H2}>
            What I work with
          </h2>
        </div>
        <div className="border-ink border-t">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              data-reveal=""
              className="border-line grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-x-12 gap-y-5 border-b py-[clamp(28px,3.5vw,44px)]"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-ink-3 font-mono text-[13px]">{pad2(i + 1)}</span>
                <h3 className="m-0 text-[clamp(26px,2.6vw,40px)] leading-none font-bold tracking-[-0.045em]">
                  {c.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.items.map((t) => (
                  <span
                    key={t}
                    className="border-line bg-surface hover:border-ink rounded-full border px-3.5 py-2 text-[15px] font-medium transition-colors duration-150"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ Process */}
      <section
        id="process"
        aria-labelledby="proc-title"
        className={`mx-auto box-border max-w-360 ${SECTION_X} pb-[clamp(96px,11vw,160px)]`}
      >
        <div data-reveal="" className="mb-[clamp(48px,6vw,80px)] flex flex-col gap-7">
          <span className="eyebrow">04 / HOW I BUILD</span>
          <h2 id="proc-title" className={H2}>
            How I build
          </h2>
        </div>
        <ol className="border-line bg-line m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-px overflow-hidden rounded-lg border p-0">
          {processSteps.map((s, i) => (
            <li
              key={s.title}
              data-reveal=""
              className="bg-paper hover:bg-surface flex min-h-70 flex-col gap-4 p-[clamp(28px,3vw,40px)] transition-colors duration-250"
            >
              <span className="eyebrow">{pad2(i + 1)}</span>
              <h3 className="mt-auto mb-0 text-[clamp(30px,2.8vw,40px)] leading-none font-bold tracking-[-0.045em]">
                {s.title}
              </h3>
              <p className="text-ink-2 m-0 text-base leading-[1.55] text-pretty">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
