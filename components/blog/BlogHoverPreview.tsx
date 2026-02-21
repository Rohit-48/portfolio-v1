"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { BlogMeta } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

const PREVIEW_SIZE = 280;
const CURSOR_OFFSET = 24;

interface BlogHoverPreviewProps {
  post: BlogMeta | null;
  x: number;
  y: number;
}

export default function BlogHoverPreview({
  post,
  x,
  y,
}: BlogHoverPreviewProps) {
  const visible = post !== null;

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
      {visible && post && (
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
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] text-accent tracking-label uppercase">
                {formatDateShort(post.date)}
              </span>
              <span className="font-mono text-[10px] text-dim tracking-tag">
                {post.readTime} MIN
              </span>
            </div>
            <h4 className="font-mono text-[15px] font-semibold text-primary leading-tight tracking-tighter line-clamp-2 mb-3">
              {post.title}
            </h4>
            <p className="font-sans text-[12px] text-secondary leading-normal line-clamp-4">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.slice(0, 3).map((tag) => (
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
