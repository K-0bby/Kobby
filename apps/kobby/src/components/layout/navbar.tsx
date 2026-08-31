"use client";
import { useState } from "react";
import { cn } from "@repo/ui";
import { ACTION_BUTTON } from "@/lib/ui";
import {
  House,
  GithubLogo,
  LinkedinLogo,
  XLogo,
  List,
  X,
  Scroll,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLenis } from "@/provider/lenis-provider";

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
      className={cn(
        "fixed top-0 left-1/2 z-40 w-full -translate-x-1/2 transform md:top-6 md:px-4"
      )}
    >
      {/* Sizes to its contents on desktop. A fixed width here (previously
          md:w-124) is outgrown by the nav items, pushing the Contact button
          outside the rounded pill. */}
      <nav className="flex items-center justify-between border-b-2 border-gray-200/50 bg-white/50 px-4 py-4 backdrop-blur-xs md:mx-auto md:w-fit md:rounded-2xl md:border-2 md:py-3">
        {/* Left: Home button */}
        <Link
          href="/"
          className="transform cursor-pointer rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-200/50 md:hidden"
        >
          <House size={20} className="text-gray-600" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link
            href="/"
            className="transform cursor-pointer rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-200/50"
          >
            <House size={20} className="text-gray-600" />
          </Link>

          <div className="mx-6 h-8 w-px bg-gray-200/50"></div>

          <Link
            href="https://x.com/HoenyefiaGideon"
            target="_blank"
            rel="noopener noreferrer"
            className="transform cursor-pointer rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-200/50"
          >
            <XLogo size={20} className="text-gray-600" />
          </Link>
          <Link
            href="https://github.com/K-0bby"
            target="_blank"
            rel="noopener noreferrer"
            className="transform cursor-pointer rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-200/50"
          >
            <GithubLogo size={20} className="text-gray-600" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform cursor-pointer rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-200/50"
          >
            <LinkedinLogo size={20} className="text-gray-600" />
          </Link>
          <Link
            href="/blog"
            className="transform cursor-pointer rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-200/50"
          >
            <Scroll size={20} className="text-gray-600" />
          </Link>

          <div className="mx-6 h-8 w-px bg-gray-200/50"></div>

          {/* Contact button */}
          <button
            onClick={handleContactClick}
            className={cn(
              ACTION_BUTTON,
              "bg-black/90 text-white hover:scale-105 hover:bg-black"
            )}
          >
            <span>Contact</span> <span className="hidden md:block">Me</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-gray-200/50 md:hidden"
        >
          {isOpen ? (
            <X size={22} className="text-gray-700" />
          ) : (
            <List size={22} className="text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="animate-fadeIn flex flex-col items-start space-y-5 border border-gray-200 bg-white/95 px-6 py-6 backdrop-blur-md md:hidden">
          <Link
            href="https://x.com/HoenyefiaGideon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 transition-all hover:text-black"
          >
            <XLogo size={18} /> Twitter
          </Link>
          <Link
            href="https://github.com/K-0bby"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 transition-all hover:text-black"
          >
            <GithubLogo size={18} /> Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
            className="flex items-center gap-2 text-gray-700 transition-all hover:text-black"
          >
            <LinkedinLogo size={18} /> Linkedin
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-gray-700 transition-all hover:text-black"
          >
            <Scroll size={18} /> Blog
          </Link>

          {/* Contact button */}
          <button
            onClick={handleContactClick}
            className={cn(ACTION_BUTTON, "w-full bg-black/90 text-white hover:bg-black")}
          >
            <span className="mx-auto text-center">Contact Me</span>
          </button>
        </div>
      )}
    </header>
  );
}
