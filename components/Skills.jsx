"use client";

import React from "react";
import Skill from "./Skill";
import { motion } from "framer-motion";

const skillsData = [
  {
    name: "HTML",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/HTML.svg",
    altName: "HTML",
  },
  {
    name: "CSS",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/CSS.svg",
    altName: "CSS",
  },
  {
    name: "JavaScript",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/JavaScript.svg",
    altName: "JavaScript",
  },
  {
    name: "TailwindCSS",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/TailwindCSS-Light.svg",
    altName: "TailwindCSS",
  },
  {
    name: "Wordpress",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Wordpress.svg",
    altName: "Wordpress",
  },
  {
    name: "React",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/React-Light.svg",
    altName: "React",
  },
  {
    name: "NextJS",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/NextJS-Light.svg",
    altName: "NextJS",
  },
  {
    name: "Git",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Git.svg",
    altName: "Git",
  },
  {
    name: "TypeScript",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/TypeScript.svg",
    altName: "TypeScript",
  },
  {
    name: "C++",
    image:
      "https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/CPP.svg",
    altName: "C++",
  },
];

const Skills = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col min-h-screen text-center md:text-left max-w-[2000px] px-4 md:px-10 justify-center mx-auto items-center mt-10"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl mb-4">
        Skills
      </h3>
      <h4 className="tracking-[3px] text-gray-500 text-sm mb-8">
        Technologies I&apos;m proficient in:
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {skillsData.map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
