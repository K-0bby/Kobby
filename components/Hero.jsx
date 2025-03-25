"use client";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Hero = () => {
  const [text ] = useTypewriter({
    words: [
      "Hi 👋",
      `I'm Gideon Hoenyefia`,
      "I am a <Programmer />",
      "<Frontend-Developer />",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <Image
        src="/kobby.jpg"
        alt="profile"
        width={200}
        height={200}
        priority
        className="relative rounded-full w-32 h-32 mx-auto my-2 object-cover"
      />
      <div>
        <h3 className="text-sm uppercase text-gray-500 pb-2 mt-6 tracking-[10px]">
          Computer Scientist/Programmer
        </h3>
        <h1 className="text-4xl lg:text-5xl font-semibold px-10 mt-2">
          <span className="mr-3 z-40">{text}</span>
          <Cursor cursorColor="#006994" />
        </h1>
      </div>
      <div className="flex flex-row items-center justify-center space-x-4 mt-4">
        <Link
          href="https://github.com/K-0bby"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-black transition"
        >
          <Github size={24} />
        </Link>
        <Link
          href="https://x.com/HoenyefiaGideon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-black transition"
        >
          <Twitter size={24} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-black transition"
        >
          <Linkedin size={24} />
        </Link>
        {/* <Link
          href="https://www.instagram.com/__kobb.y/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-black transition"
        >
          <Instagram size={24} />
        </Link> */}
      </div>
    </div>
  );
};

export default Hero;
