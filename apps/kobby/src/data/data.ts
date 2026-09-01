export interface ProjectItem {
  id: number;
  date: string;
  title: string;
  image: string;
  summary: string;
  description: string;
  technologies: string[];
  link: string;
  client: string;
  gallery: string[];
}

// Display order is the array order. The home page shows the first four; the
// /projects page shows all of them.
export const projects: ProjectItem[] = [
  {
    id: 1,
    date: "2026",
    title: "ACCRA 2026 Accreditation Management System",
    image: "/projects/accra/accreditation-system.png",
    summary:
      "An end-to-end accreditation platform for an international athletics event in Accra — replacing spreadsheets and hand-printed passes with delegation self-onboarding, QR badges, and zone-level venue access control for thousands of athletes, officials, media, and VIP guests.",
    description:
      "A major athletics event moves thousands of people into a city in a matter of days — athletes, team officials, media, and VIP guests arriving from dozens of countries, every one of whom has to be verified, badged, and routed through secured venue zones. That work traditionally runs on spreadsheets, email chains, and hand-printed passes: slow to administer, painful to correct, and leaving real gaps at the gate on competition day. ACCRA 2026 replaces it with one system. Federations and delegations receive tokenized invite links and onboard their own members, moving data entry to the people who actually hold the information; organisers then review applications by accreditation category and issue QR-coded badges generated as print-ready PDFs that holders can download themselves. An access matrix maps each category to the venue zones it may enter, and gate staff scan badges on site to check people in against those rules — so access control is enforced by the badge rather than by a printed list. Certificates are issued with public verification by number, and every action is written to an audit trail for post-event reporting. It ships as two Next.js applications against a shared API — a public portal for applicants and delegations, and an operations dashboard for accreditation staff — localized in English, French, Spanish, and Portuguese so international delegations can complete onboarding in their own language.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "TanStack Query", "pdf-lib", "next-intl"],
    link: "https://www.fasigms.africa/",
    client: "Ghana Athletics Association",
    gallery: [
      "/projects/accra/Accreditation-Portal-05-31-2026_07_29_PM.png",
      "/projects/accra/Accreditation-Portal-05-31-2026_07_35_PM.png",
      "/projects/accra/Accredit-Pro-—-Admin-05-31-2026_07_31_PM.png",
      "/projects/accra/Accredit-Pro-—-Admin-05-31-2026_07_33_PM.png",
      "/projects/accra/Accredit-Pro-—-Admin-05-31-2026_07_34_PM.png",
    ],
  },
  {
    id: 2,
    date: "2026",
    title: "EnS Creatives",
    image: "/projects/ens/ens-1.png",
    summary:
      "A fabrication and design studio whose portfolio is its sales pitch — so instead of a static site they'd have to email me to update, I built them a full-stack website with a custom CMS that lets them publish new work, reorder the gallery, and answer inquiries themselves.",
    description:
      "EnS Creatives builds physical things — laser-cut metal panels, pergola canopies, estate gates, patterned screens, sculpted POP ceilings. For a studio like that the portfolio *is* the sales pitch: a prospective client decides whether to call based on whether the last job looks like the one they're imagining. The problem is that finished work arrives constantly, and on a static site every new photo means emailing a developer and waiting. The gallery goes stale, the best jobs never make it online, and the site slowly stops representing the business. So rather than hand over a site they couldn't touch, I built the CMS with it. The team signs in and manages the gallery directly — uploading a project, tagging it by category, dragging it into the order they want it seen, and toggling it live or holding it back as a draft. They maintain their own service listings and team profiles, and inbound project requests land in an Inquiries inbox inside the same dashboard instead of scattering across a shared email account. It runs as a Turborepo monorepo with two Next.js apps — the public site and the admin dashboard — sharing one typed Prisma schema against PostgreSQL, with images offloaded to Cloudflare R2 so a gallery that grows every month never bloats the database or the repository. The result is a site the client actually owns: I hand over the keys, and their newest work is online the same day it's finished.",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Prisma",
      "PostgreSQL",
      "Cloudflare R2",
      "Turborepo",
    ],
    link: "https://ens-ens-client.vercel.app/",
    client: "EnS Creatives",
    gallery: [
      "/projects/ens/ens-2.png",
      "/projects/ens/ens-3.png",
      "/projects/ens/ens-4.png",
      "/projects/ens/ens-5.png",
      "/projects/ens/ens-6.png",
    ],
  },
  {
    id: 3,
    date: "2025",
    title: "Me-fie",
    image: "/projects/Me-fie.png",
    summary:
      "Me Fie is a cultural platform that celebrates Ghana's heritage through raffles, events, and community initiatives, fostering authentic experiences and supporting local businesses.",
    description:
      "Me Fie is a cultural and lifestyle platform dedicated to showcasing and celebrating Ghana's vibrant heritage—welcoming Ghanaians, the diaspora, and curious explorers alike. Through prize competitions, events, and community initiatives, Me Fie connects people with authentic Ghanaian experiences, promotes local businesses, and builds a global, culturally rooted community. Their mission is to make Ghana inspiring, accessible, and unforgettable—delivering this through engaging raffles, collaborations with iconic brands and events, and impactful “Give Back” campaigns that support communities across Ghana",
    technologies: ["Laravel Blade", "TailwindCSS", "Laravel", "MySQL"],
    link: "https://www.me-fie.com",
    client: "Me Fie",
    gallery: [
      "/projects/me-fie/me-fie-2.png",
      "/projects/me-fie/me-fie-3.png",
      "/projects/me-fie/me-fie-4.png",
      "/projects/me-fie/me-fie-5.png",
    ],
  },
  {
    id: 4,
    date: "2025",
    title: "Kweku Smoke",
    image: "/projects/Kweku-Smoke.png",
    summary:
      "Kweku Smoke's website is a modern artist platform that showcases his music, story, tours, and merchandise—highlighting his fusion of Ghanaian rhythms with trap and afrobeats in a sleek, engaging way",
    description:
      "Kweku Smoke is an immersive artist platform showcasing the Ghanaian musician's creative universe. It blends rich biography, media galleries, merchandise, upcoming tour dates, and music previews in a sleek, navigable layout. The site highlights Kweku's connection to Accra, his innovative fusion of West African rhythms and trap/afrobeats, and positions him as a boundary-pushing voice in contemporary African music",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Spotify API"],
    link: "https://kwekusmokenow.com",
    client: "Kweku Smoke",
    gallery: [
      "/projects/kweku/kweku-smoke-2.png",
      "/projects/kweku/kweku-smoke-3.png",
      "/projects/kweku/kweku-smoke-4.png",
      "/projects/kweku/kweku-smoke-5.png",
    ],
  },
  {
    id: 5,
    date: "2026",
    title: "Ghanaian Support Network",
    image: "/projects/gsn/gsn.png",
    summary:
      "A full-stack website and custom CMS for a UK community interest company supporting Ghanaians and Black and ethnic minority communities — every page and content collection editable in-house, with live preview, so a small team can keep the site current without a developer.",
    description:
      "The Ghanaian Support Network is a UK community interest company supporting Ghanaians and Black and ethnic minority communities through advice, education, wellbeing, and practical support. An organisation like this lives or dies on looking active: funders, partners, and the people who actually need the help all judge it by whether the programme listed on the site is running this month or finished last year. But a small charity has no developer on call, so on a static site every event date, gallery photo, and partner logo becomes a request someone has to make and then wait for — and in practice the site quietly freezes while the work carries on without it. So the website ships with its own CMS, built on the same model the commercial headless platforms use: single types for the pages that exist exactly once — Home, About, Programs, Get Involved, Contact — and collection types for everything that recurs, including hero slides, programs and events, articles, gallery images, partners, team members, involvement ways, and testimonials. Each page is edited section by section through structured fields rather than a wall of markup — an eyebrow, a heading, a rich-text body, an image — and a live preview renders the result beside the editor, so a coordinator can see exactly what a visitor will see before anything is published. Nobody needs to understand the layout to change a headline. It runs as a Turborepo monorepo with two Next.js applications, the public site and the admin dashboard, over one typed Prisma schema on PostgreSQL, with media offloaded to Cloudflare R2. The charity owns its own website, and I am not a bottleneck in the middle of it.",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Prisma",
      "PostgreSQL",
      "Cloudflare R2",
      "Turborepo",
    ],
    // Live URL withheld — the deployed site currently has an issue. Restore
    // https://www.ghanaiansupportnetwork.com once it's resolved; an empty
    // string hides the external "View Project" link on the detail page.
    link: "https://gsncic-gsncic-two.vercel.app/",
    client: "Ghanaian Support Network CIC",
    gallery: [
      "/projects/gsn/gsn-1.png",
      "/projects/gsn/gsn-2.png",
      "/projects/gsn/gsn-3.png",
      "/projects/gsn/gsn-4.png",
      "/projects/gsn/gsn-5.png",
    ],
  },
  {
    id: 6,
    date: "2024",
    title: "HDF Ghana Limited",
    image: "/projects/HDF-Ghana.png",
    summary:
      "HDF Ghana Limited, established in 2019 in Accra, specializes in custom cabinetry for kitchens, wardrobes, and bathrooms, blending craftsmanship with functional design",
    description:
      "HDF Ghana Limited, founded in 2019 in Accra, delivers tailor-made cabinetry solutions for kitchens, wardrobes, and bathroom vanities—blending craftsmanship with functional design to create elegant, durable spaces through design, survey, and expert installation services.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vimeo"],
    link: "https://hdf-ghana.vercel.app",
    client: "HDF Ghana Limited",
    gallery: [
      "/projects/hdf/hdf-2.png",
      "/projects/hdf/hdf-3.png",
      "/projects/hdf/hdf-4.png",
      "/projects/hdf/hdf-5.png",
    ],
  },
  {
    id: 7,
    date: "2023",
    title: "DigiGrowth",
    image: "/projects/digi-growth.png",
    summary:
      "DigiGrowth is a digital marketing agency that specializes in SEO, PPC, and social media marketing, helping businesses improve their online presence and drive more traffic to their websites.",
    description:
      "DigiGrowth is a digital marketing agency that specializes in SEO, PPC, and social media marketing, helping businesses improve their online presence and drive more traffic to their websites.",
    technologies: ["Next.js", "TailwindCSS", "TypeScript"],
    link: "https://digi-growth.vercel.app",
    client: "DigiGrowth",
    gallery: [
      "/projects/digi-growth/digi-growth-2.png",
      "/projects/digi-growth/digi-growth-3.png",
      "/projects/digi-growth/digi-growth-4.png",
      "/projects/digi-growth/digi-growth-5.png",
    ],
  },
  // {
  //   id: 7,
  //   date: "2026",
  //   title: "iTrain Basketball",
  //   image: "/projects/digi-growth.png",
  //   summary:
  //     "iTrain is a leading basketball academy that develops players' skills through daily training and personalized coaching.",
  //   description:
  //     "iTrain is a top basketball academy that helps players improve their skills and prepare for professional careers. The academy focuses on daily, intense training to help athletes succeed at higher levels. Coaches provide personalized attention to ensure players stay fully engaged and dedicated to their development.",
  //   technologies: ["Next.js", "TailwindCSS", "TypeScript", "Prisma", "NextAuth"],
  //   link: "https://i-train-phi.vercel.app",
  //   client: "iTrain Basketball",
  //   gallery: [
  //     "/projects/itrain/itrain-2.png",
  //     "/projects/itrain/itrain-3.png",
  //     "/projects/itrain/itrain-4.png",
  //     "/projects/itrain/itrain-5.png",
  //   ],
  // },
];

export interface ContactDetails {
  /** Shown as the mailto: target and the visible label. */
  email: string;
  /**
   * Digits only, including country code and no "+" or spaces — this is what
   * wa.me expects (e.g. "233201234567" for +233 20 123 4567).
   */
  whatsappNumber: string;
  /** Human-readable form of the same number, shown to the reader. */
  whatsappLabel: string;
}

export const contact: ContactDetails = {
  email: "k.hoenyefia@gmail.com",
  whatsappNumber: "233557742987",
  whatsappLabel: "+233 55 774 2987",
};
