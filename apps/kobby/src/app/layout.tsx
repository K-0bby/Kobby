import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ViewCursor from "@/components/ux/view-cursor";
import ScrollReveal from "@/components/ux/scroll-reveal";
import Preloader from "@/components/ux/preloader";
import InlineScript from "@/components/ux/inline-script";
import LenisProvider from "@/provider/lenis-provider";
import { Toaster } from "@repo/ui";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const DESCRIPTION =
  "Full-stack engineer building fast, intuitive, and beautifully crafted digital products, from the database to the interface.";
const SITE_TITLE = "Gideon Hoenyefia — Full-Stack Engineer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0D" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gideonhoenyefia.com"),
  title: {
    default: SITE_TITLE,
    template: "%s — Gideon Hoenyefia",
  },
  description: DESCRIPTION,
  keywords: [
    "Full-Stack Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "Node.js Developer",
    "Express.js Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer",
    "Accra",
    "Gideon Hoenyefia",
  ],
  authors: [{ name: "Gideon Hoenyefia" }],
  creator: "Gideon Hoenyefia",
  publisher: "Gideon Hoenyefia",
  // Favicon and Apple touch icon are generated from the GH mark by
  // app/icon.tsx and app/apple-icon.tsx.
  openGraph: {
    title: SITE_TITLE,
    description: DESCRIPTION,
    url: "https://gideonhoenyefia.com",
    type: "website",
    locale: "en_US",
    siteName: "Gideon Hoenyefia",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gideon Hoenyefia" }],
  },
  twitter: {
    title: SITE_TITLE,
    description: DESCRIPTION,
    card: "summary_large_image",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gideon Hoenyefia" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/**
 * Runs before first paint: applies the saved theme (no light flash for dark
 * users) and, when motion is allowed, raises the GH preloader and parks hero
 * copy in its intro pose. The timeout is a safety net in case hydration never
 * arrives, so the page can't stay covered.
 */
const PRE_PAINT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('gh-theme')==='dark'?'dark':'light';d.setAttribute('data-theme',t);if(t==='dark')d.classList.add('dark')}catch(e){d.setAttribute('data-theme','light')}try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-pending','preloading');setTimeout(function(){d.classList.remove('intro-pending','preloading')},12000)}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      // Lets Next turn smooth scrolling off during route changes.
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable}`}
      // The pre-paint script rewrites data-theme/class before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={PRE_PAINT} />
      </head>
      {/* Extensions like Grammarly stamp attributes on <body> before React
          hydrates; that one-level mismatch isn't ours, so it's silenced. */}
      <body suppressHydrationWarning>
        <LenisProvider>
          <Preloader />
          <Navbar />
          {children}
          <Footer />
          <ViewCursor />
          <ScrollReveal />
          <Toaster />
          <Analytics />
        </LenisProvider>
      </body>
    </html>
  );
}
