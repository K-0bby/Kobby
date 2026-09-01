const skills = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "React.js" },
  { name: "Next.js" },
  { name: "TailwindCSS" },
  { name: "React Native" },
  { name: "Laravel Blade" },
  { name: "Git" },
  { name: "Supabase" },
  { name: "Prisma" },
  {name: "PostgreSQL"},
  { name: "Node.js" },
  { name: "Express.js" },
];

export default function Marquee() {
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto max-w-sm px-2 sm:px-4 md:max-w-6xl lg:px-8">
        {/* Scrolling Container */}
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl">
          {/* Enhanced fading overlays - responsive widths */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-[#131313] via-[#131313]/90 to-transparent lg:w-40"></div>
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-[#131313] via-[#131313]/90 to-transparent lg:w-40"></div>

          {/* Scrolling Icons */}
          <div
            className="flex w-max items-center gap-3 px-2 py-4 whitespace-nowrap sm:gap-4 sm:px-4 sm:py-6 md:gap-6 lg:gap-8"
            style={{
              animation: "scroll 25s linear infinite",
            }}
          >
            {[...Array(3)].map((_, i) =>
              skills.map((skill, idx) => (
                <div
                  key={`${skill.name}-${i}-${idx}`}
                  className="group flex shrink-0 cursor-default flex-col items-center"
                >
                  <div className="rounded-lg border border-gray-300 bg-[#f5f5f5] px-2 py-2 shadow-sm transition-colors duration-200 hover:bg-white hover:shadow-md sm:rounded-xl sm:px-3 sm:py-3 md:rounded-2xl md:px-4 md:py-3">
                    <p className="text-xs font-medium text-gray-900 transition-colors duration-200 group-hover:text-gray-600 sm:text-sm md:text-base">
                      {skill.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
