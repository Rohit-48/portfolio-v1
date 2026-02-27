import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAllProjects,
} from "@/lib/projects";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import CursorRing from "@/components/CursorRing";
import ProjectDetail from "@/components/projects/ProjectDetail";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Rohit`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const idx = allProjects.findIndex((p) => p.slug === slug);

  const prev =
    idx > 0
      ? { slug: allProjects[idx - 1].slug, title: allProjects[idx - 1].title }
      : undefined;
  const next =
    idx < allProjects.length - 1
      ? { slug: allProjects[idx + 1].slug, title: allProjects[idx + 1].title }
      : undefined;

  return (
    <>
      <CursorRing />
      <Navbar />
      <PageWrapper className="max-w-3xl mx-auto px-8 md:px-8 lg:px-8 pt-32 pb-40">
        <ProjectDetail project={project} prev={prev} next={next} />
      </PageWrapper>
    </>
  );
}
