"use client";
import React from "react";
import Image from "next/image";
import BackgroundCircles from "@/components/background-circles";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div>
      <div className="h-screen flex flex-col space-y-6 items-center justify-center text-center overflow-hidden relative">
        <BackgroundCircles />
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-32 right-32 w-6 h-6 bg-purple-400/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce delay-700"></div>

        <Image
          src="/images/kobby.jpg"
          alt="profile"
          width={200}
          height={200}
          priority
          className="relative rounded-full w-34 h-34 mx-auto my-2 object-cover ring-4 ring-white/50"
        />
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold px-10 mt-2 text-black">
            Hi, I&apos;m Gideon Hoenyefia.
          </h1>
          <h3 className="text-lg uppercase text-gray-700 pb-2 mt-5 tracking-[8px] font-medium">
            Frontend Developer
          </h3>
          <p className="text-gray-500 leading-8">
            &quot;Building modern, responsive apps with a creative touch&quot;
          </p>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="rounded-full bg-green-100 px-4 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-600 text-sm font-medium">
              Available for work
            </span>
          </div>
          <Button className="rounded-xl cursor-pointer">Hire Me</Button>
        </div>
      </div>

      <div>
        
      </div>
    </div>
  );
}
