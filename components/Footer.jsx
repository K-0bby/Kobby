import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-t border-border/20 mt-12 pt-8 text-center text-sm text-muted-foreground">
      <>
        <div className="flex justify-center gap-4 mb-4">
          <Link
            href="https://github.com/K-0bby"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#55b1e3] transition-colors"
          >
            <Github className="w-5 h-5 text-gray-600" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#55b1e3] transition-colors"
          >
            <Linkedin className="w-5 h-5 text-gray-600" />
          </Link>
          <Link
            href="https://x.com/HoenyefiaGideon"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#55b1e3] transition-colors"
          >
            <Twitter className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
        {/* Footer Text */}

        <p>
          © {currentYear}{" "}
          <span className="font-medium text-[#55b1e3]">
            Gideon Korbla Hoenyefia
          </span>
          . All rights reserved.
        </p>
      </>
    </div>
  );
};

export default Footer;
