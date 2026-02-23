import Link from "next/link";
import type { Project } from "@/data/projects";
import FadeIn from "./FadeIn";
import { assert } from "@/lib/assert";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  assert(project.slug.length > 0, "Project must have a slug");
  assert(index >= 0, "Index must be non-negative");

  const isComingSoon = project.status === "coming-soon";
  const content = (
    <div
      className={`block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
        isComingSoon
          ? "opacity-60 cursor-default"
          : "hover:border-gray-400 dark:hover:border-gray-600 hover:-translate-y-1"
      }`}
    >
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
        {project.tagline}
      </p>
      {project.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <FadeIn delay={index * 0.15}>
      {isComingSoon ? (
        content
      ) : (
        <Link href={`/projects/${project.slug}`}>{content}</Link>
      )}
    </FadeIn>
  );
}
