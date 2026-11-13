import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/ux/page-intro";
import Arrow from "@/components/ux/arrow";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Gideon Hoenyefia — coming soon.",
};

export default function BlogPage() {
  return (
    <main>
      <PageIntro lineDelay={80} fadeDelay={260} />
      <section className="mx-auto box-border flex min-h-[80vh] max-w-360 flex-col justify-center px-[clamp(20px,5vw,80px)] pt-[clamp(140px,19vh,200px)] pb-[clamp(64px,8vw,112px)]">
        <span data-fade="" className="eyebrow mb-8 block">
          BLOG
        </span>
        <div className="overflow-hidden pb-[.08em]">
          <h1
            data-line=""
            className="m-0 text-[clamp(56px,10vw,168px)] leading-[.9] font-bold tracking-[-0.065em]"
          >
            Coming soon.
          </h1>
        </div>
        <p
          data-fade=""
          className="text-ink-2 mt-8 mb-0 max-w-130 text-[18px] leading-normal text-pretty"
        >
          Notes on building for the web are on the way. Until then, the work speaks for itself.
        </p>
        <div data-fade="" className="mt-11">
          <Link
            href="/projects"
            className="border-ink inline-flex items-center gap-2.5 border-b-[1.5px] pb-1 text-[16px] font-medium no-underline transition-[gap] duration-250 hover:gap-3.5"
          >
            See the projects <Arrow dir="right" />
          </Link>
        </div>
      </section>
    </main>
  );
}
