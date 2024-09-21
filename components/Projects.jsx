'use client'

import React from 'react';
import Project from './Project';
import { motion } from 'framer-motion';


const projects = [
  {
      title: 'Event Nation',
      image: '/Eventnation.jpg',
      alt: 'Event Nation',
      description: 'This is an event frontend website built using HTML, CSS, JavaScript',
      link: 'https://eventnations.netlify.app/#',
  },

  {
      title: 'Chic En Vogue',
      image: '/Chic En Vogue.png',
      description: 'An ecommerce site', 
      link: 'https://chic-en-vogue.vercel.app/',
  },
  {
    title: 'All Together Africa',
    image: '/AAA.png',
    description: 'We serve as a bridge, working as a non-profit organization to facilitate ongoing success for Africa.', 
    link: 'https://www.alltogetherafrica.org/',
  },
  {
    title: 'S&S Kids Beauty Palour',
    image: '/S&S.png',
    description: 'A beauty parlour for kids', 
    link: 'https://s-s-kids-beauty-parlour.vercel.app/',
  },

]

const Projects = () => {
  return (
    <motion.div
     initial={{opacity: 0,}}
     whileInView={{opacity: 1,}}
     transition={{duration: 1.5}}
     className="flex flex-col min-h-screen text-center md:text-left md:flex max-w-[2000px] px-10 justify-center xl:space-y-0 mx-auto items-center py-6">
      <h3 className="text-center uppercase tracking-[20px] text-gray-500 text-2xl mb-1">Projects</h3>
      <h4 className="text-center uppercase tracking-[3px] text-gray-500 text-sm">These are some of my projects</h4>

      <div className="w-full flex flex-wrap justify-center gap-4 items-center mt-3">
        {projects.map((project, index) => (
          <Project key={index} project={project}/>            
        ))}
      </div>
    </motion.div>
  )
}

export default Projects