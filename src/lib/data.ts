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

export const projects: ProjectItem[] = [
  {
    id: 1,
    date: "2024",
    title: "HDF Ghana Limited",
    image: "/projects/HDF-Ghana.png",
    summary:
      "HDF Ghana Limited, established in 2019 in Accra, specializes in custom cabinetry for kitchens, wardrobes, and bathrooms, blending craftsmanship with functional design",
    description:
      "HDF Ghana Limited, founded in 2019 in Accra, delivers tailor-made cabinetry solutions for kitchens, wardrobes, and bathroom vanities—blending craftsmanship with functional design to create elegant, durable spaces through design, survey, and expert installation services.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vimeo"],
    link: "https://hdfghanaltd.com",
    client: "HDF Ghana Limited",
    gallery: [
      "/projects/hdf/hdf-2.png",
      "/projects/hdf/hdf-3.png",
      "/projects/hdf/hdf-4.png",
      "/projects/hdf/hdf-5.png",
    ],
  },
  {
    id: 2,
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
  //   id: 5,
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
