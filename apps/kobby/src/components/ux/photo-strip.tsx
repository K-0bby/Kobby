import Image from "next/image";

export interface StripPhoto {
  src: string;
  alt: string;
  caption: string;
  /** Resting tilt in degrees. */
  tilt: number;
}

/**
 * A row of tilted, framed prints.
 *
 * Desktop: the prints sit in a spaced row; hovering one straightens it and
 * lifts it forward while the rest settle back.
 *
 * Phones: a native horizontal scroller lets visitors swipe between prints.
 * The strip stays in normal page flow, with no reserved scroll distance.
 */
export default function PhotoStrip({ photos }: { photos: StripPhoto[] }) {
  return (
    <div className="wide:mx-0 relative -mx-[clamp(20px,5vw,80px)]">
      <div
        role="region"
        aria-label="About photos"
        tabIndex={0}
        className="wide:overflow-visible snap-x snap-mandatory scrollbar-none overflow-x-auto overscroll-x-contain"
      >
        <ul className="group/strip wide:w-auto wide:justify-center wide:gap-[clamp(28px,3.5vw,56px)] wide:px-0 m-0 flex w-max list-none gap-6 px-[clamp(20px,5vw,80px)] py-8">
          {photos.map((p) => (
            <li
              key={p.src}
              // Tilt is per photo; the hover straightens it.
              style={{ ["--tilt" as string]: `${p.tilt}deg` }}
              className="ease-out-soft wide:group-hover/strip:opacity-80 wide:hover:opacity-100! relative shrink-0 rotate-(--tilt) snap-center transition-[rotate,translate,scale,opacity] duration-500 hover:z-10 hover:-translate-y-3 hover:scale-[1.05] hover:rotate-0"
            >
              {/* Phones: a hairline outline only — a drop shadow would be cut
                  off by the sliding row. Desktop keeps the soft shadow. */}
              <figure className="bg-surface wide:w-[clamp(220px,20vw,290px)] wide:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35),0_0_0_1px_rgb(0_0_0/0.05)] m-0 w-[min(72vw,300px)] rounded-[18px] p-1.5 shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
                <div className="bg-line relative aspect-4/5 overflow-hidden rounded-xl">
                  <Image src={p.src} alt={p.alt} fill sizes="300px" className="object-cover" />
                </div>
                <figcaption className="text-ink-3 px-1.5 pt-2.5 pb-1 font-mono text-[10px] tracking-[0.14em]">
                  {p.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
