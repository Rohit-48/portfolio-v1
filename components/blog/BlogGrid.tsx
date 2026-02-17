"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BlogMeta } from "@/types/blog";
import BlogCard from "./BlogCard";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

interface BlogGridProps {
  posts: BlogMeta[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col gap-5"
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
}
