export interface ProjectItem {
  id: number;
  title: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
}

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: "HDF Ghana Limited",
    image: "/projects/HDF-Ghana.png",
    description:
      "HDF Ghana Limited, founded in 2019 in Accra, delivers tailor-made cabinetry solutions for kitchens, wardrobes, and bathroom vanities—blending craftsmanship with functional design to create elegant, durable spaces through design, survey, and expert installation services.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vimeo",],
    link: "https://hdfghanaltd.com",
  },
  {
    id: 2,
    title: "Me-fie",
    image: "/projects/Me-fie.png",
    description:
      "Me Fie is a cultural and lifestyle platform that celebrates Ghana's heritage by connecting people through raffles, events, and community initiatives—promoting authentic experiences, supporting local businesses, and giving back to communities.",
    technologies: ["Laravel Blade", "TailwindCSS", "Laravel", "MySQL"],
    link: "https://www.me-fie.com",
  },
  {
    id: 3,
    title: "Kweku Smoke",
    image: "/projects/Kweku-Smoke.png",
    description:
      "Kweku Smoke's website is a modern artist platform that showcases his music, story, tours, and merchandise—highlighting his fusion of Ghanaian rhythms with trap and afrobeats in a sleek, engaging way",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", ],
    link: "#",
  },
//   {
//     id: 4,
//     title: "Me-fie",
//     image: "/projects/Me-fie.png",
//     description:
//       "Me Fie is a cultural and lifestyle platform that celebrates Ghana's heritage by connecting people through raffles, events, and community initiatives—promoting authentic experiences, supporting local businesses, and giving back to communities.",
//     technologies: ["Laravel Blade", "TailwindCSS", "Laravel", "MySQL"],
//     link: "https://www.me-fie.com",
//   },
];
