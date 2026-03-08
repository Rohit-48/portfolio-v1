"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BlogMeta } from "@/types/blog";
import BlogCard from "./BlogCard";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

interface BlogGridProps {
  posts: BlogMeta[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div>
      {/* Count */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-dim tracking-tag">
          {posts.length} POST{posts.length !== 1 ? "S" : ""}
        </span>
      </div>

      {/* Blog cards */}
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col gap-2"
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </motion.div>
    </div>
  );
}
