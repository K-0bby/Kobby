import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <Link href="https://github.com/K-0bby" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-xl hover:text-accent transition duration-300" />
          </Link>
          <Link href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-xl hover:text-accent transition duration-300" />
          </Link>
          <Link href="https://x.com/HoenyefiaGideon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-xl hover:text-accent transition duration-300" />
          </Link>
        </div>

        {/* Copyright Text */}
        <p className="text-sm tracking-wider text-center mx-auto text-gray-400">
          Copyright &copy; {new Date().getFullYear()} by Gideon Korbla Hoenyefia | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
