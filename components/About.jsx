'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "./ui/button";


const About = () => {
  return (
    <motion.div
    initial={{opacity: 0,}}
    whileInView={{opacity: 1,}}
    transition={{duration: 1.5}}
    className="flex flex-col min-h-screen text-center md:text-left md:flex max-w-7xl px-10 justify-evenly mx-auto items-center">
        <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl mt-20">About</h3>

      <div className="flex flex-col text-center md:text-center md:flex-col lg:flex-col xl:flex-row xl:text-left max-w-7xl justify-evenly mx-auto items-center">
          <Image
          src="/me.jpg"
          alt="picture of me"
          width={300}
          height={100}
          className="my-4 md:mb-15 flex-shrink-0 w-56 h-56 rounded-full object-cover md:lg md:w-64 md:h-94 xl:w-[400px] xl:h-[400px] xl:rounded-md"
          />

        <div className="space-y-10 px-0 md:px-10">
          <h4 className="text-4xl font-semibold">Get To Know <span className="text-blue-500">Me!</span></h4>
          <p className="text-md text-base">As a frontend web developer, I have a passion for coding and designing visually appealing websites and web apps. My expertise lies in creating interfaces that are easy to use, utilizing HTML, CSS, and JavaScript, with a particular emphasis on React. My ultimate goal is to develop innovative digital environments that engage and connect with my users.
          I am constantly seeking to expand my knowledge and skills, and I am excited to continue learning and growing as a web developer.
          When I am not coding, you will often find me on the basketball court, honing my skills and enjoying the thrill of the game. I am also an avid reader, constantly exploring new topics and expanding my knowledge beyond the world of technology.</p>

          <Link href="/">
            <Button className="tracking-[3px] mt-4">Download CV</Button>
          </Link>
        </div>  
      </div>
    </motion.div>
  )
}

export default About