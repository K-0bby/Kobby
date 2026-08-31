import { projects } from "@/data/data";
import ProjectCard from "@/components/projects/project-card";

export default function Projects() {
  return (
    <>
      <section className="min-h-screen pt-24 pb-20 md:pt-32 lg:pt-36">
        <h2 className="mt-8 mb-16 px-4 text-center text-2xl font-bold text-black capitalize md:text-3xl">
          Check out some of my recent works
        </h2>

        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto h-px w-full max-w-xs bg-gray-200 sm:max-w-md md:max-w-lg lg:max-w-4xl" />
    </>
  );
}
