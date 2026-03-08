import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
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

  // Related posts: same tags, exclude current, max 3
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      score: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ slug, title }) => ({ slug, title }));

  return (
    <>
      <Navbar />
      <PageWrapper className="pt-32 pb-16">
        <BlogDetail
          post={post}
          prev={prev}
          next={next}
          relatedPosts={relatedPosts}
        />
      </PageWrapper>
    </>
  );
}
