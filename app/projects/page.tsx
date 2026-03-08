import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects | Rohit",
  description:
    "Things I've built: web interfaces, systems tools, and everything in between.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Page header */}
        <span className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase">
          SELECTED WORK
        </span>
        <h1 className="font-mono text-[28px] md:text-[32px] font-bold text-primary leading-[1.0] tracking-tight mt-2">
          Projects
        </h1>
        <p className="font-sans text-[13px] text-secondary leading-relaxed mt-3 max-w-md">
          Things I&apos;ve built: web interfaces, systems tools, and everything
          in between.
        </p>

        {/* Divider */}
        <div className="border-t border-border mt-6" />

        {/* Content */}
        <div className="mt-6">
          <ProjectGrid projects={projects} />
        </div>
      </PageWrapper>
    </>
  );
}
