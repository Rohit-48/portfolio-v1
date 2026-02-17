"use client";

import { useState, useRef } from "react";
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
  const allTags = [
    "ALL",
    ...Array.from(new Set(projects.flatMap((p) => p.tags))),
  ];
  const [active, setActive] = useState("ALL");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filtered =
    active === "ALL"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-12">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`font-mono text-[11px] tracking-tag uppercase h-7 px-3 py-1 border transition-colors duration-100 ease-out ${
              active === tag
                ? "border-accent text-accent bg-accent-muted"
                : "border-tag-border text-tag-text hover:border-accent hover:text-primary"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col gap-5"
      >
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
