import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { ExternalLink } from 'lucide-react';

const Project = ({ project }) => {
  return (
    <div className="group flex relative project-box mb-6"> {/* Reduced mb-6 for smaller spacing */}
      <Image
        src={project.image}
        alt={project.alt}
        width={300}
        height={200}
        className="rounded-lg object-cover shadow-lg w-[300px] h-[200px] xl:w-[400px] xl:h-[200px] transition-transform duration-500 ease-in-out"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out project-layer">
        <h6 className="text-xl font-bold text-white">{project.title}</h6>
        <p className="text-white w-full text-sm lg:text-base">{project.description}</p>
        <Link href={project.link} target="_blank">
          <ExternalLink className="text-white text-[30px]" />
        </Link>
      </div>
    </div>
  );
}

export default Project;
