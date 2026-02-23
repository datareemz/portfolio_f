import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { assert } from "@/lib/assert";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Oluwaseyi Kareem",
  description: "Projects by Oluwaseyi Kareem",
};

export default function PortfolioPage() {
  assert(PROJECTS.length > 0, "Must have at least one project");
  assert(PROJECTS.length <= 10, "Too many projects");

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          &larr; Back home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mt-8 mb-12 text-center">
          Portfolio
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
