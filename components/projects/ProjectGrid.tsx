"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ProjectMeta } from "@/types/project";
import ProjectCard from "./ProjectCard";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

interface ProjectGridProps {
  projects: ProjectMeta[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div>
      {/* Project cards */}
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col gap-5"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
