import Image from "next/image";

export default function PolaroidImages() {
  return (
    <div className="flex justify-center items-center  py-10 relative">
      {/* First Polaroid */}
      <div className="relative top-12 right-[3rem] md:right-[3rem] lg:left-[5rem] bg-white shadow-sm rounded-lg p-3 transform rotate-[-8deg] hover:z-40 max-w-[220px]">
        <Image
          src="/images/kobby.jpg"
          alt="profile 1"
          width={220}
          height={220}
          className="rounded-md object-cover w-full h-auto"
        />
        <p className="text-center text-gray-700 font-medium mt-2">@ikwe</p>
      </div>

      {/* Second Polaroid */}
      <div className="absolute top-5 right-[3rem] md:right-[14rem] lg:left-[50rem] bg-white shadow-sm rounded-lg p-3 transform rotate-[8deg] max-w-[220px]">
        <Image
          src="/images/kobby.jpg"
          alt="profile 2"
          width={220}
          height={220}
          className="rounded-md object-cover w-full h-auto"
        />
        <p className="text-center text-gray-700 font-medium mt-2">
          @codewithhonour
        </p>
      </div>
    </div>
  );
}
