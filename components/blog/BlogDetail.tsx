import type { BlogPost } from "@/types/blog";
import { formatDate, slugify } from "@/lib/utils";
import Link from "next/link";
import BlogTOC from "./BlogTOC";

interface NavItem {
  slug: string;
  title: string;
}

interface BlogDetailProps {
  post: BlogPost;
  prev?: NavItem;
  next?: NavItem;
}

function convertMarkdownWithHeadings(
  md: string
): { html: string; headings: { level: 2 | 3; text: string; id: string }[] } {
  const headings: { level: 2 | 3; text: string; id: string }[] = [];
  const seenIds = new Map<string, number>();
  const addId = (text: string, level: 2 | 3) => {
    const base = slugify(text);
    const count = seenIds.get(base) ?? 0;
    seenIds.set(base, count + 1);
    const id = count > 0 ? `${base}-${count}` : base;
    headings.push({ level, text: text.trim(), id });
    return id;
  };
  const html = md
    .replace(/^### (.+)$/gm, (_, t) => `<h3 id="${addId(t, 3)}">${t}</h3>`)
    .replace(/^## (.+)$/gm, (_, t) => `<h2 id="${addId(t, 2)}">${t}</h2>`)
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
  return { html, headings };
}

export default function BlogDetail({ post, prev, next }: BlogDetailProps) {
  const { html, headings } = convertMarkdownWithHeadings(post.content);

  return (
    <div className="w-full">
      <div className="flex gap-12 lg:gap-16">
        {/* Floating TOC — desktop and tablet only (hidden on mobile via BlogTOC) */}
        <BlogTOC headings={headings} />

        <div className="min-w-0 flex-1 max-w-[720px]">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] text-dim tracking-label uppercase hover:text-accent transition-colors duration-[80ms] mb-12"
          >
            &larr; ALL POSTS
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-tag uppercase px-2 py-1 border border-tag-border text-tag-text"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-mono text-[32px] md:text-[44px] font-bold text-primary leading-[1.05] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-6 mb-10">
            <span className="font-mono text-[11px] text-dim tracking-tag">
              {formatDate(post.date)}
            </span>
            <span className="font-mono text-[11px] text-border">&middot;</span>
            <span className="font-mono text-[11px] text-accent tracking-tag">
              {post.readTime} MIN READ
            </span>
          </div>

          <div className="border-t border-border mb-12" />

          {/* Article prose — narrower column for reading comfort */}
          <article
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Footer nav */}
          {(prev || next) && (
            <div className="mt-16">
              <div className="border-t border-border mb-10" />
              <div className="flex items-start justify-between">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="group">
                    <span className="block font-mono text-[10px] text-dim tracking-label uppercase mb-1">
                      PREVIOUS POST
                    </span>
                    <span className="font-mono text-sm text-primary group-hover:text-accent transition-colors duration-[80ms]">
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
                      NEXT POST
                    </span>
                    <span className="font-mono text-sm text-primary group-hover:text-accent transition-colors duration-[80ms]">
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
      </div>
    </div>
  );
}
