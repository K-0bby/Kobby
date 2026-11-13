import Link from "next/link";
import BadgeLanyard from "@/components/ux/badge-lanyard";
import FitText from "@/components/ux/fit-text";
import ConnectReveal from "@/components/ux/connect-reveal";
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
import WebsiteCard from "@/components/projects/website-card";
import { H2, H2_COUNT, LEDE, SECTION_HEAD } from "@/lib/typography";
import Arrow from "@/components/ux/arrow";
import {
  capabilities,
  featuredProjects,
  homeWebsites,
  pad2,
  processSteps,
} from "@/data/data";

/**
 * The headline, broken by hand so each break lands on the beat: two balanced
 * lines on desktop; three on phones, where a long line can't fit.
 */
const HEADLINE = {
  desktop: ["I build products that feel", "as good as they work."],
  phone: ["I build products", "that feel as good", "as they work."],
};

const HERO_FACTS = [
  "3+ YEARS BUILDING FOR THE WEB",
  "NEXT.JS · EXPRESS.JS · POSTGRESQL",
  "ACCRA 2026 ACCREDITATION PLATFORM",
  "YAHNDA TRUST-VERIFICATION PLATFORM",
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

export default function Home() {
  return (
    <main>
      <PageIntro lineDelay={120} lineStep={80} fadeDelay={520} hero />

      {/* ------------------------------------------------------------- Hero */}
      <section
        id="top"
        aria-label="Introduction"
        className="hero wide:block wide:min-h-[max(calc(100vh-48px),832px)] relative flex flex-col overflow-hidden"
      >
        <div className="wide:contents order-2">
          <BadgeLanyard />
        </div>

        <div
          className={`relative z-2 order-1 mx-auto box-border w-full max-w-360 ${SECTION_X} wide:pt-[clamp(150px,21vh,230px)] wide:pb-[calc(15vw+8px)] pt-32 pb-12`}
        >
          <h1
            aria-label="I build products that feel as good as they work."
            className="wide:max-w-[72%] wide:text-[clamp(36px,4.9vw,80px)] m-0 max-w-full text-[clamp(32px,9vw,60px)] leading-none font-medium tracking-[-0.045em] whitespace-nowrap"
          >
            {(["desktop", "phone"] as const).map((layout) =>
              HEADLINE[layout].map((line) => (
                <span
                  key={`${layout}-${line}`}
                  aria-hidden="true"
                  className={`${layout === "desktop" ? "wide:block hidden" : "wide:hidden block"} mb-[-0.06em] overflow-hidden pb-[.06em]`}
                >
                  <span data-line="" className="block">
                    {line}
                  </span>
                </span>
              ))
            )}
          </h1>
          <p
            data-fade=""
            className="text-ink-2 wide:mt-9 wide:ml-0 wide:max-w-125 wide:text-left mt-8 mb-0 ml-auto max-w-76 text-right text-[18px] leading-normal text-pretty"
          >
            I&apos;m Gideon Hoenyefia, a full-stack engineer turning ambitious ideas into fast,
            intuitive, and beautifully crafted products, from the interface to the database.
          </p>
          <ul
            data-fade=""
            className="text-ink-2 wide:flex mt-8 mb-0 hidden list-none flex-col gap-1.5 p-0 font-mono text-[11px] leading-normal tracking-widest"
          >
            {HERO_FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {/* Desktop only: the hero's two calls to action. */}
          <div data-fade="" className="wide:flex mt-11 hidden flex-wrap items-center gap-8">
            <Link
              href="#work"
              className="border-ink flex items-center gap-2 border-b-[1.5px] pb-1 text-[16px] font-medium no-underline transition-[gap] duration-250 hover:gap-3.5"
            >
              See selected work <Arrow dir="down" />
            </Link>
            <ConnectReveal />
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
          className="mb-[clamp(32px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-x-12 gap-y-8"
        >
          <h2
            id="work-title"
            // One line at every width: scales with the screen on phones.
            className="wide:text-[clamp(64px,7vw,120px)] m-0 flex items-start gap-[0.12em] text-[11.5vw] leading-[.9] font-bold tracking-[-0.06em] whitespace-nowrap"
          >
            Selected work
            {/* The count, set small and high like a footnote. */}
            <span className="text-ink-2 mt-[0.05em] text-[clamp(14px,1.4vw,20px)] font-medium tracking-normal">
              ({pad2(featuredProjects.length)})
            </span>
          </h2>
          <div className="wide:justify-self-end flex max-w-95 flex-col items-start gap-5">
            <p className="text-ink-2 m-0 text-[18px] leading-normal text-pretty">
              Four products across sport, community, trust and culture.
            </p>
            <Link
              href="/projects"
              className="border-line bg-surface hover:border-ink group/all flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] font-semibold no-underline transition-[border-color,gap] duration-250 hover:gap-3"
            >
              All projects
              <span
                aria-hidden="true"
                className="transition-transform duration-250 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
              >
                <Arrow dir="up-right" />
              </span>
            </Link>
          </div>
        </div>

        <StackedProjects projects={featuredProjects} />

        {/* Recent work: hand-picked, in progress first, as a grid of screens. */}
        <div className="mt-[clamp(112px,12vw,180px)]">
          <div
            data-reveal=""
            className="mb-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-x-12 gap-y-6"
          >
            <h2 className="wide:text-[clamp(56px,6vw,104px)] m-0 flex items-start gap-[0.12em] text-[11.5vw] leading-[.9] font-bold tracking-[-0.06em] whitespace-nowrap">
              Recent work
              <span className="text-ink-2 mt-[0.05em] text-[clamp(14px,1.4vw,20px)] font-medium tracking-normal">
                ({pad2(homeWebsites.length)})
              </span>
            </h2>
            <p className="text-ink-2 wide:justify-self-end m-0 max-w-95 text-[18px] leading-normal text-pretty">
              What I&apos;m building now, and sites I&apos;ve shipped for businesses and artists.
              Open one to see how it came together.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-[clamp(20px,2.5vw,40px)] gap-y-[clamp(40px,5vw,72px)]">
            {homeWebsites.map((m) => (
              <WebsiteCard key={m.slug} project={m} />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- About */}
      <section
        id="about"
        aria-labelledby="about-title"
        className="bg-paper-2 mt-[clamp(96px,10vw,140px)] transition-colors duration-250"
      >
        {/* Phones end on the swipeable strip, so the section closes tight beneath it rather than adding a full section gap. */}
        <div
          className={`mx-auto box-border max-w-360 ${SECTION_X} wide:pb-[clamp(96px,11vw,160px)] pt-[clamp(96px,11vw,160px)] pb-8`}
        >
          <div
            data-reveal=""
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-[clamp(48px,6vw,120px)] gap-y-12"
          >
            {/* A two-sentence statement, so it wraps — in the same heading
                style as the one-line section titles. */}
            <h2
              id="about-title"
              className="wide:text-[clamp(56px,5.4vw,96px)] m-0 text-[clamp(40px,10.5vw,60px)] leading-[.92] font-bold tracking-[-0.06em] text-balance"
            >
              Curiosity drives me. Craft defines my work.
            </h2>
            <div className="flex max-w-155 flex-col gap-5.5 pt-2">
              <p className="text-ink-2 m-0 text-[16px] leading-[1.7] text-pretty">
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
              <p className="text-ink-2 m-0 text-[16px] leading-[1.7] text-pretty">
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
              <p className="text-ink-2 m-0 text-[16px] leading-[1.7] text-pretty">
                I believe code should be efficient, maintainable, and purposeful. Alongside
                building, I&apos;m drawn to{" "}
                <Keyword icon={<ShieldCheck weight="fill" />} motion="pop">
                  cybersecurity
                </Keyword>{" "}
                and the part it plays in products people can trust.
              </p>
              <p className="text-ink-2 m-0 text-[16px] leading-[1.7] text-pretty">
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
                More about me <Arrow dir="right" />
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
        <div data-reveal="" className={SECTION_HEAD}>
          <h2 id="cap-title" className={H2}>
            What I work with
            <span className={H2_COUNT}>({pad2(capabilities.length)})</span>
          </h2>
          <p className={LEDE}>
            The languages, frameworks and tools I reach for, from the interface to the database.
          </p>
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
        <div data-reveal="" className={SECTION_HEAD}>
          <h2 id="proc-title" className={H2}>
            How I build
            <span className={H2_COUNT}>({pad2(processSteps.length)})</span>
          </h2>
          <p className={LEDE}>
            Four steps behind every project, from the first question to the final polish.
          </p>
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
