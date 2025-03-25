"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col h-screen text-center md:text-left max-w-7xl px-4 md:px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl mt-2">
        About
      </h3>

      <div className="flex flex-col xl:flex-row xl:items-center justify-evenly w-full mt-2">
        <Image
          src="/me.jpg"
          alt="picture of me"
          width={300}
          height={300}
          className="rounded-full xl:rounded-md mx-auto object-cover w-full max-w-[200px] h-[200px] xl:h-[500px] md:max-w-[300px] xl:max-w-[600px]"
        />

        <div className="space-y-10 px-0 md:px-10 mt-10 xl:max-w-[600px]">
          <h4 className="text-4xl font-semibold">
            Get To Know <span className="text-accent">Me!</span>
          </h4>
          <p className="text-base leading-relaxed">
            Hey there, I&apos;m Gideon, I&apos;m not just a developer or programmer—I&apos;m a
            creator, a problem solver, and a tech enthusiast with an insatiable
            curiosity. Coding isn&apos;t just my career; it&apos;s my playground. I thrive
            on turning abstract ideas into sleek, functional, and impactful
            solutions. I am constantly seeking to expand my knowledge and
            skills, and I am excited to continue learning and growing as a Frontend web
            developer and a programmer. When I am not coding, you will often find me on the
            basketball court, honing my skills and enjoying the thrill of the
            game. I am also an avid reader, constantly exploring new topics and
            expanding my knowledge beyond the world of technology.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
