"use client";

import { useState } from "react";
import type { ProjectMeta } from "@/types/project";
import ProjectsSidebar from "./ProjectsSidebar";
import ProjectGrid from "./ProjectGrid";

interface ProjectsListContentProps {
  projects: ProjectMeta[];
}

export default function ProjectsListContent({ projects }: ProjectsListContentProps) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [activeTag, setActiveTag] = useState("ALL");
  const filtered =
    activeTag === "ALL" ? projects : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
      <ProjectsSidebar
        allTags={allTags}
        activeTag={activeTag}
        onTagSelect={setActiveTag}
      />
      <div className="min-w-0 flex-1 lg:min-w-0">
        <ProjectGrid projects={filtered} />
      </div>
    </div>
  );
}
