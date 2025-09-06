import clsx from "clsx";
import { Home, Github, FileText, Twitter } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className={clsx("fixed top-6 left-1/2 transform -translate-x-1/2 z-40")}
    >
      <nav className="flex items-center bg-white/80 backdrop-blur-md border-2 border-gray-200/50 rounded-2xl px-4 py-3 shadow-sm">
        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-135">
            <Home size={20} className="text-gray-600" />
          </button>
          <div className="w-px h-8 bg-gray-200/50 mx-6"></div>
          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-135">
            <Twitter size={20} className="text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-135">
            <Github size={20} className="text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-300 transform hover:scale-135">
            <FileText size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Separator Line */}
        <div className="w-px h-8 bg-gray-200/50 mx-6"></div>

        {/* My Blog Button */}
        <button className="flex items-center gap-1 bg-black/90 backdrop-blur-sm text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition-all duration-300 transform hover:scale-105">
          <span className="hidden md:block">My</span> <span>Blog</span>
        </button>
      </nav>
    </header>
  );
}
