import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, getProjectBySlug, getNextLiveProject } from "@/data/projects";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import FPLChart from "@/components/FPLChart";
import { parseFPLData } from "@/lib/parseFPLData";
import { assert } from "@/lib/assert";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.status !== "coming-soon").map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: `${project.title} | Oluwaseyi Kareem`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  assert(typeof slug === "string", "slug must be a string");
  assert(slug.length > 0, "slug must not be empty");

  const project = getProjectBySlug(slug);

  if (!project || project.status === "coming-soon") {
    notFound();
  }

  const isFPL = slug === "fpl2025";
  const fpl = isFPL ? parseFPLData() : null;
  const nextProject = getNextLiveProject(slug);

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 min-h-screen">
      <div className="flex items-center justify-between">
        <Link
          href="/portfolio"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          &larr; Back to projects
        </Link>
        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Next project &rarr;
          </Link>
        )}
      </div>

      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold mt-8">
          {project.title}
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          {project.tagline}
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mt-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          {project.description}
        </p>
      </FadeIn>

      {fpl && (
        <div className="mt-10">
          <FPLChart
            data={fpl.weeks}
            totalPoints={fpl.totalPoints}
            showProjectLink={false}
          />
        </div>
      )}

      {project.techStack.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Tech Stack
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.4}>
        <div className="mt-12 flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
            >
              View on GitHub
            </a>
          )}
        </div>
      </FadeIn>
    </main>
  );
}
