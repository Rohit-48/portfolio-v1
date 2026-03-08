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
  live: { className: "border-status-live-border text-status-live", label: "LIVE" },
  wip: { className: "border-status-wip-border text-status-wip", label: "WIP" },
  archived: { className: "border-status-archived-border text-status-archived", label: "ARCHIVED" },
};

const cardVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");
  const status = statusConfig[project.status];
  const { setPreview } = useProjectPreview() ?? {};

  return (
    <motion.div variants={cardVariant}>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex items-start gap-4 px-4 py-4 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5"
        onMouseEnter={(e) => setPreview?.(project, e.clientX, e.clientY)}
        onMouseMove={(e) => setPreview?.(project, e.clientX, e.clientY)}
        onMouseLeave={() => setPreview?.(null, 0, 0)}
      >
        {/* Bottom accent sweep */}
        <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />

        {/* Number */}
        <span className="font-mono text-[10px] text-accent tracking-label font-medium shrink-0 mt-0.5">
          {num}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-mono text-[14px] md:text-[16px] font-semibold text-primary leading-tight tracking-tighter truncate group-hover:text-accent transition-colors duration-150 ease-out">
              {project.title}
            </h3>
            <span
              className={cn(
                "font-mono text-[9px] tracking-[0.1em] px-1.5 py-0.5 border shrink-0",
                status.className
              )}
            >
              {status.label}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-[12px] text-secondary leading-relaxed line-clamp-1 mb-2">
            {project.description}
          </p>

          {/* Tags + year */}
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-tag uppercase px-1.5 py-0.5 border border-tag-border text-tag-text group-hover:border-accent/40 transition-colors duration-150 ease-out"
              >
                {tag}
              </span>
            ))}
            <span className="font-mono text-[9px] text-dim tracking-tag ml-auto shrink-0">
              {project.year}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <span className="font-mono text-accent text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 ease-out shrink-0 mt-0.5">
          &rarr;
        </span>
      </Link>
    </motion.div>
  );
}
