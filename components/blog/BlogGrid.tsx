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
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
}
