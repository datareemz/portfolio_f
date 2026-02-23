import { PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { assert } from "@/lib/assert";

export default function ProjectsSection() {
  assert(PROJECTS.length > 0, "Must have at least one project");
  assert(PROJECTS.length <= 10, "Too many projects to display");

  return (
    <section id="projects" className="max-w-4xl mx-auto px-4 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
