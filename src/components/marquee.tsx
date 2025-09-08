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
];

export default function Marquee() {
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 max-w-6xl">
        {/* Scrolling Container */}
        <div className="relative w-full overflow-hidden">
          {/* Enhanced fading overlays - properly sized for mobile */}
          <div className="absolute top-0 left-0 w-8 sm:w-16 md:w-24 lg:w-32 h-full bg-gradient-to-r from-[#131313] via-[#131313]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 sm:w-16 md:w-24 lg:w-32 h-full bg-gradient-to-l from-[#131313] via-[#131313]/80 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Icons */}
          <div className="flex gap-3 md:gap-8 items-center whitespace-nowrap px-2 sm:px-4 w-max py-4 sm:py-6 animate-scroll">
            {[...Array(3)].map((_, i) =>
              skills.map((skill, idx) => (
                <div
                  key={`${skill.name}-${i}-${idx}`}
                  className="flex flex-col items-center group cursor-default flex-shrink-0"
                >
                  <div className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 rounded-lg sm:rounded-xl md:rounded-2xl bg-[#f5f5f5] hover:bg-white transition-colors duration-200 shadow-sm hover:shadow-md">
                    <p className="text-gray-900 text-xs md:text-base font-medium group-hover:text-gray-600 transition-colors duration-200">
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