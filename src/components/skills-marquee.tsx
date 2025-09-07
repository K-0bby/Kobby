"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiLaravel,
  SiGit,
} from "react-icons/si";

const skills = [
  { icon: <SiHtml5 className="h-8 w-8 text-gray-500" />, name: "HTML" },
  { icon: <SiCss3 className="h-8 w-8 text-gray-500" />, name: "CSS" },
  { icon: <SiJavascript className="h-8 w-8 text-gray-500" />, name: "JavaScript" },
  { icon: <SiTypescript className="h-8 w-8 text-gray-500" />, name: "TypeScript" },
  { icon: <SiReact className="h-8 w-8 text-gray-500" />, name: "React.js" },
  { icon: <SiNextdotjs className="h-8 w-8 text-gray-500" />, name: "Next.js" },
  { icon: <SiTailwindcss className="h-8 w-8 text-gray-500" />, name: "TailwindCSS" },
  { icon: <SiReact className="h-8 w-8 text-gray-500" />, name: "React Native" },
  { icon: <SiLaravel className="h-8 w-8 text-gray-500" />, name: "Laravel Blade" },
  { icon: <SiGit className="h-8 w-8 text-gray-500" />, name: "Git" },
];

export default function SkillsMarquee() {
  return (
    <div className="mt-6 rounded-2xl py-6 px-6">
      <div className="container mx-auto px-4 lg:px-96">
        {/* Scrolling Container */}
        <div className="relative w-full overflow-hidden">
          {/* Fading overlays */}
          <div className="absolute top-0 left-0 w-96 h-full bg-gradient-to-r from-[#f5f5f5] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#f5f5f5] to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Icons */}
          <div className="flex animate-scroll gap-5 items-center whitespace-nowrap px-4 w-max">
            {[...Array(2)].map((_, i) =>
              skills.map((skill, idx) => (
                <div
                  key={`${skill.name}-${i}-${idx}`}
                  className="flex flex-col items-center tooltip-container"
                >
                  <div className="tooltip-trigger">{skill.icon}</div>
                  <p className="text-gray-300 text-xs mt-1">{skill.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
