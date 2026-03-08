"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogMeta } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

interface BlogCardProps {
  post: BlogMeta;
}

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div variants={cardVariant}>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block p-6 md:p-8 border border-[#262626] bg-[#0a0a0a] transition-all duration-200 hover:border-[#FFD000]/30 hover:shadow-[0_0_20px_rgba(255,208,0,0.08)]"
      >
        {/* Yellow left border on hover */}
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FFD000] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-200" />

        {/* Date */}
        <span className="blog-body block text-[11px] text-[#a3a3a3] tracking-[0.05em] uppercase mb-4">
          {formatDateShort(post.date)}
        </span>

        {/* Title */}
        <h3 className="blog-heading text-[18px] md:text-[20px] font-semibold text-white leading-[1.25] mb-3 group-hover:text-[#FFD000] transition-colors duration-150">
          {post.title}
        </h3>

        {/* Description */}
        <p className="blog-body text-[14px] text-[#a3a3a3] leading-[1.6] line-clamp-2 mb-5">
          {post.excerpt}
        </p>

        {/* Tags — yellow outline pills */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="blog-body text-[10px] tracking-[0.08em] uppercase px-2.5 py-1 border border-[#FFD000] text-[#FFD000]"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
