import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import PatternOverlay from "@/components/background/PatternOverlay";
import CursorRing from "@/components/CursorRing";
import BlogDetail from "@/components/blog/BlogDetail";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Rohit`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);

  const prev =
    idx > 0
      ? { slug: allPosts[idx - 1].slug, title: allPosts[idx - 1].title }
      : undefined;
  const next =
    idx < allPosts.length - 1
      ? { slug: allPosts[idx + 1].slug, title: allPosts[idx + 1].title }
      : undefined;

  return (
    <>
      <PatternOverlay />
      <CursorRing />
      <Navbar />
      <PageWrapper>
        <BlogDetail post={post} prev={prev} next={next} />
      </PageWrapper>
    </>
  );
}
