import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Writing | Rohit",
  description:
    "Thoughts on web development, systems programming, and building things that last.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Page header */}
        <span className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase">
          WRITING
        </span>
        <h1 className="font-mono text-[28px] md:text-[32px] font-bold text-primary leading-[1.0] tracking-tight mt-2">
          Blog
        </h1>
        <p className="font-sans text-[13px] text-secondary leading-relaxed mt-3 max-w-md">
          Thoughts on web development, systems programming, and building things
          that last.
        </p>

        {/* Divider */}
        <div className="border-t border-border mt-6" />

        {/* Content */}
        <div className="mt-6">
          <BlogGrid posts={posts} />
        </div>
      </PageWrapper>
    </>
  );
}
