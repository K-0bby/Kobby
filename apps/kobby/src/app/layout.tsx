import type { Metadata, Viewport } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import CustomCursor from "@/components/ux/custom-cursor";
import Footer from "@/components/layout/footer";
import LenisProvider from "@/provider/lenis-provider";
import { Toaster } from "@repo/ui";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gideonhoenyefia.com"),
  title: "Gideon Hoenyefia",
  description:
    "Frontend Developer & Programmer with 3+ years of experience, proficient in web development and mobile app development. Building responsive and user-friendly interfaces.",
  keywords: [
    "Frontend Developer",
    "Programmer",
    "Mobile App Development",
    "Web Developer",
    "Gideon Hoenyefia",
  ],
  authors: [{ name: "Gideon Hoenyefia" }],
  creator: "Gideon Hoenyefia",
  publisher: "Gideon Hoenyefia",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Gideon Hoenyefia",
    description:
      "Frontend Developer & Programmer with 3+ years of experience, proficient in web development and mobile app development. Building responsive and user-friendly interfaces.",
    url: "https://gideonhoenyefia.com",
    type: "website",
    locale: "en_US",
    siteName: "Gideon Hoenyefia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gideon Hoenyefia",
      },
    ],
  },
  twitter: {
    title: "Gideon Hoenyefia",
    description:
      "Frontend Developer & Programmer with 3+ years of experience, proficient in web development and mobile app development. Building responsive and user-friendly interfaces.",
    card: "summary_large_image",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gideon Hoenyefia",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "google-site-verification",
    yandex: "yandex-verification",
    yahoo: "yahoo-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables sit on <html> so the font-sans / font-heading utilities,
    // which resolve against :root, can actually see them. The viewport <meta>
    // is emitted by the `viewport` export above — declaring it by hand here
    // would duplicate the tag.
    <html lang="en" className={`${outfit.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <LenisProvider>
          <CustomCursor type="figma" />
          <Navbar />
          <Analytics />
          {children}
          <Footer />
          <Toaster />
        </LenisProvider>
      </body>
    </html>
  );
}
