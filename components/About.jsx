'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col min-h-screen text-center md:text-left max-w-7xl px-4 md:px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl mt-20">About</h3>

      <div className="flex flex-col xl:flex-row xl:items-center justify-evenly w-full mt-5">
        <Image
          src="/me.jpg"
          alt="picture of me"
          width={300}
          height={300}
          className="rounded-full xl:rounded-md mx-auto object-cover w-full max-w-[200px] h-[200px] xl:h-[500px] md:max-w-[300px] xl:max-w-[600px]"
        />
        
        <div className="space-y-10 px-0 md:px-10 mt-10 xl:mt-0 xl:max-w-[600px]">
          <h4 className="text-4xl font-semibold">Get To Know <span className="text-blue-500">Me!</span></h4>
          <p className="text-base leading-relaxed">
          As a frontend web developer, I have a passion for coding and designing visually appealing websites and web apps. My expertise lies in creating interfaces that are easy to use, utilizing HTML, CSS, and JavaScript, with a particular emphasis on React. My ultimate goal is to develop innovative digital environments that engage and connect with my users.
          I am constantly seeking to expand my knowledge and skills, and I am excited to continue learning and growing as a web developer.
          When I am not coding, you will often find me on the basketball court, honing my skills and enjoying the thrill of the game. I am also an avid reader, constantly exploring new topics and expanding my knowledge beyond the world of technology.
          </p>
        </div>  
      </div>
    </motion.div>
  );
};

export default About;
