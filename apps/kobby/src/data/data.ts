import type { ContactDetails, Project, SocialLink } from "@/types/project";

// Display order is the array order. Featured projects render as case-study
// cards (home stack + /projects); the rest appear under "Also built".
const PROJECT_DATA: Project[] = [
  {
    id: 1,
    slug: "accra-2026",
    featured: true,
    title: "ACCRA 2026 Accreditation Management System",
    short: "ACCRA 2026",
    category: "EVENT PLATFORM",
    year: "2026",
    client: "Ghana Athletics Association",
    image: "/projects/accra/accreditation-system.png",
    hue: 80,
    headline: "Accrediting an African championship, end to end",
    highlights: [
      { value: "4", label: "Interface languages" },
      { value: "2", label: "Next.js apps, one API" },
    ],
    walkthrough: [
      {
        src: "/projects/accra/Accreditation-Portal-05-31-2026_07_29_PM.png",
        title: "Track an application",
        text: "Applicants check their accreditation status with nothing but the email they applied with. No account, no password to forget.",
      },
      {
        src: "/projects/accra/Accreditation-Portal-05-31-2026_07_35_PM.png",
        title: "Delegation portal",
        text: "Federation admins share a tokenized onboarding link with their members, then follow applications, approvals, and issued badges from one dashboard.",
      },
      {
        src: "/projects/accra/Accredit-Pro-—-Admin-05-31-2026_07_34_PM.png",
        title: "Staff sign-in",
        text: "Accreditation staff work in a separate operations app, kept apart from the public portal.",
      },
      {
        src: "/projects/accra/Accredit-Pro-—-Admin-05-31-2026_07_31_PM.png",
        title: "Operations dashboard",
        text: "Live counts of accredited participants, badges issued, pending reviews, and on-site scans, with a review queue and zone activity as it happens.",
      },
      {
        src: "/projects/accra/Accredit-Pro-—-Admin-05-31-2026_07_33_PM.png",
        title: "Print-ready badges",
        text: "Approved participants get QR-coded badges, front and back, listing exactly which venue zones they can enter. Ready to print or download as PDF.",
      },
    ],
    summary:
      "An end-to-end accreditation platform for an international athletics event in Accra, replacing spreadsheets and hand-printed passes with delegation self-onboarding, QR badges, and zone-level venue access control for thousands of athletes, officials, media, and VIP guests.",
    challenge:
      "A major athletics event moves thousands of people into a city in a matter of days — athletes, team officials, media, and VIP guests arriving from dozens of countries, every one of whom has to be verified, badged, and routed through secured venue zones. That work traditionally runs on spreadsheets, email chains, and hand-printed passes: slow to administer, painful to correct, and leaving real gaps at the gate on competition day.",
    approach:
      "ACCRA 2026 replaces it with one system. Federations and delegations receive tokenized invite links and onboard their own members, moving data entry to the people who actually hold the information; organisers then review applications by accreditation category and issue QR-coded badges generated as print-ready PDFs that holders can download themselves. An access matrix maps each category to the venue zones it may enter, and gate staff scan badges on site to check people in against those rules — so access control is enforced by the badge rather than by a printed list. Certificates are issued with public verification by number, and every action is written to an audit trail for post-event reporting.",
    features: [
      "Delegation self-onboarding",
      "QR-coded accreditation badges",
      "Zone-level venue access control",
      "Multi-language interface",
    ],
    decisions:
      "It ships as two Next.js applications against a shared API — a public portal for applicants and delegations, and an operations dashboard for accreditation staff — localized in English, French, Spanish, and Portuguese so international delegations can complete onboarding in their own language.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "pdf-lib",
      "next-intl",
    ],
    link: "https://www.fasigms.africa/",
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
    slug: "mefie-directory",
    featured: true,
    title: "Me-fie Directory",
    short: "Me-fie Directory",
    category: "DIRECTORY",
    year: "2026",
    client: "Me Fie",
    image: "/projects/mefie-d/mefied.png",
    hue: 135,
    headline: "One directory for Ghanaian businesses, at home and abroad",
    highlights: [
      { value: "2", label: "Countries: Ghana and the UK" },
      { value: "3", label: "Businesses, events, communities" },
    ],
    walkthrough: [
      {
        src: "/projects/mefie-d/mefie-1.png",
        title: "Discover what's near",
        text: "Visitors land on top businesses for their country, with verification badges and reviews doing the work a personal recommendation used to.",
      },
      {
        src: "/projects/mefie-d/mefie-2.png",
        title: "Browse businesses",
        text: "Category chips, a country switcher, and search narrow the directory, and every filter lives in the URL so a result can be shared as a link.",
      },
      {
        src: "/projects/mefie-d/mefie-3.png",
        title: "Find events",
        text: "Upcoming events with dates, venues, and ticket links, so discovery ends in a booking rather than a forwarded flyer.",
      },
      {
        src: "/projects/mefie-d/mefie-4.png",
        title: "Connect with communities",
        text: "Community groups, charities, and consular services for Ghanaians in Ghana and the UK, side by side with businesses and events.",
      },
    ],
    summary:
      "A multi-country directory of Ghanaian-owned businesses, events, and communities across Ghana and the UK. Vendors manage their own listings, and visitors filter by country, category, and date with every result shareable straight from the URL.",
    challenge:
      "Ghanaian businesses and events live in fragments: an Instagram bio here, a WhatsApp broadcast there, a flyer forwarded so many times nobody knows whose event it was. If you have just moved to London and want Ghanaian food tonight, or you are in Accra wondering what is on this weekend, there is no single place to look — and for the business owner, being findable means maintaining a presence on platforms that were never built for a small business in the first place.",
    approach:
      'Me-fie Directory is that single place. Businesses, events, and communities sit side by side across Ghana and the United Kingdom, with a country switcher because the same audience lives on both ends of that route. Vendors claim their own listing and keep it current instead of filing a request with somebody; verification badges and customer reviews do the work a personal recommendation used to do; and events carry venue, date, and ticket links so discovery ends in a booking rather than a dead end. The country, category, and date filters are held in the URL, so "food festivals in Accra this month" is a link you can send to a friend rather than a set of steps you have to describe.',
    features: [
      "Vendor-managed listings",
      "Filtering by country, category, and date",
      "Shareable, URL-driven search state",
      "Map-based discovery",
    ],
    decisions:
      "It runs as a Turborepo monorepo — a public client and an operations dashboard — with TanStack Query over a typed Axios layer, React Hook Form and Zod on every input, Mapbox placing listings on a map, one-time-code sign-in so a phone number is enough to get in, and Recharts giving the team a read on what people are actually searching for.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Mapbox"],
    link: "https://mefiedirectory.com",
    gallery: [
      "/projects/mefie-d/mefie-1.png",
      "/projects/mefie-d/mefie-2.png",
      "/projects/mefie-d/mefie-3.png",
      "/projects/mefie-d/mefie-4.png",
    ],
  },
  {
    id: 10,
    slug: "yahnda",
    featured: true,
    title: "YAHNDA",
    short: "YAHNDA",
    category: "TRUST PLATFORM",
    year: "2026",
    client: "YAHNDA",
    image: "/projects/yahnda/yahnda-1.png",
    hue: 280,
    headline: "Check the seller before you send the money",
    highlights: [
      { value: "3", label: "Apps in one monorepo" },
      { value: "4", label: "Trust queues: KYC to legal" },
    ],
    summary:
      "A trust-verification platform for Ghanaian businesses. Buyers check a seller before they send money, and sellers prove they're real with verification, reviews, and a trust badge they can share.",
    challenge:
      "Much of Ghana's buying and selling happens through Instagram, TikTok, and WhatsApp handles. A buyer often has to send money before they can tell whether a seller is real, and honest businesses have no simple way to prove they are.",
    approach:
      "YAHNDA puts a trust check in front of the payment. Anyone can look a seller up by business name or social handle, browse by category, and read verified reviews before they buy. Businesses go through verification, invite their customers to review them, and earn a trust badge and a YAHNDA Trust URL to put on their social pages. Behind it, a trust console lets the team work through KYC checks, review moderation, fraud cases, and legal dossiers, with every decision in an audit log.",
    features: [
      "Seller lookup by business name or social handle",
      "Verified trust badge and a shareable Trust URL",
      "Review invitations, with moderation behind them",
      "KYC, fraud, and audit console for the trust team",
    ],
    decisions:
      "It runs as three Next.js apps in one Turborepo monorepo — the public site, the merchant portal, and the admin console — sharing a component library, theme, and domain model. Data flows through TanStack Query over typed Axios services proxied to the backend API, React Hook Form and Zod guard every form, and search state lives in the URL. Image hosts are allowlisted rather than wildcarded, so the image optimizer can't be turned into an open proxy.",
    walkthrough: [
      {
        src: "/projects/yahnda/yahnda-1.png",
        title: "Check any seller",
        text: "The front door is a single lookup: paste a business name or a social link and see whether that seller has been checked, before any money moves.",
      },
      {
        src: "/projects/yahnda/yahnda-2.png",
        title: "Read the results",
        text: "Matches show at a glance whether a business is verified, claimed, and how it's been reviewed, so an unverified seller stands out.",
      },
      {
        src: "/projects/yahnda/yahnda-3.png",
        title: "Get verified",
        text: "Businesses choose how far to be verified. Every tier includes a Trust URL for their social pages, review invitations, and linked accounts.",
      },
      {
        src: "/projects/yahnda/yahnda-4.png",
        title: "The trust console",
        text: "The team works through KYC checks, review moderation, fraud cases, and legal dossiers from one console, with an audit log behind every decision.",
      },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zod",
      "Turborepo",
    ],
    gallery: [
      "/projects/yahnda/yahnda-2.png",
      "/projects/yahnda/yahnda-3.png",
      "/projects/yahnda/yahnda-4.png",
    ],
  },
  {
    id: 3,
    slug: "ens-creatives",
    // Moved to "Also built" when YAHNDA joined the featured work.
    featured: false,
    title: "EnS Creatives",
    short: "EnS Creatives",
    category: "FULL-STACK · CMS",
    year: "2026",
    client: "EnS Creatives",
    image: "/projects/ens/ens-1.png",
    hue: 25,
    walkthrough: [
      {
        src: "/projects/ens/ens-2.png",
        title: "The showcase",
        text: "The gallery is the sales pitch: finished work up front, filterable by metal fabrication or POP ceilings.",
      },
      {
        src: "/projects/ens/ens-3.png",
        title: "The studio",
        text: "The about page sets out the studio's mission and track record, so clients know who is behind the work.",
      },
      {
        src: "/projects/ens/ens-4.png",
        title: "Why EnS",
        text: "A bold, industrial voice that matches the work itself, built on the studio's standards for precision.",
      },
      {
        src: "/projects/ens/ens-5.png",
        title: "Request a project",
        text: "A structured project request form, direct contact lines, and a map to the workshop. Every request lands in the team's inbox.",
      },
      {
        src: "/projects/ens/ens-6.png",
        title: "Their own CMS",
        text: "The team adds new work, sets its category, orders the gallery, and toggles each piece live or draft. No developer needed.",
      },
    ],
    summary:
      "A fabrication and design studio whose portfolio is its sales pitch. A full-stack website with a custom CMS that lets the team publish new work, reorder the gallery, and answer inquiries themselves.",
    challenge:
      "EnS Creatives builds physical things — laser-cut metal panels, pergola canopies, estate gates, patterned screens, sculpted POP ceilings. For a studio like that the portfolio is the sales pitch: a prospective client decides whether to call based on whether the last job looks like the one they're imagining. The problem is that finished work arrives constantly, and on a static site every new photo means emailing a developer and waiting. The gallery goes stale, the best jobs never make it online, and the site slowly stops representing the business.",
    approach:
      "So rather than hand over a site they couldn't touch, I built the CMS with it. The team signs in and manages the gallery directly — uploading a project, tagging it by category, dragging it into the order they want it seen, and toggling it live or holding it back as a draft. They maintain their own service listings and team profiles, and inbound project requests land in an Inquiries inbox inside the same dashboard instead of scattering across a shared email account.",
    features: [
      "Custom CMS for publishing new work",
      "Drag-to-reorder gallery",
      "Inquiry management",
      "Media storage on Cloudflare R2",
    ],
    decisions:
      "It runs as a Turborepo monorepo with two Next.js apps — the public site and the admin dashboard — sharing one typed Prisma schema against PostgreSQL, with images offloaded to Cloudflare R2 so a gallery that grows every month never bloats the database or the repository.",
    results:
      "The result is a site the client actually owns: I hand over the keys, and their newest work is online the same day it's finished.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Cloudflare R2",
      "Turborepo",
    ],
    link: "https://ens-ens-client.vercel.app/",
    gallery: [
      "/projects/ens/ens-2.png",
      "/projects/ens/ens-3.png",
      "/projects/ens/ens-4.png",
      "/projects/ens/ens-5.png",
      "/projects/ens/ens-6.png",
    ],
  },
  {
    id: 4,
    slug: "mefie",
    featured: true,
    title: "Me-fie",
    short: "Me-fie",
    category: "CULTURAL PLATFORM",
    year: "2025",
    client: "Me Fie",
    image: "/projects/Me-fie.png",
    hue: 120,
    headline: "Bringing people closer to Ghana, one draw at a time",
    highlights: [
      { value: "3", label: "Ways in: draws, winners, giving back" },
    ],
    walkthrough: [
      {
        src: "/projects/me-fie/me-fie-3.png",
        title: "Enter competitions",
        text: "Live prize draws, from holidays in Ghana to concert tickets, filterable by live competitions, rewards, and top picks.",
      },
      {
        src: "/projects/me-fie/me-fie-2.png",
        title: "Meet the winners",
        text: "Real winners and what they won, front and centre, so every entry feels like a real chance.",
      },
      {
        src: "/projects/me-fie/me-fie-4.png",
        title: "Give back Ghana",
        text: "The community projects that entries help fund, each with its location and the impact it made.",
      },
      {
        src: "/projects/me-fie/me-fie-5.png",
        title: "The story",
        text: "Who Me-fie is and its mission: making Ghana accessible to everyone, wherever they are in the world.",
      },
    ],
    summary:
      "A cultural platform that celebrates Ghana's heritage through raffles, events, and community initiatives, fostering authentic experiences and supporting local businesses.",
    overview:
      "Me Fie is a cultural and lifestyle platform dedicated to showcasing and celebrating Ghana's vibrant heritage — welcoming Ghanaians, the diaspora, and curious explorers alike. Through prize competitions, events, and community initiatives, Me Fie connects people with authentic Ghanaian experiences, promotes local businesses, and builds a global, culturally rooted community. Their mission is to make Ghana inspiring, accessible, and unforgettable — delivering this through engaging raffles, collaborations with iconic brands and events, and impactful “Give Back” campaigns that support communities across Ghana.",
    features: ["Raffles", "Events", "Community initiatives", "Local business support"],
    technologies: ["Laravel Blade", "Tailwind CSS", "MySQL"],
    link: "https://www.me-fie.com",
    gallery: [
      "/projects/me-fie/me-fie-2.png",
      "/projects/me-fie/me-fie-3.png",
      "/projects/me-fie/me-fie-4.png",
      "/projects/me-fie/me-fie-5.png",
    ],
  },
  {
    id: 9,
    slug: "bridgecap",
    featured: false,
    title: "Bridgecap Microcredit",
    short: "Bridgecap",
    category: "FINTECH WEBSITE",
    year: "2026",
    client: "Bridgecap Microcredit Enterprise",
    image: "/projects/bridgecap/bridgecap-1.png",
    hue: 255,
    walkthrough: [
      {
        src: "/projects/bridgecap/bridgecap-1.png",
        title: "Apply or ask",
        text: "The first screen offers two clear paths: apply for a loan, or chat on WhatsApp first.",
      },
      {
        src: "/projects/bridgecap/bridgecap-2.png",
        title: "Built on trust",
        text: "The mission and the numbers that matter to a borrower: clients served and average approval time.",
      },
      {
        src: "/projects/bridgecap/bridgecap-3.png",
        title: "Why Bridgecap",
        text: "Transparent terms, local understanding, and long-term partnership, explained without financial jargon.",
      },
    ],
    summary:
      "A website for a Ghanaian microcredit enterprise offering fast, accessible, and flexible loans to individuals, entrepreneurs, and small businesses, built to turn visitors into loan applicants.",
    overview:
      "Bridgecap was founded on the belief that access to capital should be a catalyst, not a hurdle. The site presents its loan products, requirements, and impact in plain language, for the market trader restocking inventory, the young professional bridging a rent gap, and the SME scaling operations. Every page leads to one of two clear next steps: apply for a loan, or start a conversation on WhatsApp.",
    features: [
      "Loan products and requirements explained in plain language",
      "Apply-for-loan flow surfaced from every page",
      "Direct WhatsApp chat for questions before applying",
      "Impact and mission storytelling for trust",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    gallery: ["/projects/bridgecap/bridgecap-2.png", "/projects/bridgecap/bridgecap-3.png"],
  },
  {
    id: 6,
    slug: "ghanaian-support-network",
    featured: false,
    title: "Ghanaian Support Network",
    short: "GSN",
    category: "COMMUNITY · CMS",
    year: "2026",
    client: "Ghanaian Support Network CIC",
    image: "/projects/gsn/gsn.png",
    hue: 155,
    summary:
      "A full-stack website and custom CMS for a UK community interest company supporting Ghanaians and Black and ethnic minority communities, with every page editable in-house and a live preview, so a small team can keep the site current without a developer.",
    challenge:
      "The Ghanaian Support Network is a UK community interest company supporting Ghanaians and Black and ethnic minority communities through advice, education, wellbeing, and practical support. An organisation like this lives or dies on looking active: funders, partners, and the people who actually need the help all judge it by whether the programme listed on the site is running this month or finished last year. But a small charity has no developer on call, so on a static site every event date, gallery photo, and partner logo becomes a request someone has to make and then wait for — and in practice the site quietly freezes while the work carries on without it.",
    approach:
      "So the website ships with its own CMS, built on the same model the commercial headless platforms use: single types for the pages that exist exactly once — Home, About, Programs, Get Involved, Contact — and collection types for everything that recurs, including hero slides, programs and events, articles, gallery images, partners, team members, involvement ways, and testimonials. Each page is edited section by section through structured fields rather than a wall of markup — an eyebrow, a heading, a rich-text body, an image — and a live preview renders the result beside the editor, so a coordinator can see exactly what a visitor will see before anything is published. Nobody needs to understand the layout to change a headline.",
    features: [
      "Single and collection content types",
      "Section-by-section structured editing",
      "Live preview beside the editor",
      "Media storage on Cloudflare R2",
    ],
    decisions:
      "It runs as a Turborepo monorepo with two Next.js applications, the public site and the admin dashboard, over one typed Prisma schema on PostgreSQL, with media offloaded to Cloudflare R2.",
    results: "The charity owns its own website, and I am not a bottleneck in the middle of it.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Cloudflare R2",
      "Turborepo",
    ],
    // Live URL withheld from the public domain while the deployed site has an
    // issue — restore https://www.ghanaiansupportnetwork.com once resolved.
    link: "https://gsncic-gsncic-two.vercel.app/",
    gallery: [
      "/projects/gsn/gsn-1.png",
      "/projects/gsn/gsn-2.png",
      "/projects/gsn/gsn-3.png",
      "/projects/gsn/gsn-4.png",
      "/projects/gsn/gsn-5.png",
    ],
  },
  {
    id: 7,
    slug: "hdf-ghana",
    featured: false,
    title: "HDF Ghana Limited",
    short: "HDF Ghana",
    category: "BUSINESS WEBSITE",
    year: "2024",
    client: "HDF Ghana Limited",
    image: "/projects/HDF-Ghana.png",
    hue: 55,
    summary: "A modern digital presence for a custom cabinetry and interior solutions business.",
    overview:
      "HDF Ghana Limited, founded in 2019 in Accra, delivers tailor-made cabinetry solutions for kitchens, wardrobes, and bathroom vanities — blending craftsmanship with functional design to create elegant, durable spaces through design, survey, and expert installation services.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vimeo"],
    link: "https://hdf-ghana.vercel.app",
    gallery: [
      "/projects/hdf/hdf-2.png",
      "/projects/hdf/hdf-3.png",
      "/projects/hdf/hdf-4.png",
      "/projects/hdf/hdf-5.png",
    ],
  },
  {
    id: 5,
    slug: "kweku-smoke",
    featured: false,
    status: "in-progress",
    title: "Kweku Smoke",
    short: "Kweku Smoke",
    category: "ARTIST WEBSITE",
    year: "2025",
    client: "Kweku Smoke",
    image: "/projects/Kweku-Smoke.png",
    hue: 10,
    summary:
      "An artist-focused digital experience showcasing music, identity, tours, and merchandise.",
    overview:
      "Kweku Smoke is an immersive artist platform showcasing the Ghanaian musician's creative universe. It blends rich biography, media galleries, merchandise, upcoming tour dates, and music previews in a sleek, navigable layout. The site highlights Kweku's connection to Accra, his innovative fusion of West African rhythms and trap/afrobeats, and positions him as a boundary-pushing voice in contemporary African music.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Spotify API"],
    link: "https://kwekusmokenow.com",
    gallery: [
      "/projects/kweku/kweku-smoke-2.png",
      "/projects/kweku/kweku-smoke-3.png",
      "/projects/kweku/kweku-smoke-4.png",
      "/projects/kweku/kweku-smoke-5.png",
    ],
  },
  {
    id: 8,
    slug: "digigrowth",
    featured: false,
    title: "DigiGrowth",
    short: "DigiGrowth",
    category: "AGENCY WEBSITE",
    year: "2023",
    client: "DigiGrowth",
    image: "/projects/digi-growth.png",
    hue: 225,
    summary:
      "A digital marketing agency website focused on communicating services and driving business growth.",
    overview:
      "DigiGrowth is a digital marketing agency that specializes in SEO, PPC, and social media marketing, helping businesses improve their online presence and drive more traffic to their websites.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://digi-growth.vercel.app",
    gallery: [
      "/projects/digi-growth/digi-growth-2.png",
      "/projects/digi-growth/digi-growth-3.png",
      "/projects/digi-growth/digi-growth-4.png",
      "/projects/digi-growth/digi-growth-5.png",
    ],
  },
  {
    id: 11,
    slug: "evora",
    featured: false,
    status: "in-progress",
    title: "Evora",
    short: "Evora",
    category: "EVENT ATTENDANCE",
    year: "2026",
    client: "Evora",
    // Screenshots to come — the card shows a "screens coming soon" panel until then.
    image: "",
    hue: 45,
    summary:
      "Event attendance, made simple. Organisations create an event, share a custom sign-in form or run it on a tablet kiosk at the door, and finish with attendance records and reports.",
    features: [
      "Event creation, held as a draft until the doors open",
      "Custom attendance forms with preset fields",
      "Full-screen tablet kiosk for sign-in at the door",
      "Attendance records and reports, ready to export",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Turborepo",
      "Express.js",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Cloudflare",
      "Better Auth",
    ],
    link: "https://evora-rust.vercel.app",
    gallery: [],
  },
  {
    id: 12,
    slug: "afrora",
    featured: false,
    status: "in-progress",
    title: "Afróra",
    short: "Afróra",
    category: "FASHION MARKETPLACE",
    year: "2026",
    client: "Afróra",
    image: "/projects/afrora/afrora-1.png",
    hue: 38,
    brand: "#EE5A29",
    summary:
      "An African fashion marketplace where shoppers find authentic pieces from verified independent vendors, protected by buyer protection that releases payment only when an order arrives as described.",
    features: [
      "Buyer protection: payment released on delivery as described",
      "Verified shops and independent vendors",
      "Product search with category and price filters",
      "Vendor dashboard for orders, earnings, and payouts",
    ],
    walkthrough: [
      {
        src: "/projects/afrora/afrora-1.png",
        title: "Fresh from the makers",
        text: "New pieces from African designers and labels up front, with buyer protection, verified shops, and independent vendors set out from the start.",
      },
      {
        src: "/projects/afrora/afrora-2.png",
        title: "Shop everything",
        text: "Thrift finds, bespoke tailoring, and brand-new staples in one catalogue, filtered by category and price range.",
      },
      {
        src: "/projects/afrora/afrora-4.png",
        title: "Curated collections",
        text: "Categories are presented as collections, from accessories and jewellery to footwear, so browsing feels like walking through a shop.",
      },
      {
        src: "/projects/afrora/afrora-3.png",
        title: "Explore the vendors",
        text: "Shoppers can browse the shops themselves, filtered by type, rating, and location, with verified shops marked clearly.",
      },
      {
        src: "/projects/afrora/afrora-5.png",
        title: "The vendor dashboard",
        text: "Each seller runs their shop from one dashboard: revenue, payments pending release, orders, inquiries, and payouts.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://afrora.vercel.app",
    gallery: [
      "/projects/afrora/afrora-2.png",
      "/projects/afrora/afrora-3.png",
      "/projects/afrora/afrora-4.png",
      "/projects/afrora/afrora-5.png",
    ],
  },
];

/**
 * Display order across the site: the All projects list, case-study numbering
 * and "Next project". Featured work first, then in-progress, then the rest.
 * Projects not listed here follow in the order they appear above.
 */
const PROJECT_ORDER = [
  "accra-2026",
  "mefie-directory",
  "yahnda",
  "mefie",
  "evora",
  "afrora",
  "kweku-smoke",
  "ens-creatives",
  "ghanaian-support-network",
];

export const projects: Project[] = [
  ...PROJECT_ORDER.map((slug) => PROJECT_DATA.find((p) => p.slug === slug)).filter(
    (p): p is Project => !!p
  ),
  ...PROJECT_DATA.filter((p) => !PROJECT_ORDER.includes(p.slug)),
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

/**
 * The home page's "Recent work" grid, hand-picked and in this order. The rest
 * of the non-featured work lives on /projects.
 */
const HOME_RECENT = ["evora", "afrora", "kweku-smoke", "ens-creatives"];
export const homeWebsites = HOME_RECENT.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => !!p
);

export const projectHref = (slug: string) => `/projects/${slug}`;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** "Next.js, TypeScript" → "NEXT.JS · TYPESCRIPT" — the mono stack line. */
export const stackLine = (p: Project) => p.technologies.join(" · ").toUpperCase();

/** Every screen a project has, cover first, without duplicates or empty slots. */
export const projectShots = (p: Project) =>
  Array.from(new Set([p.image, ...p.gallery])).filter(Boolean);

/** Two-digit index label: 1 → "01". */
export const pad2 = (n: number) => String(n).padStart(2, "0");

export const contact: ContactDetails = {
  email: "k.hoenyefia@gmail.com",
  whatsappNumber: "233557742987",
  whatsappLabel: "+233 55 774 2987",
};

export const socials: SocialLink[] = [
  { label: "GITHUB", href: "https://github.com/K-0bby" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/" },
  { label: "X", href: "https://x.com/HoenyefiaGideon" },
  { label: "WHATSAPP", href: `https://wa.me/${contact.whatsappNumber}` },
];

/** Leave empty to point the nav "Resume" button at the contact footer. */
export const RESUME_URL = "";

export const capabilities = [
  {
    title: "Frontend Development",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Laravel Blade",
      "Tailwind CSS",
    ],
  },
  { title: "Mobile & Cross-Platform", items: ["React Native"] },
  {
    title: "Backend & Data",
    items: ["Node.js", "Express.js", "Prisma", "PostgreSQL", "Supabase"],
  },
  {
    title: "Tools & Workflow",
    items: [
      "Git",
      "Responsive Development",
      "Component Architecture",
      "Performance Optimization",
      "Accessibility",
    ],
  },
];

export const processSteps = [
  { title: "Understand", text: "Understand the problem, users, and desired outcome." },
  { title: "Architect", text: "Plan maintainable components and scalable solutions." },
  { title: "Build", text: "Translate designs into responsive, functional interfaces." },
  { title: "Refine", text: "Test, optimize, and improve the experience." },
];
