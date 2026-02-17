import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogMeta } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content", "blog");

function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const {
    title,
    excerpt,
    date,
    readTime,
    tags,
    published = true,
  } = data as Partial<BlogPost>;

  if (!title || !excerpt || !date || !tags) {
    return null;
  }

  const computedReadTime =
    typeof readTime === "number"
      ? readTime
      : Math.max(1, Math.round(content.split(/\s+/).length / 200));

  return {
    slug,
    title,
    excerpt,
    date,
    readTime: computedReadTime,
    tags,
    published: Boolean(published),
    content: content.trim(),
  };
}

export function getAllPosts(): BlogMeta[] {
  return getPostSlugs()
    .map((slug) => readPost(slug))
    .filter((post): post is BlogPost => !!post && post.published)
    .map(({ content, ...meta }) => meta)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = readPost(slug);
  return post && post.published ? post : undefined;
}

export function getAllPostSlugs(): string[] {
  return getPostSlugs().filter((slug) => {
    const post = readPost(slug);
    return post?.published;
  });
}
