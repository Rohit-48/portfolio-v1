import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import CursorRing from "@/components/CursorRing";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects | Rohit",
  description:
    "Things I've built — web interfaces, systems tools, and everything in between.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <CursorRing />
      <Navbar />
      <PageWrapper>
        {/* Page header */}
        <span className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase">
          SELECTED WORK
        </span>
        <h1 className="font-mono text-[40px] md:text-[56px] font-bold text-primary leading-[1.0] tracking-tight mt-3">
          Projects
        </h1>
        <p className="font-sans text-[16px] text-secondary leading-relaxed mt-5 max-w-md">
          Things I&apos;ve built — web interfaces, systems tools, and everything
          in between.
        </p>

        {/* Divider */}
        <div className="border-t border-border mt-12" />

        {/* Content */}
        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </PageWrapper>
    </>
  );
}
