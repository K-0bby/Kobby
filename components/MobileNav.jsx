"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

const links = [
  { name: "home", path: "#hero" },
  { name: "about", path: "#about" },
  { name: "skills", path: "#skills" },
  { name: "projects", path: "#projects" },
  { name: "contact", path: "#contacts" },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger className="flex justify-center items-center">
        <Menu className="text-[28px] text-accent" />
      </SheetTrigger>

      {/* Content */}
      <SheetContent className="flex flex-col">
        {/* Accessible Title */}
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        </SheetHeader>

        {/* Logo */}
        <div className="mt-28 mb-36 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold text-white">
              Gideon<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col justify-center items-center text-white gap-8">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`${
                pathname === link.path ? "text-accent" : ""
              } capitalize font-medium hover:text-accent text-md tracking-wide transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Close Button */}
        <SheetClose className="absolute top-4 right-4 text-white">
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
