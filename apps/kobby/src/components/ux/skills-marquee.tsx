"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiLaravel,
  SiGit,
  SiSupabase,
  SiPrisma,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
} from "react-icons/si";

const skills = [
  { icon: <SiHtml5 className="h-8 w-8 text-orange-500" />, name: "HTML" },
  { icon: <SiCss className="h-8 w-8 text-blue-500" />, name: "CSS" },
  { icon: <SiJavascript className="h-8 w-8 text-yellow-400" />, name: "JavaScript" },
  { icon: <SiTypescript className="h-8 w-8 text-blue-600" />, name: "TypeScript" },
  { icon: <SiReact className="h-8 w-8 text-cyan-400" />, name: "React.js" },
  { icon: <SiNextdotjs className="h-8 w-8 text-gray-800" />, name: "Next.js" },
  { icon: <SiTailwindcss className="h-8 w-8 text-teal-400" />, name: "TailwindCSS" },
  { icon: <SiReact className="h-8 w-8 text-purple-500" />, name: "React Native" },
  { icon: <SiLaravel className="h-8 w-8 text-red-500" />, name: "Laravel Blade" },
  { icon: <SiGit className="h-8 w-8 text-orange-600" />, name: "Git" },
  { icon: <SiSupabase className="h-8 w-8 text-green-500" />, name: "Supabase" },
  { icon: <SiPrisma className="h-8 w-8 text-black" />, name: "Prisma" },
  { icon: <SiPostgresql className="h-8 w-8 text-sky-800" />, name: "PostgreSQL" },
  { icon: <SiNodedotjs className="h-8 w-8 text-green-600" />, name: "Node.js" },
  { icon: <SiExpress className="h-8 w-8 text-gray-700" />, name: "Express.js" },
];

export default function SkillsMarquee() {
  return (
    <div className="mt-6 rounded-2xl px-6 py-6">
      <div className="container mx-auto px-4 lg:px-96">
        {/* Scrolling Container */}
        <div className="relative w-full overflow-hidden">
          {/* Enhanced fading overlays */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent lg:w-24"></div>
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent lg:w-24"></div>

          {/* Scrolling Icons */}
          <div
            className="flex w-max items-center gap-8 px-4 whitespace-nowrap"
            style={{
              animation: "scroll 20s linear infinite",
            }}
          >
            {[...Array(2)].map((_, i) =>
              skills.map((skill, idx) => (
                <div
                  key={`${skill.name}-${i}-${idx}`}
                  className="group flex cursor-default flex-col items-center"
                >
                  <div className="transition-transform duration-200 group-hover:scale-110">
                    {skill.icon}
                  </div>
                  <p className="mt-2 text-xs text-gray-400 transition-colors duration-200 group-hover:text-gray-600">
                    {skill.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
