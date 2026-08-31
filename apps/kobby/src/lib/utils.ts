/**
 * shadcn's `@/lib/utils` alias resolves here. In shared mode every generated
 * component lives in packages/ui, so cn() has exactly one implementation —
 * this file re-exports it rather than duplicating the clsx + tailwind-merge
 * pairing in the app.
 */
export { cn } from "@repo/ui";
