"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/types/project";
import { cn } from "@/lib/utils";
import { useProjectPreview } from "./ProjectPreviewContext";

interface ProjectCardProps {
  project: ProjectMeta;
  index: number;
}

const statusConfig: Record<string, { className: string; label: string }> = {
  live: {
    className: "border-accent text-accent",
    label: "LIVE",
  },
  wip: {
    className: "border-muted text-muted",
    label: "WIP",
  },
  archived: {
    className: "border-border text-dim",
    label: "ARCHIVED",
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const num = String(index + 1).padStart(3, "0");
  const status = statusConfig[project.status];
  const { setPreview } = useProjectPreview() ?? {};

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPreview?.(project, e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPreview?.(project, e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setPreview?.(null, 0, 0);
  };

  return (
    <motion.div variants={cardVariant}>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block p-8 md:p-10 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Bottom accent sweep — slides in on hover */}
        <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />

        {/* Meta row */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] text-accent tracking-label font-medium">
            {num}
          </span>
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "font-mono text-[10px] tracking-[0.1em] px-2 py-0.5 border",
                status.className
              )}
            >
              {status.label}
            </span>
            <span className="font-mono text-[11px] text-dim tracking-tag">
              {project.year}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-mono text-[20px] md:text-[22px] font-semibold text-primary leading-[1.2] tracking-tighter mb-4 group-hover:text-accent transition-colors duration-150 ease-out">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-[14px] md:text-[15px] text-secondary leading-[1.7] line-clamp-2 mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-tag uppercase px-2.5 py-1 border border-tag-border text-tag-text group-hover:border-accent/40 group-hover:text-primary transition-colors duration-150 ease-out"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
