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
    architecture: {
      scope: "frontend",
      summary:
        "Two Next.js apps over the championship's accreditation API: a portal for delegations and applicants, and an operations console for accreditation staff, gate scanners and badge printers.",
      parts: [
        {
          name: "Applicant portal",
          text: "Invite-link onboarding, applications and tracking, delegation members, badges, and public certificate checks, in English, French, Spanish and Portuguese.",
        },
        {
          name: "Operations console",
          text: "Organisations, tournaments, applications, participants, the access matrix, venues and zones, certificates, reports and the audit trail.",
        },
        {
          name: "Gate check-in",
          text: "Badge QR codes scanned with the device camera, right in the browser, on accounts that can open the scanner and nothing else.",
        },
        {
          name: "Badges and certificates",
          text: "Print-ready PDFs drawn in the browser with pdf-lib on top of the event's own artwork: photo, name, category colour, zones and QR code.",
        },
        {
          name: "Roles at the edge",
          text: "Seven roles, from LOC admins to scanners and badge printers, each mapped to the pages it may open and checked before a page renders.",
        },
        {
          name: "Data layer",
          text: "TanStack Query for server data, React Hook Form and Zod for every form, Zustand for session state, and nuqs for filters in the URL.",
        },
      ],
      decisions: [
        {
          title: "Badges drawn in the browser",
          context:
            "Every athlete, official and journalist needs a personalised badge that matches the event's designed artwork exactly, and staff need to reprint one on the spot.",
          decision:
            "pdf-lib loads the event's blank badge PDF and draws each holder's photo, name, category colour, allowed zones and QR code onto it, with no server rendering step.",
          outcome:
            "Holders download their own print-ready badge, and a reprint is one click at the accreditation desk.",
        },
        {
          title: "Each role sees only its job",
          context:
            "Seven kinds of staff use one console, and a gate scanner has no business opening applications or the access matrix.",
          decision:
            "Middleware maps each role to the route prefixes it may open and redirects anything else before it renders. A scanner gets only check-in; a badge printer only participants and badges.",
          outcome:
            "Every account lands on exactly the screens its job needs, which keeps gate staff fast and the data out of the wrong hands.",
        },
        {
          title: "Onboarding in four languages",
          context:
            "Delegations arrive from across the continent, and a form in the wrong language means mistakes that someone has to fix at the gate.",
          decision:
            "The applicant portal runs on next-intl with full English, French, Spanish and Portuguese message files.",
          outcome:
            "Delegations onboard their own members in their own language.",
        },
      ],
    },
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
      "It runs as one Next.js app in front of a Laravel API, with every call passing through its own route handlers. React Hook Form and Zod guard every input, Mapbox places listings on a map, Google sign-in sits beside email, Pusher pushes role changes live, and Recharts gives the admin team a read on the directory.",
    architecture: {
      scope: "frontend",
      summary:
        "One Next.js app in front of a Laravel API: the public directory, plus a dashboard shared by customers, vendors, listing agents and admins. The browser only ever talks to the app; route handlers talk to Laravel.",
      parts: [
        {
          name: "Public directory",
          text: "Businesses, events and communities across Ghana and the UK, with search, categories, country detection and map discovery through Mapbox.",
        },
        {
          name: "One dashboard, four roles",
          text: "Customers, vendors, listing agents and admins share one /dashboard: listings, claims, reviews, events, collections, inquiries and analytics, each shown to the roles that need it.",
        },
        {
          name: "Backend-for-frontend",
          text: "Route handlers under /api forward every call to Laravel. The API address is a private setting, so it can change per environment without a rebuild.",
        },
        {
          name: "One directory pattern",
          text: "A generic data hook and page shell power /businesses, /events and /communities. Each page is configuration, not a copy.",
        },
        {
          name: "Live role changes",
          text: "Pusher tells the dashboard when someone's role changes, so a newly approved vendor gets vendor tools without signing in again.",
        },
        {
          name: "Rich editing",
          text: "A Tiptap rich-text editor for listing descriptions and FAQs, and drag-and-drop ordering for listing photos.",
        },
      ],
      decisions: [
        {
          title: "Every call goes through the app",
          context:
            "Calling Laravel from the browser would put the API address in the bundle, need every Vercel preview added to CORS, and crash pages whenever Laravel returned an HTML error page.",
          decision:
            "Route handlers forward each call to the private API address, read the reply as text first, and turn anything that isn't JSON into a structured error. They also pass on the visitor's IP so Laravel can work out their country.",
          outcome:
            "No CORS to maintain, no \"Unexpected token <\" crashes, and one place to add headers, logging or limits.",
        },
        {
          title: "Three directory pages, one abstraction",
          context:
            "Businesses, events and communities need the same fetching, filtering, grouping, pagination and empty states.",
          decision:
            "A generic hook fetches, cancels stale requests and maps each item. A shared page shell owns tabs, grouping and the grid, and each page fills its slots.",
          outcome:
            "A directory page is about 95 lines of configuration, and a fix to one applies to all three.",
        },
        {
          title: "Listing photos change all at once",
          context:
            "Replacing a listing's photos one at a time leaves it half-updated whenever one upload fails.",
          decision:
            "Changes are a media revision: new files are staged, processed on the server, then the full set is committed in one call. The old photos stay live until that commit succeeds.",
          outcome: "A listing never shows a half-saved gallery.",
        },
      ],
    },
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
    architecture: {
      scope: "frontend",
      summary:
        "Three Next.js apps in one Turborepo, sharing one component library, theme and domain model. Each talks to YAHNDA's API through its own /api path, with the session kept out of the browser's reach.",
      parts: [
        {
          name: "Public site",
          text: "Seller lookup by name or social handle, brand trust pages, reviews, buyer accounts and support.",
        },
        {
          name: "Merchant portal",
          text: "Onboarding and verification, review invites, the trust badge and Trust URL, team members, and plan upgrades paid through Paystack.",
        },
        {
          name: "Admin console",
          text: "KYC checks, review moderation, fraud cases and legal dossiers, with every decision in an audit log.",
        },
        {
          name: "Shared packages",
          text: "@repo/ui holds the components and dashboard primitives, @repo/types the domain (social identity, plans, the trust score), and one Tailwind config the theme tokens.",
        },
        {
          name: "Data layer",
          text: "Services only move data: Axios in, typed payload out. Reads go through TanStack Query hooks, forms through React Hook Form and Zod, and filters live in the URL.",
        },
        {
          name: "Session",
          text: "An httpOnly cookie, shared across subdomains in production, turned into a bearer token by each app's middleware on the way to the API.",
        },
      ],
      decisions: [
        {
          title: "The token never touches the browser",
          context:
            "A token kept where JavaScript can read it can be stolen by any script that gets onto the page.",
          decision:
            "The session lives in an httpOnly cookie. Middleware on /api reads it, strips the browser's cookies and forwards it as a bearer token, and refuses any write sent from another site.",
          outcome:
            "No code in the browser ever sees the token, and another site can't make changes on a user's behalf.",
        },
        {
          title: "A trust score you can explain",
          context:
            "On a trust platform, an unexplained number is the exact thing it exists to argue against.",
          decision:
            "The score is plain arithmetic over facts already stored and verified: tier, badge, verified channels, reviews, response rate and upheld fraud claims. It's defined once in the shared types, with every component exposed.",
          outcome:
            "The admin console shows the breakdown, so when a merchant disputes their score, someone can point at the line that cost them.",
        },
        {
          title: "Shared packages, so three apps don't drift",
          context:
            "Three apps built side by side end up with three versions of every table, badge and colour.",
          decision:
            "Components come only from @repo/ui, colours only from theme tokens, and domain types only from @repo/types.",
          outcome:
            "A component fixed once is fixed in all three apps, and dark mode works everywhere because no app hard-codes a colour.",
        },
        {
          title: "An image optimiser that isn't an open proxy",
          context:
            "Next.js fetches and resizes whatever image address it's given, so a wildcard pattern lets anyone run their images through the app's bandwidth.",
          decision:
            "Only YAHNDA's storefront-logo bucket and asset host are allowed.",
          outcome: "Remote images load from YAHNDA's own storage, and nothing else can.",
        },
      ],
    },
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
    image: "/projects/evora/evora-1.png",
    hue: 45,
    brand: "#C26E3F",
    headline: "Every attendee, one simple form",
    summary:
      "Event attendance on shared tablets. Staff guide each guest through a short form at the entrance, the tablets keep working with no internet, and organisers finish with attendance records, reports and exports.",
    role: "My own product, designed and built solo: the brand and interface, the Express API, the database, and the deployment.",
    challenge:
      "Most organisations still take attendance in two halves: a paper sheet at the door, then a spreadsheet afterwards. The door gets a queue, the handwriting gets guessed at, someone spends the next morning typing it all up, and every event ends up in its own file, so there is never one record of who came to what.",
    approach:
      "Evora collapses both halves into one form. An organiser drafts an event, builds its form from preset fields, and opens it when the doors do. Staff sign in on a shared tablet at the entrance, the form stays on screen, and each guest taps Submit, sees \"Saved\", and the form clears for the next person. Guests need no link, app or account. Every check-in is saved on the tablet first, so a dropped connection never stops the queue, and everything lands in one attendance record that flags likely duplicates and exports in a click. Teams are invitation-only, with roles, so each organisation only ever sees its own events and data.",
    features: [
      "Events held as drafts until the doors open",
      "Form builder with preset attendance fields",
      "Installable tablet check-in that keeps working offline",
      "One attendance record across events, with duplicate review",
      "Reports, plus Excel and CSV export",
      "Invitation-only teams with roles, and a full audit log",
    ],
    decisions:
      "It's a modular monolith: one Express server organised by feature, typed end to end into two Next.js apps through tRPC, all in one Turborepo. Better Auth keeps sign-in in Evora's own database without a paid auth service. The full breakdown is in the architecture section below.",
    results:
      "Evora hasn't run a live event yet, so there are no usage numbers. The backend is built and hardened, and 90 tests prove the rules that matter most: every API call is guarded, no organisation can reach another's data, and offline check-ins arrive exactly once. Deployment to Google Cloud Run is next, then a field test with several tablets and the Wi-Fi off.",
    architecture: {
      diagram: {
        src: "/projects/evora/evora-architecture.png",
        width: 2252,
        height: 1072,
        alt: "Evora architecture: the admin and client Next.js apps call a Node.js and Express API, which holds auth, organisations, events, forms, attendance, reports and media, and stores data in PostgreSQL through Prisma. A background worker sends email and processes images. The admin uploads images straight to Cloudflare R2 with a signed URL the API authorises.",
      },
      summary:
        "One Express server, organised by feature, is the only part that touches the database or file storage. Both Next.js apps reach it through their own /api path, so browsers only ever talk to one address.",
      parts: [
        {
          name: "Two Next.js apps",
          text: "The admin runs organisations, events, reports and the tablet check-in, and installs as a PWA. The client serves the landing page and a public form. Each forwards /api to the server.",
        },
        {
          name: "Express + tRPC API",
          text: "Express 5 hosts Better Auth and tRPC 11. Routers only validate input with Zod. The rules live in services, one module per feature: auth, organisations, events, forms, attendance, images and audit.",
        },
        {
          name: "PostgreSQL via Prisma",
          text: "Hosted Prisma Postgres with typed queries. Schema changes go through versioned migrations, applied on purpose by a separate job and never on start-up.",
        },
        {
          name: "Cloudflare R2",
          text: "Event covers and organisation logos. Browsers upload straight to R2 with a five-minute link the server signs, so storage keys never leave the server.",
        },
        {
          name: "Background jobs",
          text: "An hourly clean-up deletes uploads nobody used. Jobs run as their own scheduled programs from the same image as the server.",
        },
        {
          name: "Email",
          text: "Password resets, invitations and set-up links go out through Brevo. In development, previews are written to disk instead of being sent.",
        },
      ],
      decisions: [
        {
          title: "Offline-first check-in, delivered exactly once",
          context:
            "Venue internet is unreliable, and the queue at the door can't wait on a server between guests.",
          decision:
            "Every Submit writes to an IndexedDB outbox on the tablet first, and a sync loop sends batches of 100 whenever there's a connection. Each check-in carries an id made once on the device, and the server saves each id only once.",
          outcome:
            "Tested: 50 check-ins queued offline, sent, then resent, even twice at the same moment, arrive as exactly 50.",
        },
        {
          title: "One repo, typed from the database to the screen",
          context:
            "Most features touch the API, the admin and the public form at once. In separate repos, API types and library versions drift apart and break at runtime.",
          decision:
            "Server and apps live in one Turborepo. The apps import only the server's router type, and tRPC is pinned to the same version on both ends.",
          outcome:
            "Change an API and the apps stop compiling until they match. Types disappear at build, so server code never reaches a browser.",
        },
        {
          title: "Uploads go straight to storage, checked by the server",
          context:
            "Phone photos are several megabytes, venue uploads are slow, and the server shouldn't stream files or hand out storage keys.",
          decision:
            "Images are shrunk to WebP in the browser, uploaded with a short-lived link limited to that file's type and size, then confirmed by the server, which reads the file's first bytes.",
          outcome:
            "A 2.1 MB PNG goes up as a 140 KB WebP, and a file only pretending to be an image is refused and deleted.",
        },
        {
          title: "Organisations isolated, and proven by tests",
          context:
            "Every organisation shares one database, so a single missed check would leak someone else's attendance.",
          decision:
            "Every service checks organisation access, and another organisation's data answers \"not found\" so it can't even be discovered. Every API call must be listed as public, signed-in or evora-team only.",
          outcome:
            "All 44 API calls are covered, and a new unlisted one fails the tests. 19 cross-organisation attempts are all refused, with the data unchanged.",
        },
      ],
    },
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
    walkthrough: [
      {
        src: "/projects/evora/evora-1.png",
        title: "One simple form",
        text: "Organisations create beautiful attendance forms, capture responses in seconds, and turn every event into clear reports.",
      },
      {
        src: "/projects/evora/evora-2.png",
        title: "Invitation-only sign in",
        text: "Each organisation's team signs in to manage its own events, forms and attendance. New members join by invite from an organiser.",
      },
      {
        src: "/projects/evora/evora-3.png",
        title: "Attendance, ready to export",
        text: "Every check-in lands in one searchable record, filterable by event and sex, and exports to Excel or CSV in a click.",
      },
    ],
    gallery: ["/projects/evora/evora-2.png", "/projects/evora/evora-3.png"],
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
    architecture: {
      scope: "frontend",
      summary:
        "Two Next.js apps on the marketplace's REST API: the storefront, where buyers shop and vendors run their shops, and an admin console for the operations team. The API is the backend; these apps own the session, the access rules and every screen.",
      parts: [
        {
          name: "Storefront",
          text: "Buyers browse, fill a bag and check out. Vendors apply and run their shop from a dashboard in the same app, kept in its own route group with its own layout.",
        },
        {
          name: "Admin console",
          text: "Vendors and verification, products, orders, disputes, payouts, banners and analytics, built on TanStack Table and Recharts.",
        },
        {
          name: "Same-origin API proxy",
          text: "Every browser call goes to /api/v1 on the app's own domain, and a route handler forwards it to the API. The API host is a server-only setting.",
        },
        {
          name: "State in three layers",
          text: "TanStack Query for server data, Zustand for the bag and wishlist, and nuqs for filters and search, so every result page is a link you can share.",
        },
        {
          name: "Payments and escrow",
          text: "Checkout hands off to Paystack. Payment is held until the buyer confirms delivery or opens a dispute, and vendors request payouts from their balance.",
        },
        {
          name: "Sign-in",
          text: "Email and password, Google, or a code sent to a phone number through Firebase. Expired sessions are cleared before they can lock anyone out.",
        },
      ],
      decisions: [
        {
          title: "A real proxy, not a rewrite",
          context:
            "The API answers /products/ but redirects /products to an absolute http:// address. A Next.js rewrite dropped the trailing slash, the browser followed the redirect off-site, and every such call died as a CORS error.",
          decision:
            "A catch-all route handler builds the upstream path exactly as written and follows any redirect on the server, where it costs nothing.",
          outcome:
            "No CORS preflight on any call, and the API's address never appears in the network tab or the bundle.",
        },
        {
          title: "A bag that survives sign-in",
          context:
            "Shoppers fill a bag before they have an account. Losing it at sign-in loses the sale.",
          decision:
            "Zustand stays the screen's source of truth with instant updates, each change is also sent to the cart API, and on sign-in the guest bag is merged into the server cart in one call.",
          outcome:
            "The bag responds instantly, works signed out, and follows the shopper once they sign in.",
        },
        {
          title: "Only check what the token can prove",
          context:
            "The route guard read a role from the session token, but the token only carries an id and an expiry. No vendor could reach their dashboard, and signed-in users were looped back to sign-in.",
          decision:
            "The edge proxy now answers one question, whether the session is still live, and clears an expired cookie. The vendor role is read from the user's profile in the dashboard's own layout.",
          outcome:
            "Vendors reach their dashboard, and a stale cookie no longer blocks sign-in or sign-up.",
        },
        {
          title: "Admin roles that fail closed",
          context:
            "Support agents should only answer enquiries and manage categories. Previously, a session without a role cookie skipped every restriction.",
          decision:
            "The role is re-read from the API into an httpOnly cookie, pages are blocked at the edge before they render, and a missing role means no access. Buttons and the mutating services check permissions again.",
          outcome:
            "A support agent can't open payouts or vendors, even by typing the address.",
        },
      ],
    },
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
