import React from 'react';
import Link from 'next/link';
import { CiLink } from 'react-icons/ci';
import Image from "next/image";

const Project = ({project}) => {
  return (
    <div className="group flex relative">
        <Image
            src={project.image}
            alt={project.alt}
            width={300}
            height={100}
            className="rounded-lg border border-solid border-gray-950 object-cover shadow-lg w-[300px] h-[200px] xl:w-[400px] xl:h-[200px] filter group-hover:accent transition duration-300 ease-in-out"
        />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-accent w-[300px] h-[200px]  xl:w-[400px] xl:h-[200px] rounded-lg z-0">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h6 className="text-xl font-bold text-gray-100 opacity-100">{project.title}</h6>
          <p className="text-gray-100">{project.description}</p>
          <Link href={project.link} target="_blank" className="text-blue-500 hover:text-blue-700">
            <CiLink className="text-gray-100 text-[30px]"/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Project