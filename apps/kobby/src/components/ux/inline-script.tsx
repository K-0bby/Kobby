/**
 * An inline script that runs while the browser parses the initial HTML —
 * before first paint — without React's dev warning about rendering <script>.
 *
 * On the server it's `text/javascript`, so the browser executes it. On the
 * client it's `text/plain`, so React never tries to run it again; the type
 * mismatch is expected, hence suppressHydrationWarning. (Per the Next.js
 * "Preventing flash before hydration" guide.)
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
