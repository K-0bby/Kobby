"use client";

import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { ChevronRight, ChevronLeft, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { useState, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const project = projects.find(
    (project) => project.id === parseInt(resolvedParams.id)
  );

  const [selectedImage, setSelectedImage] = useState(project?.image || "");

  // Check if user came from navigation (has 'nav' search param)
  const cameFromNavigation = searchParams.get("nav") === "true";

  // Get original project ID from URL params (the first page visited)
  const originalProjectId = searchParams.get("original") || resolvedParams.id;
  const isBackToOriginal = resolvedParams.id === originalProjectId;

  // Get current project index
  const currentProjectIndex = projects.findIndex(
    (p) => p.id === parseInt(resolvedParams.id)
  );

  // Get previous and next project IDs
  const getPreviousProjectId = () => {
    if (currentProjectIndex <= 0) return projects[projects.length - 1].id;
    return projects[currentProjectIndex - 1].id;
  };

  const getNextProjectId = () => {
    if (currentProjectIndex >= projects.length - 1) return projects[0].id;
    return projects[currentProjectIndex + 1].id;
  };

  const navigateToProject = (projectId: number) => {
    // Add nav=true and preserve original project ID
    router.push(
      `/projects/${projectId}?nav=true&original=${originalProjectId}`
    );
  };

  if (!project) {
    return (
      <section className="min-h-screen pb-20 pt-24 md:pt-32 lg:pt-36 px-4">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black mt-2 mb-12">
            Project Not Found
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen pb-20 pt-24 md:pt-32 lg:pt-36 px-4">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black mt-2 mb-12 capitalize">
            {project.title}
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto px-6 bg-gray-100 border-3 border-gray-200 rounded-2xl mt-12 py-2">
          <h6 className="text-xl font-bold text-black mt-2 mb-4 capitalize">
            Description
          </h6>
          <p className="text-gray-500 text-base leading-relaxed pb-6">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-col gap-2 border-y border-gray-200 py-2">
            <h6 className="text-xl font-bold text-black mt-2 mb-4 capitalize">
              Technologies
            </h6>
            <div className="flex flex-row items-center gap-2 pb-3">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="px-3 py-1.5 text-xs font-medium text-blue-500 bg-blue-50 rounded-full"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Date and Client */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
            <div>
              <p className="text-gray-600 text-base leading-relaxed flex flex-col py-5 gap-3">
                <span className="font-bold text-gray-800">Date</span>{" "}
                <span className="text-gray-600">{project.date}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-base leading-relaxed flex flex-col py-5 gap-3">
                <span className="font-bold text-gray-800">Client</span>{" "}
                <span className="text-gray-600">{project.client}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-between mx-auto gap-2 mt-10 max-w-2xl">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-gray-900 text-[#f5f5f5] flex items-center gap-3"
          >
            View Project <LinkIcon size={20} />
          </Link>
          <div className="flex flex-row items-center gap-2">
            {cameFromNavigation && !isBackToOriginal && (
              <Button
                onClick={() => navigateToProject(getPreviousProjectId())}
                className="px-6 py-5 rounded-xl bg-[#f9f5f5] text-gray-800 border-2 border-gray-200 hover:bg-[#333]/30 hover:text-white transition-all duration-500"
              >
                <ChevronLeft size={20} /> Previous Project
              </Button>
            )}
            <Button
              onClick={() => navigateToProject(getNextProjectId())}
              className="px-6 py-5 rounded-xl bg-[#f9f5f5] text-gray-800 border-2 border-gray-200 hover:bg-[#333]/30 hover:text-white transition-all duration-500"
            >
              Next Project <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="p-4 border-2 border-gray-200 rounded-2xl bg-gray-200">
            <Image
              src={selectedImage}
              alt={project.title}
              width={600}
              height={320}
              className="w-[700px] h-full object-cover transition-transform duration-700 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pb-4 mt-2">
            <div
              className={`p-0.5 border-2 rounded-xl cursor-pointer transition-all ${
                selectedImage === project.image
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedImage(project.image)}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={320}
                className="w-full h-full object-cover transition-transform duration-700 rounded-xl"
              />
            </div>
            {project.gallery.map((image) => (
              <div
                key={image}
                className={`p-0.5 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedImage === image
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={project.title}
                  width={600}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-700 rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl h-px mx-auto bg-gray-200" />
    </>
  );
}
