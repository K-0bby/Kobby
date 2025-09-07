"use client";
import React from "react";
import Image from "next/image";
import BackgroundCircles from "@/components/background-circles";
import { Button } from "@/components/ui/button";
import PolaroidImages from "@/components/polariod-image";
import SkillsMarquee from "@/components/skills-marquee";

export default function Home() {
  return (
    <>
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

      {/* About */}
      <div className="overflow-hidden -mt-12 pb-20">
        <div className="flex flex-col space-y-6 items-center justify-center text-center px-4 md:px-8 lg:px-96">
          <h2 className="text-3xl lg:text-4xl font-bold px-10 text-black">
            About Me
          </h2>

          <>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              Hey, I&apos;m <span className="font-semibold">Gideon</span>.
              I&apos;m a{" "}
              <span className="font-semibold">Frontend Developer</span> who
              thrives on turning abstract ideas into sleek, functional, and
              impactful web experiences. With{" "}
              <span className="font-semibold">
                modern web tools and technologies
              </span>
              , I focus on building clean, scalable, and user-friendly
              applications that balance performance with design.
            </p>

            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              My work is driven by curiosity and a builder&apos;s mentality. I
              believe code should be efficient, maintainable, and purposeful,
              and I enjoy exploring new technologies to keep pushing the
              boundaries of what&apos;s possible. Along with frontend
              development, I&apos;m passionate about cybersecurity and the role
              it plays in creating secure, reliable digital products.
            </p>

            <p className="text-lg text-gray-500 leading-relaxed">
              Beyond coding, I enjoy basketball, experimenting with side
              projects, and reading to stay inspired. At my core, I&apos;m
              focused on curiosity, growth, and leaving everything I work on
              better than I found it.
            </p>
          </>
        </div>
        <PolaroidImages />
      </div>
      <div className="w-[25rem] md:w-[40rem] lg:w-[60rem] h-px mx-auto bg-gray-200 my-10"></div>

      <div className="h-screen">
        <SkillsMarquee />
      </div>
      <div className="w-[25rem] md:w-[40rem] lg:w-[60rem] h-px mx-auto bg-gray-200 my-10"></div>
    </>
  );
}
