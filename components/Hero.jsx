'use client'
import React from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import BackgroundCircles from './BackgroundCircles';
import { SocialIcon } from "react-social-icons";
import Image from "next/image";


const Hero = () => {
    const [text, count] = useTypewriter({
        words: ['Hi 👋', `My name's Gideon Hoenyefia`, 'I am a <Frontend-Developer />', '<UI/UX Designer />'],
        loop: true,
        delaySpeed: 2000,
    });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <Image src="/kobby.jpg" alt="profile" width={200} height={200} priority className="relative rounded-full w-32 h-32 mx-auto my-4 object-cover"/>
      <div>
      <h3 className="text-sm uppercase text-gray-500 pb-2 mt-6 tracking-[10px]">Computer Scientist/Software Engineer</h3>
      <h1 className="text-4xl lg:text-5xl font-semibold px-10 mt-2">
          <span className="mr-3 z-40">{text}</span>
          <Cursor cursorColor= "#006994" />
        </h1>
      </div>
      <div className="flex flex-row items-center justify-center">
          <SocialIcon 
          url="https://github.com/K-0bby"
          fgColor="gray"
          bgColor="transparent"
          target="_blank"
          />
          <SocialIcon 
          url="https://x.com/HoenyefiaGideon"
          fgColor="gray"
          bgColor="transparent"
          target="_blank"
          />
          <SocialIcon 
          url="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
          fgColor="gray"
          bgColor="transparent"
          target="_blank"
          />
          <SocialIcon 
          url="https://www.instagram.com/__kobb.y/?hl=en"
          fgColor="gray"
          bgColor="transparent"
          target="_blank"
          />
        </div>
    </div>
  )
}

export default Hero