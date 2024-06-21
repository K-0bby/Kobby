import React from 'react';
import { motion } from 'framer-motion';


const Skill = ({skill}) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        src={skill.image}
        alt={skill.altName}
        className="rounded-full border border-gray-500 object-cover w-24 h-22 xl:w-28 xl:h-28 filter group-hover:grayscale transition duration-300 ease-in-out"
      />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-24 h-22  xl:w-28 xl:h-28 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-xl font-bold text-black opacity-100">{skill.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Skill 