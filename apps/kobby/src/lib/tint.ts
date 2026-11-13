import type { CSSProperties } from "react";

/**
 * CSS variables for a project's tint. By default only the hue is set and the
 * panel, tag and tile colours are derived from it in globals.css. A project
 * with an exact brand colour overrides each derived colour with a mix of
 * that colour, so its card matches the product.
 */
export function tintStyle(hue: number, brand?: string): CSSProperties {
  const vars: Record<string, string | number> = { "--tint-h": hue };
  if (brand) {
    vars["--panel-soft"] = `color-mix(in oklch, ${brand} 22%, white)`;
    vars["--panel-soft-dark"] = `color-mix(in oklch, ${brand} 38%, #141414)`;
    vars["--panel-deep"] =
      `radial-gradient(130% 95% at 12% 0%, ${brand}, color-mix(in oklch, ${brand} 70%, black) 55%, color-mix(in oklch, ${brand} 38%, black))`;
    vars["--tint-ink"] = `color-mix(in oklch, ${brand} 85%, black)`;
    vars["--tint-ink-dark"] = `color-mix(in oklch, ${brand} 80%, white)`;
    vars["--tint-tile"] = `linear-gradient(145deg, ${brand}, color-mix(in oklch, ${brand} 78%, black))`;
  }
  return vars as CSSProperties;
}
