import Image from "next/image";

export default function PolaroidImages() {
  return (
    <div className="w-full flex justify-center items-center py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      <div className="relative w-full max-w-md mx-auto px-4">
        
        {/* First Polaroid - Bottom layer */}
        <div className="relative bg-white shadow-xl rounded-lg p-3 transform rotate-[-8deg] hover:z-40 transition-all duration-300 hover:scale-105 hover:rotate-[-4deg] w-[250px] md:w-full max-w-xs mx-auto">
          <Image
            src="/images/kobby.jpg"
            alt="Gideon Hoenyefia - Profile 1"
            width={150}
            height={150}
            className="rounded-md object-cover w-[250px] md:w-full h-auto aspect-square"
          />
          <p className="text-center text-gray-700 font-medium mt-3 text-sm">
            @ikwe
          </p>
        </div>

        {/* Second Polaroid - Top layer, stacked on first */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-lg p-3 rotate-[6deg] hover:z-50 transition-all duration-300 hover:scale-105 hover:rotate-[3deg] w-[250px] md:w-full max-w-xs z-10">
          <Image
            src="/images/kobby.jpg"
            alt="Gideon Hoenyefia - Profile 2"
            width={150}
            height={150}
            className="rounded-md object-cover w-[250px] md:w-full h-auto aspect-square"
          />
          <p className="text-center text-gray-700 font-medium mt-3 text-sm">
            @codewithhonour
          </p>
        </div>
        
        {/* Spacer to maintain proper height */}
        <div className="h-20 sm:h-24" />
      </div>
    </div>
  );
}
