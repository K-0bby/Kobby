"use client";

import { projects } from "@/lib/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Projects() {
  const router = useRouter();
  return (
    <>
      <section className="min-h-screen pb-20 pt-24 md:pt-32 lg:pt-36">
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mt-8 mb-16 capitalize px-4">
          Check out some of my recent works
        </h2>

        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl border-4 border-gray-200 transition-all duration-500 overflow-hidden p-3"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={320}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="py-3 px-2 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="flex flex-row flex-wrap items-center gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="px-1.5 py-1 text-xs font-medium text-blue-500 bg-blue-50 rounded-full"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={() => router.push(`/projects/${project.id}`)}
                      className="group/btn inline-flex items-center gap-2 bg-gray-100 hover:bg-black text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-lg"
                    >
                      <span>View Project</span>
                      <span>
                        <ChevronRight size={20} />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl h-px mx-auto bg-gray-200" />
    </>
  );
}
