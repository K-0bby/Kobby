import Image from "next/image";
import Link from "next/link";
import type { Architecture as ArchitectureData } from "@/types/project";
import { pad2 } from "@/data/data";
import Arrow from "@/components/ux/arrow";

/**
 * A project's backend, in three reads: the system diagram, the parts in it,
 * then the decisions behind them as short records (context → decision →
 * outcome). The diagram keeps its own dark canvas in both themes; on phones it
 * scrolls sideways rather than shrinking past legibility.
 */
export default function Architecture({ data, name }: { data: ArchitectureData; name: string }) {
  const { diagram } = data;
  // Blocks are numbered in order, so a write-up without a diagram starts at 01.
  const n = diagram ? 1 : 0;
  return (
    <div className="flex flex-col gap-[clamp(56px,7vw,96px)]">
      {/* Topology */}
      {diagram && (
      <figure data-reveal="" className="m-0 flex flex-col gap-4">
        <div className="overflow-x-auto overscroll-x-contain rounded-[20px] bg-[#121314] scrollbar-thin">
          <div className="min-w-180 p-[clamp(16px,3vw,40px)]">
            <Image
              src={diagram.src}
              alt={diagram.alt}
              width={diagram.width}
              height={diagram.height}
              sizes="(min-width: 1440px) 1280px, (min-width: 760px) 92vw, 720px"
              className="h-auto w-full"
            />
          </div>
        </div>
        <figcaption className="text-ink-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[11px] font-medium tracking-[0.14em]">
          <span>01 / SYSTEM TOPOLOGY · {name.toUpperCase()}</span>
          <span className="nav:hidden">SCROLL SIDEWAYS TO SEE IT ALL →</span>
          <Link
            href={diagram.src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-2 hover:text-ink nav:flex hidden items-center gap-1.5 no-underline transition-colors duration-250"
          >
            OPEN FULL SIZE <Arrow dir="up-right" />
          </Link>
        </figcaption>
      </figure>
      )}

      {/* The parts */}
      <div data-reveal="" className="flex flex-col gap-6">
        <span className="eyebrow">{pad2(n + 1)} / THE PARTS</span>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-3 p-0">
          {data.parts.map((part, k) => (
            <li
              key={part.name}
              className="border-line bg-surface flex flex-col gap-3 rounded-[20px] border p-6"
            >
              <span className="text-ink-3 font-mono text-xs">{pad2(k + 1)}</span>
              <h3 className="m-0 text-[20px] leading-tight font-semibold tracking-tight">
                {part.name}
              </h3>
              <p className="text-ink-2 m-0 text-[16px] leading-[1.55] text-pretty">{part.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Decisions */}
      <div className="flex flex-col gap-6">
        <span data-reveal="" className="eyebrow">
          {pad2(n + 2)} / DECISIONS
        </span>
        <div className="flex flex-col gap-3">
          {data.decisions.map((d, k) => (
            <article
              key={d.title}
              data-reveal=""
              className="bg-paper-2 wide:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] grid gap-x-[clamp(32px,5vw,80px)] gap-y-6 rounded-[22px] p-[clamp(22px,3vw,40px)]"
            >
              <div className="flex flex-col gap-3">
                <span className="text-signal font-mono text-[11px] font-medium tracking-[0.16em]">
                  ADR-{pad2(k + 1)}
                </span>
                <h3 className="m-0 text-[clamp(22px,2vw,30px)] leading-[1.08] font-bold tracking-[-0.035em] text-balance">
                  {d.title}
                </h3>
              </div>
              <dl className="m-0 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <dt className="text-ink-3 font-mono text-[11px] font-medium tracking-[0.14em]">
                    CONTEXT
                  </dt>
                  <dd className="text-ink-2 m-0 text-[16px] leading-[1.55] text-pretty">
                    {d.context}
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <dt className="text-ink-3 font-mono text-[11px] font-medium tracking-[0.14em]">
                    DECISION
                  </dt>
                  <dd className="m-0 text-[16px] leading-[1.55] text-pretty">{d.decision}</dd>
                </div>
                <div className="border-signal flex flex-col gap-1.5 border-l-2 pl-4">
                  <dt className="text-signal font-mono text-[11px] font-medium tracking-[0.14em]">
                    OUTCOME
                  </dt>
                  <dd className="m-0 text-[16px] leading-[1.55] font-medium text-pretty">
                    {d.outcome}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
