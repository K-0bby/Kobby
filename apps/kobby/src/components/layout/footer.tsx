"use client";
import { GithubLogo, LinkedinLogo,  XLogo, } from "@phosphor-icons/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl pb-10">
        <p className="mt-10 mb-3 text-center text-sm text-gray-600">
          Copyright &copy; {new Date().getFullYear()} Gideon Korbla Hoenyefia. All rights reserved.
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/K-0bby"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <GithubLogo className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <LinkedinLogo className="h-6 w-6" />
            </Link>
            <Link
              href="https://x.com/HoenyefiaGideon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <XLogo size={20} className="text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
