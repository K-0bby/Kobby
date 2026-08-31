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
  SiPrisma
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
  {icon: <SiSupabase className="h-8 w-8 text-green-500" />, name: "Supabase"},
  {icon: <SiPrisma className="h-8 w-8 text-black" />, name: "Prisma"}
];

export default function SkillsMarquee() {
  return (
    <div className="mt-6 rounded-2xl py-6 px-6">
      <div className="container mx-auto px-4 lg:px-96">
        {/* Scrolling Container */}
        <div className="relative w-full overflow-hidden">
          {/* Enhanced fading overlays */}
          <div className="absolute top-0 left-0 w-24 md:w-52 lg:w-40 h-full bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 md:w-52 lg:w-40 h-full bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Icons */}
          <div 
            className="flex gap-8 items-center whitespace-nowrap px-4 w-max"
            style={{
              animation: 'scroll 20s linear infinite'
            }}
          >
            {[...Array(2)].map((_, i) =>
              skills.map((skill, idx) => (
                <div
                  key={`${skill.name}-${i}-${idx}`}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    {skill.icon}
                  </div>
                  <p className="text-gray-400 text-xs mt-2 group-hover:text-gray-600 transition-colors duration-200">
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