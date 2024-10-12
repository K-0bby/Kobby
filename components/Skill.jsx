'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skill = ({ skill }) => {
  return (
    <div className="group relative flex items-center justify-center cursor-pointer">
      <motion.img
        src={skill.image}
        alt={skill.altName}
        className="rounded-full border border-gray-500 object-cover w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 filter group-hover:grayscale transition duration-300 ease-in-out"
      />
      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out group-hover:bg-white w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 rounded-full z-0 flex items-center justify-center">
        <p className="text-sm md:text-xl font-bold text-black">{skill.name}</p>
      </div>
    </div>
  );
};

export default Skill;
