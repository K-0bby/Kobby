'use client';

import React from 'react';
import Project from './Project';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'HDF Ghana',
    image: '/HDF.png',
    description: ' Premium Cabinets, Wardrobes & Vanities in Ghana',
    link: 'https://www.hdfghanaltd.com/',
  },
  {
    title: 'POS System',
    image: '/POS.png',
    description: 'A Point of Sale system used to manage sales and inventory',
    link: 'https://pos-system-pearl.vercel.app/',
  },
  {
    title: 'ME-FIE',
    image: '/me-fie.png',
    description: 'MeFie is more than a competition platform — its a celebration of Ghanaian culture, connecting Ghanaians worldwide.',
    link: 'https://www.me-fie.com/',
  },
  {
    title: 'Spotless Multimedia',
    image: '/SM.png',
    alt: 'Spotless Multimedia',
    description: 'Spotless Multimedia is a leading provider of high-quality multimedia services.',
    link: 'https://spotless-multimedia.vercel.app/',
  },
  {
    title: 'BuukMeNow',
    image: '/Buuk.png',
    description: 'Streamline scheduling with BuukMeNow—boost clients and grow your business effortlessly.',
    link: 'https://buukme-now.vercel.app/',
  },
  {
    title: 'DigiGrowth',
    image: '/DG.png',
    description: 'Empower Your Business with Digital Excellence',
    link: 'https://digi-growth.vercel.app/',
  },
  {
    title: 'Chic En Vogue',
    image: '/Chic En Vogue.png',
    description: 'An ecommerce site',
    link: 'https://chic-en-vogue.vercel.app/',
  },
  {
    title: 'Event Nation',
    image: '/Eventnation.jpg',
    alt: 'Event Nation',
    description: 'This is an event frontend website built using HTML, CSS, and JavaScript',
    link: 'https://eventnations.netlify.app/#',
  },
  // {
  //   title: 'Royal Shekinah City',
  //   image: '/Shekinah.png',
  //   description: 'Discover Comfort, Elegance, and Excellence at Shekinah Glory Highway Rest Stop',
  //   link: 'https://royalcity.shekinahgloryhotel.org/',
  // },
  // {
  //   title: 'All Together Africa',
  //   image: '/AAA.png',
  //   description: 'We serve as a bridge, working as a non-profit organization to facilitate ongoing success for Africa.',
  //   link: 'https://www.alltogetherafrica.org/',
  // },
];

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col text-center md:text-left max-w-[2000px] px-6 sm:px-10 mx-auto items-center" // Adjusted margin
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl mb-0 text-center">Projects</h3> {/* Reduced mb-1 to mb-0 */}
      <h4 className="uppercase tracking-[3px] text-gray-500 text-sm mb-4 text-center">These are some of my projects</h4> {/* Reduced mb-8 to mb-4 */}

      <div className="w-full flex flex-wrap justify-center gap-6 items-center mt-3">
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
