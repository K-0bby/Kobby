import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="mx-auto box-border flex min-h-[80vh] max-w-360 flex-col justify-center px-[clamp(20px,5vw,80px)] pt-[clamp(140px,19vh,200px)] pb-[clamp(64px,8vw,112px)]">
        <span className="eyebrow mb-8 block">404 / NOT FOUND</span>
        <h1 className="m-0 max-w-[14ch] text-[clamp(48px,8vw,128px)] leading-[.92] font-bold tracking-[-0.06em] text-balance">
          This page doesn&apos;t exist.
        </h1>
        <div className="mt-11 flex flex-wrap items-center gap-8">
          <Link
            href="/"
            className="border-ink inline-flex items-center gap-2.5 border-b-[1.5px] pb-1 text-[clamp(17px,1.4vw,21px)] font-medium no-underline transition-[gap] duration-250 hover:gap-3.5"
          >
            Back home <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/projects"
            className="text-ink-2 hover:text-ink text-[clamp(15px,1.2vw,18px)] font-medium no-underline transition-colors"
          >
            All projects ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
