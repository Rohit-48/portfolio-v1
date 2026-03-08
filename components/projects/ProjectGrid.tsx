"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ProjectMeta } from "@/types/project";
import ProjectCard from "./ProjectCard";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

interface ProjectGridProps {
  projects: ProjectMeta[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div>
      {/* Count */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-dim tracking-tag">
          {projects.length} PROJECT{projects.length !== 1 ? "S" : ""}
        </span>
      </div>

      {/* Project cards */}
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col gap-2"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
