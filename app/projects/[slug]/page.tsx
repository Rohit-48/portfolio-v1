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
import ProjectsSidebar from "@/components/projects/ProjectsSidebar";

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
      <PageWrapper className="pt-32 pb-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <ProjectsSidebar tags={project.tags} />
          <div className="min-w-0 flex-1 max-w-3xl">
            <ProjectDetail project={project} prev={prev} next={next} />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
