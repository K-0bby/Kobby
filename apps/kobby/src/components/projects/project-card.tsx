"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react";
import { Button, cn } from "@repo/ui";
import { ACTION_BUTTON, ACTION_BUTTON_SUBTLE } from "@/lib/ui";
import type { ProjectItem } from "@/data/data";

interface ProjectCardProps {
  project: ProjectItem;
}

/**
 * Single source of truth for a project card. Both the home page and the
 * projects index render this, so the two grids can't drift apart.
 *
 * Uniformity comes from the flex column: the card fills its grid track, the
 * summary is clamped to a fixed number of lines, and the CTA is pushed to the
 * bottom with mt-auto — so a project with five technology tags lines its
 * button up with one that has three.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border-4 border-gray-200 bg-white p-3 transition-all duration-500">
      {/* Image */}
      <div className="relative h-80 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-gray-800">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={320}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 px-2 py-3">
        <h3 className="text-2xl leading-tight font-bold text-gray-900">
          {project.title}
        </h3>

        {/* Clamped and min-height'd so a short summary reserves the same
            vertical space as a long one. */}
        <p className="line-clamp-3 min-h-[4.5rem] text-base leading-relaxed text-gray-600">
          {project.summary}
        </p>

        <div className="flex flex-row flex-wrap items-center gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-500"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* mt-auto is what keeps every CTA on the same baseline regardless of
            how many rows the tags wrap onto. */}
        <div className="mt-auto pt-4">
          <Button
            onClick={() => router.push(`/projects/${project.id}`)}
            className={cn(ACTION_BUTTON, ACTION_BUTTON_SUBTLE)}
          >
            <span>View Project</span>
            <CaretRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
