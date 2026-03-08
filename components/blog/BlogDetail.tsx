import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface NavItem {
  slug: string;
  title: string;
}

interface BlogDetailProps {
  post: BlogPost;
  prev?: NavItem;
  next?: NavItem;
}

function convertMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .split("\n\n")
    .map((block) => {
      const t = block.trim();
      if (
        !t ||
        t.startsWith("<h") ||
        t.startsWith("<ul") ||
        t.startsWith("<pre") ||
        t.startsWith("<blockquote")
      )
        return t;
      return `<p>${t}</p>`;
    })
    .join("\n");
}

export default function BlogDetail({ post, prev, next }: BlogDetailProps) {
  return (
    <div>
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-[11px] text-dim tracking-label uppercase hover:text-accent transition-colors duration-[80ms] mb-8"
      >
        &larr; ALL POSTS
      </Link>

      {/* Meta row */}
      <div className="flex items-center gap-4 mb-3">
        <span className="font-mono text-[11px] text-dim tracking-tag">
          {formatDate(post.date)}
        </span>
        <span className="font-mono text-[11px] text-border">&middot;</span>
        <span className="font-mono text-[11px] text-accent tracking-tag">
          {post.readTime} MIN READ
        </span>
      </div>

      {/* Title */}
      <h1 className="font-mono text-[28px] md:text-[36px] font-bold text-primary leading-[1.05] tracking-tight mb-4">
        {post.title}
      </h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-tag uppercase px-2 py-0.5 border border-tag-border text-tag-text"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t border-border mb-8" />

      {/* Article prose */}
      <article
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: convertMarkdown(post.content) }}
      />

      {/* Footer nav */}
      {(prev || next) && (
        <div className="mt-12">
          <div className="border-t border-border mb-6" />
          <div className="flex items-start justify-between">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group">
                <span className="block font-mono text-[10px] text-dim tracking-label uppercase mb-1">
                  PREVIOUS
                </span>
                <span className="font-mono text-[13px] text-primary group-hover:text-accent transition-colors duration-[80ms]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group text-right"
              >
                <span className="block font-mono text-[10px] text-dim tracking-label uppercase mb-1">
                  NEXT
                </span>
                <span className="font-mono text-[13px] text-primary group-hover:text-accent transition-colors duration-[80ms]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
