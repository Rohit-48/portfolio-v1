import type { Project, ProjectMeta } from "@/types/project";
import { projects } from "./data";

export function getAllProjects(): ProjectMeta[] {
  // Always return projects sorted by newest first so adding a new
  // project is as simple as appending it to the array above.
  return projects
    .slice()
    .sort((a, b) => b.year - a.year)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      tags: project.tags,
      status: project.status,
      year: project.year,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
    }));
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
