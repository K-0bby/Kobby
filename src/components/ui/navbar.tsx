"use client";
import { useState } from "react";
import clsx from "clsx";
import { Home, Github, Linkedin, Menu, X, Scroll } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLenis } from "@/components/lenis-provider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { scrollTo } = useLenis();

  const handleContactClick = () => {
    if (window.location.pathname === "/") {
      scrollTo("#contact", { offset: -100, duration: 8 });
    } else {
      router.push("/#contact");
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <header
      className={clsx(
        "fixed top-0 md:top-6 left-1/2 transform -translate-x-1/2 z-40 w-full md:w-[31rem] md:px-4"
      )}
    >
      <nav className="flex items-center justify-between bg-white/50 backdrop-blur-xs md:border-2 border-gray-200/50 border-b-2 md:rounded-2xl px-4 py-4 md:py-3">
        {/* Left: Home button */}
        <Link
          href="/"
          className="md:hidden p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer"
        >
          <Home size={20} className="text-gray-600" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer"
          >
            <Home size={20} className="text-gray-600" />
          </Link>

          <div className="w-px h-8 bg-gray-200/50 mx-6"></div>

          <Link
            href="https://x.com/HoenyefiaGideon"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.35l-5.214-6.816-5.96 6.816H1.868l7.73-8.84L1.5 2.25h7.847l4.713 6.231 4.184-6.231zM16.35 20.2h1.833L7.68 4.71H5.71l10.64 15.49z" />
            </svg>
          </Link>
          <Link
            href="https://github.com/K-0bby"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer"
          >
            <Github size={20} className="text-gray-600" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer"
          >
            <Linkedin size={20} className="text-gray-600" />
          </Link>
          <Link
            href="/blog"
            className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer"
          >
            <Scroll size={20} className="text-gray-600" />
          </Link>

          <div className="w-px h-8 bg-gray-200/50 mx-6"></div>

          {/* Contact button */}
          <button
            onClick={handleContactClick}
            className="flex items-center gap-1 bg-black/90 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <span>Contact</span> <span className="hidden md:block">Me</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200/50 transition-all duration-300 cursor-pointer"
        >
          {isOpen ? (
            <X size={22} className="text-gray-700" />
          ) : (
            <Menu size={22} className="text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border border-gray-200  flex flex-col items-start px-6 py-6 space-y-5 animate-fadeIn">
          <Link
            href="https://x.com/HoenyefiaGideon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.35l-5.214-6.816-5.96 6.816H1.868l7.73-8.84L1.5 2.25h7.847l4.713 6.231 4.184-6.231zM16.35 20.2h1.833L7.68 4.71H5.71l10.64 15.49z" />
            </svg>{" "}
            Twitter
          </Link>
          <Link
            href="https://github.com/K-0bby"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-all"
          >
            <Github size={18} /> Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-all"
          >
            <Linkedin size={18} /> Linkedin
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-all"
          >
            <Scroll size={18} /> Blog
          </Link>

          {/* Contact button */}
          <button
            onClick={handleContactClick}
            className="flex items-center gap-1 bg-black/90 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition-all duration-300 transform hover:scale-105 cursor-pointer w-full mx-auto"
          >
            <span className="text-center mx-auto">Contact Me</span>
          </button>
        </div>
      )}
    </header>
  );
}