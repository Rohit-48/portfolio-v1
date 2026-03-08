import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog | Rohit",
  description:
    "Thoughts on web development, systems programming, and building things that last.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <div className="blog-section min-h-screen">
        <PageWrapper className="pt-32 pb-16">
          {/* Bold heading */}
          <h1 className="blog-heading text-[48px] sm:text-[64px] md:text-[80px] font-bold text-white leading-[0.95] tracking-tighter">
            BLOG
          </h1>
          <p className="blog-body text-[14px] text-[#a3a3a3] mt-3 max-w-md tracking-wide">
            Thoughts on web development, systems programming, and building things
            that last.
          </p>

          {/* Content — no excessive bottom whitespace */}
          <div className="mt-10 md:mt-12">
            <BlogGrid posts={posts} />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}
