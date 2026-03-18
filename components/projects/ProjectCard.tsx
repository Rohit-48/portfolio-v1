"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/types/project";
import { cn } from "@/lib/utils";

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

  return (
    <motion.div variants={cardVariant} className="h-full">
      <div
        className="h-full group relative flex flex-col gap-4 px-5 py-5 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5"
      >
        {/* Bottom accent sweep */}
        <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />

        <div className="flex items-start gap-4">
          {/* Number */}
          <span className="font-mono text-[10px] text-accent tracking-label font-medium shrink-0 mt-0.5">
            {num}
          </span>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-center gap-3 mb-1">
              <Link href={`/projects/${project.slug}`} className="min-w-0">
                <h3 className="font-mono text-[14px] md:text-[16px] font-semibold text-primary leading-tight tracking-tighter truncate group-hover:text-accent transition-colors duration-150 ease-out">
                  {project.title}
                </h3>
              </Link>
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
            <p className="font-sans text-[12px] text-secondary leading-relaxed line-clamp-2 mb-3">
              {project.description}
            </p>

            {/* Tags + year */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
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
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
          <Link
            href={`/projects/${project.slug}`}
            className="group/btn inline-flex items-center gap-2 h-8 px-4 bg-accent font-mono text-[10px] text-[#F0F0F0] tracking-label uppercase transition-colors duration-150 ease-out hover:bg-accent-hover"
          >
            DETAILS
            <span className="inline-block group-hover/btn:translate-x-0.5 transition-transform duration-150 ease-out">
              &rarr;
            </span>
          </Link>
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 h-8 px-4 border border-border font-mono text-[10px] text-primary tracking-label uppercase transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
            >
              LIVE
              <span className="inline-block group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-150 ease-out">
                &#8599;
              </span>
            </a>
          )}
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 h-8 px-4 border border-border font-mono text-[10px] text-primary tracking-label uppercase transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
            >
              GITHUB
              <span className="inline-block group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-150 ease-out">
                &#8599;
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
