import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto pb-10">
        <p className="text-center text-gray-600 text-sm mt-10 mb-3">
          Copyright &copy; {new Date().getFullYear()} Gideon Korbla Hoenyefia. All
          rights reserved.
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/K-0bby"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/gideon-hoenyefia-74a93a233/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://x.com/HoenyefiaGideon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
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
          </div>
        </div>
      </div>
    </footer>
  );
}
