"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMeta } from "@/types/project";

const PREVIEW_SIZE = 280;
const CURSOR_OFFSET = 24;

interface ProjectHoverPreviewProps {
  project: ProjectMeta | null;
  x: number;
  y: number;
}

export default function ProjectHoverPreview({
  project,
  x,
  y,
}: ProjectHoverPreviewProps) {
  const visible = project !== null;

  // Position to the right of cursor, vertically centered; clamp to viewport
  const left = Math.min(
    x + CURSOR_OFFSET,
    typeof window !== "undefined" ? window.innerWidth - PREVIEW_SIZE - 16 : x + CURSOR_OFFSET
  );
  const top = Math.max(
    12,
    Math.min(
      y - PREVIEW_SIZE / 2,
      typeof window !== "undefined" ? window.innerHeight - PREVIEW_SIZE - 12 : y - PREVIEW_SIZE / 2
    )
  );

  return (
    <AnimatePresence>
      {visible && project && (
        <motion.div
          className="fixed z-[9999] pointer-events-none"
          style={{ left, top }}
          initial={{
            opacity: 0,
            scale: 0.7,
            x: -CURSOR_OFFSET,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
              duration: 0.14,
              ease: [0.22, 0.61, 0.36, 1],
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.88,
            x: -12,
            transition: { duration: 0.09 },
          }}
        >
          <div
            className="w-[280px] border-2 border-accent bg-surface p-5"
            style={{
              boxShadow: "0 0 42px 56px color-mix(in srgb, var(--border) 40%, transparent)",
            }}
          >
            <div className="font-mono text-[11px] text-accent tracking-label uppercase mb-2">
              {project.year}
            </div>
            <h4 className="font-mono text-[15px] font-semibold text-primary leading-tight tracking-tighter line-clamp-2 mb-3">
              {project.title}
            </h4>
            <p className="font-sans text-[12px] text-secondary leading-[1.5] line-clamp-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-tag uppercase px-2 py-0.5 border border-tag-border text-tag-text"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
