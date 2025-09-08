"use client";
import { useState } from "react";
import clsx from "clsx";
import {
  Home,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  Scroll,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={clsx(
        "fixed top-0 md:top-6 left-1/2 transform -translate-x-1/2 z-40 w-full md:w-[31rem] md:px-4"
      )}
    >
      <nav className="flex items-center justify-between bg-white/50 backdrop-blur-xs md:border-2 border-gray-200/50 border-b-2 md:rounded-2xl px-4 py-4 md:py-3">
        {/* Left: Home button */}
        <button className="md:hidden p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer">
          <Home size={20} className="text-gray-600" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer">
            <Home size={20} className="text-gray-600" />
          </button>

          <div className="w-px h-8 bg-gray-200/50 mx-6"></div>

          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer">
            <Twitter size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer">
            <Github size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer">
            <Linkedin size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-110 cursor-pointer">
            <Scroll size={20} className="text-gray-600" />
          </button>

          <div className="w-px h-8 bg-gray-200/50 mx-6"></div>

          {/* Contact button */}
          <button className="flex items-center gap-1 bg-black/90 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition-all duration-300 transform hover:scale-105 cursor-pointer">
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
          <button className="flex items-center gap-2 text-gray-700 hover:text-black transition-all">
            <Twitter size={18} /> Twitter
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-black transition-all">
            <Github size={18} /> Github
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-black transition-all">
            <Linkedin size={18} /> Linkedin
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-black transition-all">
            <Scroll size={18} /> Blog
          </button>

          {/* Contact button */}
          <button className="flex items-center gap-1 bg-black/90 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition-all duration-300 transform hover:scale-105 cursor-pointer w-full mx-auto">
            <span className="text-center mx-auto">Contact Me</span>
          </button>
        </div>
      )}
    </header>
  );
}
