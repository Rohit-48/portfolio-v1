"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogMeta } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

interface BlogCardProps {
  post: BlogMeta;
}

const cardVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div variants={cardVariant}>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex items-start gap-4 px-4 py-4 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5"
      >
        {/* Bottom accent sweep */}
        <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />

        {/* Date */}
        <span className="font-mono text-[10px] text-dim tracking-tag shrink-0 w-16 mt-0.5">
          {formatDateShort(post.date)}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-mono text-[14px] md:text-[16px] font-semibold text-primary leading-tight tracking-tighter truncate group-hover:text-accent transition-colors duration-150 ease-out mb-1">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="font-sans text-[12px] text-secondary leading-relaxed line-clamp-1 mb-2">
            {post.excerpt}
          </p>

          {/* Tags + read time */}
          <div className="flex items-center gap-2 flex-wrap">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-tag uppercase px-1.5 py-0.5 border border-tag-border text-tag-text group-hover:border-accent/40 transition-colors duration-150 ease-out"
              >
                {tag}
              </span>
            ))}
            <span className="font-mono text-[9px] text-accent tracking-tag ml-auto shrink-0">
              {post.readTime} MIN READ
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
