# Changelog

Notable changes to the portfolio. Newest first.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project is a personal site rather than a released package, so entries are
grouped by date instead of a semantic version.

## [Unreleased]

### Added

- **Ghanaian Support Network** and **EnS Creatives** case studies — two
  full-stack builds with custom CMSes, written as problem → solution rather
  than feature lists.
- **ACCRA 2026 Accreditation Management System** case study.
- WhatsApp and email contact routes beside the contact form, in an editorial
  two-column layout. Details live in `data.ts` as a typed `contact` export.
- Back buttons on the project detail, projects index, and blog pages. They
  name their real destination ("Back to Home" vs "Back to Projects") by
  reading the previous path recorded by `NavigationTracker`, and fall back to
  a fixed route for anyone who arrived on a deep link.
- Custom-cursor labels via `data-tooltip`: navigation and social icons name
  their destination, Previous/Next Project name the project they lead to, and
  the external project link warns that it opens in a new tab.
- `sitemap.ts` and `robots.ts`.
- Node.js and Express.js in the skills marquee.

### Changed

- Project order is now ACCRA → EnS → Me-fie → Kweku Smoke → GSN → HDF →
  DigiGrowth. The home page shows the first four; `/projects` shows all of
  them.
- Extracted `ProjectCard`, shared by the home page and the projects index.
  The two grids were near-identical copies that had already drifted apart.
  Cards are equal height with the CTA pinned via `mt-auto`, so a project with
  five technology tags lines its button up with one that has three.
- One button rhythm across the site, defined in `lib/ui.ts`. Padding had
  ranged from `px-4 py-2.5` to `px-6 py-5` depending on the page.
- Design tokens moved to `packages/tailwind-config`; app-specific styling
  (fonts, custom cursor, page furniture) moved into the app. A second app
  would otherwise have inherited this portfolio's cursor and contact section.
- The custom cursor no longer labels every link "link" and every button
  "button". A label that appears occasionally reads as deliberate; one that
  appears always reads as debug output.

### Fixed

- `LenisProvider` read a ref during render, so `useLenis().lenis` was `null`
  for every consumer, permanently. It also never cancelled its
  `requestAnimationFrame` loop on unmount, and now respects
  `prefers-reduced-motion`.
- Gallery thumbnails on the project detail page were `div`s with `onClick` —
  unreachable by keyboard, so the gallery was mouse-only. Now `button`s with
  `aria-pressed`.
- Icon-only navigation and social links had no accessible name; screen
  readers announced the bare URL. All now carry `aria-label`.
- The navbar pill had a hard-coded `md:w-124` its contents outgrew, pushing
  the Contact button outside the rounded edge. It now sizes to content.
- The hand-rolled inline Twitter SVG in the navbar was a solid glyph among
  Phosphor outline icons; replaced with Phosphor's `XLogo`.
- `SiCss3` and `SiNode` don't exist in the installed `react-icons`; corrected
  to `SiCss` and `SiNodedotjs`.
- An empty project `link` rendered `<a href="">`, which reloads the page. The
  external link is now omitted when a project has no public URL.

## 2026-08-31 — Monorepo foundation

Initial commit (`da51449`).

### Added

- Turborepo + pnpm workspaces with `apps/kobby` (Next.js 16, React 19,
  Tailwind v4) consuming four shared packages.
- shadcn in shared mode on Base UI with Phosphor icons; `button`, `input`,
  `textarea`, and `sonner` live in `packages/ui`.
- Landing-archetype dependencies: `motion`, `lenis`, `@phosphor-icons/react`.
- `check-types` script for `packages/ui`, which immediately caught the
  Phosphor resolution bug below.

### Fixed

- `packages/ui` inherited `moduleResolution: NodeNext` from the shared
  TypeScript base, which silently broke every Phosphor type re-export.
  `react-library.json` now uses `Bundler`.
- Shared UI components were missing `"use client"`, which broke the build via
  the barrel import in `layout.tsx`.
- `next lint` was removed in Next 16 and the `FlatCompat` ESLint config
  produced a circular structure — lint had never actually run.
- `apps/kobby/src/app/globals.css` didn't import the shared Tailwind config,
  so the `@source` scan never reached `packages/ui` and shared components
  rendered unstyled.
