"use client";

import { Button, cn } from "@repo/ui";
import { ACTION_BUTTON, ACTION_BUTTON_PRIMARY, ACTION_BUTTON_OUTLINE } from "@/lib/ui";
import { projects } from "@/data/data";
import { CaretRight, CaretLeft, Link as LinkIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const project = projects.find((project) => project.id === parseInt(resolvedParams.id));

  const [selectedImage, setSelectedImage] = useState(project?.image || "");

  // Check if user came from navigation (has 'nav' search param)
  const cameFromNavigation = searchParams.get("nav") === "true";

  // Get original project ID from URL params (the first page visited)
  const originalProjectId = searchParams.get("original") || resolvedParams.id;
  const isBackToOriginal = resolvedParams.id === originalProjectId;

  // Get current project index
  const currentProjectIndex = projects.findIndex((p) => p.id === parseInt(resolvedParams.id));

  // Neighbouring projects, wrapping around at both ends. Indexed access is
  // checked (noUncheckedIndexedAccess), so these are resolved once here rather
  // than asserted non-null at each call site.
  const previousProject =
    projects[currentProjectIndex <= 0 ? projects.length - 1 : currentProjectIndex - 1];

  const nextProject =
    projects[currentProjectIndex >= projects.length - 1 ? 0 : currentProjectIndex + 1];

  const navigateToProject = (projectId: number) => {
    // Add nav=true and preserve original project ID
    router.push(`/projects/${projectId}?nav=true&original=${originalProjectId}`);
  };

  if (!project) {
    return (
      <section className="min-h-screen px-4 pt-24 pb-20 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mt-2 mb-12 text-2xl font-bold text-black md:text-3xl">
            Project Not Found
          </h2>
          <p className="text-base leading-relaxed text-gray-500">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen px-4 pt-24 pb-20 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mt-2 mb-12 text-2xl font-bold text-black capitalize md:text-3xl">
            {project.title}
          </h2>
          <p className="text-base leading-relaxed text-gray-500">{project.summary}</p>
        </div>

        {/* Description */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border-3 border-gray-200 bg-gray-100 px-6 py-2">
          <h6 className="mt-2 mb-4 text-xl font-bold text-black capitalize">Description</h6>
          <p className="pb-6 text-base leading-relaxed text-gray-500">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-col gap-2 border-y border-gray-200 py-2">
            <h6 className="mt-2 mb-4 text-xl font-bold text-black capitalize">Technologies</h6>
            <div className="flex flex-row flex-wrap items-center gap-2 pb-3">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-500"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Date and Client */}
          <div className="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
            <div>
              <p className="flex flex-col gap-3 py-5 text-base leading-relaxed text-gray-600">
                <span className="font-bold text-gray-800">Date</span>{" "}
                <span className="text-gray-600">{project.date}</span>
              </p>
            </div>
            <div>
              <p className="flex flex-col gap-3 py-5 text-base leading-relaxed text-gray-600">
                <span className="font-bold text-gray-800">Client</span>{" "}
                <span className="text-gray-600">{project.client}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-between gap-4 md:flex-row">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ACTION_BUTTON, ACTION_BUTTON_PRIMARY)}
          >
            View Project <LinkIcon size={20} />
          </Link>
          <div className="flex flex-row items-center gap-2">
            {cameFromNavigation && !isBackToOriginal && (
              <Button
                onClick={() => previousProject && navigateToProject(previousProject.id)}
                className={cn(ACTION_BUTTON, ACTION_BUTTON_OUTLINE)}
              >
                <CaretLeft size={20} /> Previous Project
              </Button>
            )}
            <Button
              onClick={() => nextProject && navigateToProject(nextProject.id)}
              className={cn(ACTION_BUTTON, ACTION_BUTTON_OUTLINE)}
            >
              Next Project <CaretRight size={20} />
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border-2 border-gray-200 bg-gray-200 p-4">
            <Image
              src={selectedImage}
              alt={project.title}
              width={600}
              height={320}
              className="h-full w-175 rounded-xl object-cover transition-transform duration-700"
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-4 pb-4 md:grid-cols-3 lg:grid-cols-6">
            <div
              className={`cursor-pointer rounded-xl border-2 p-0.5 transition-all ${
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
                className="h-full w-full rounded-xl object-cover transition-transform duration-700"
              />
            </div>
            {project.gallery.map((image) => (
              <div
                key={image}
                className={`cursor-pointer rounded-xl border-2 p-0.5 transition-all ${
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
                  className="h-full w-full rounded-xl object-cover transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto h-px w-full max-w-xs bg-gray-200 sm:max-w-md md:max-w-lg lg:max-w-4xl" />
    </>
  );
}
