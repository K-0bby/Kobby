import { ImageResponse } from "next/og";

/** Brand colours, kept in step with globals.css (--color-mark / --color-signal). */
const MARK = "#171719";
const SIGNAL = "#4F7BFF";
const PAPER = "#FAFAF8";

/**
 * Geist ExtraBold, subset to just "GH". Fetched at build time; if the network
 * is unavailable the icon still renders in the default font.
 */
async function loadGeist(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Geist:wght@800&text=GH"
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

/** Renders the GH monogram — dark disc, blue halo — as a square PNG. */
export async function markImage(px: number) {
  const font = await loadGeist();
  const ring = Math.max(2, Math.round(px * 0.06));
  const gap = Math.max(1, Math.round(px * 0.045));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: `${ring}px solid ${SIGNAL}`,
          padding: gap,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: MARK,
            color: PAPER,
            fontSize: px * 0.36,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            fontFamily: font ? "Geist" : undefined,
          }}
        >
          GH
        </div>
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: font ? [{ name: "Geist", data: font, weight: 800, style: "normal" }] : undefined,
    }
  );
}
