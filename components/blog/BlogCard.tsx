"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogMeta } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

interface BlogCardProps {
  post: BlogMeta;
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div variants={cardVariant}>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block p-8 md:p-10 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5"
      >
        {/* Bottom accent sweep — slides in on hover */}
        <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />

        {/* Meta row */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] text-dim tracking-[0.05em]">
            {formatDateShort(post.date)}
          </span>
          <span className="font-mono text-[11px] text-accent tracking-tag">
            {post.readTime} MIN READ
          </span>
        </div>

        {/* Title */}
        <h3 className="font-mono text-[20px] md:text-[22px] font-semibold text-primary leading-[1.25] tracking-tighter line-clamp-2 mb-4 group-hover:text-accent transition-colors duration-150 ease-out">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-sans text-[14px] md:text-[15px] text-secondary leading-[1.7] line-clamp-2 mb-6">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
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
