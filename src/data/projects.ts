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
      "Made a simple bot to help me set my Fantasy Premier League team on a set schedule " +
      "Uses PyCaret for predictive modeling (extra trees model) to evaluate players across multiple " +
      "dimensions including ROI, points per game, and form analysis. Last seasons' aggregated data was used " +
      "as training data and the model has been retrained every 5 gameweeks. The bot is deployed on " +
      "Google Cloud, triggered via cloud run and scheduled via cloud scheduler. ",
    techStack: ["Python", "GCP", "PyCaret", "Docker", "Terraform"],
    githubUrl: "https://github.com/datareemz/FPL2025",
    status: "live",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    tagline: "The site you are looking at right now :)",
    description:
      "A minimalist design portfolio websit built with Next.js and " +
      "Tailwind CSS",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: null,
    status: "live",
  },
  {
    slug: "coming-soon",
    title: "Coming Soon",
    tagline: "Something interesting is brewing",
    description: "A new project is cooking. Stay tuned for more updates",
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
