import { assert } from "@/lib/assert";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  status: "live" | "coming-soon";
}

export const PROJECTS: Project[] = [
  {
    slug: "fpl2025",
    title: "FPL2025",
    tagline: "Autonomous Fantasy Premier League Bot",
    description:
      "An ML-powered bot that autonomously manages a Fantasy Premier League team. " +
      "Uses PyCaret for predictive modeling to evaluate players across multiple " +
      "dimensions including ROI, points per game, and form analysis. Runs on " +
      "Google Cloud Platform with Cloud Run and Cloud Scheduler, containerized " +
      "with Docker, and deployed via GitHub Actions with Terraform IaC.",
    techStack: ["Python", "GCP", "PyCaret", "Docker", "Terraform"],
    githubUrl: "https://github.com/datareemz/FPL2025",
    status: "live",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    tagline: "The site you are looking at right now",
    description:
      "A minimalist, personality-driven portfolio built with Next.js, " +
      "Tailwind CSS, and Framer Motion. Features a typewriter animation, " +
      "system-aware dark mode, and smooth scroll-triggered animations.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: null,
    status: "live",
  },
  {
    slug: "coming-soon",
    title: "Coming Soon",
    tagline: "Something interesting is brewing",
    description: "A new project is in the works. Stay tuned.",
    techStack: [],
    githubUrl: null,
    status: "coming-soon",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  assert(typeof slug === "string", "slug must be a string");
  assert(slug.length > 0, "slug must not be empty");

  return PROJECTS.find((p) => p.slug === slug);
}
