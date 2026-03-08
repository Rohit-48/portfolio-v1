"use client";

import { useCallback, useMemo } from "react";
import type { BlogPost } from "@/types/blog";
import { formatDate, slugify } from "@/lib/utils";
import Link from "next/link";
import BlogTOC from "./BlogTOC";
import { useHighlighting } from "./useHighlighting";

interface NavItem {
  slug: string;
  title: string;
}

interface BlogDetailProps {
  post: BlogPost;
  prev?: NavItem;
  next?: NavItem;
  relatedPosts?: NavItem[];
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

  // Extract fenced code blocks first
  const codeBlocks: { lang: string; code: string }[] = [];
  const withPlaceholders = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: (lang || "text").trim(), code: code.trim() });
    return `\n{{CODE_BLOCK:${idx}}}\n`;
  });

  const processed = withPlaceholders
    .replace(/^### (.+)$/gm, (_, t) => `<h3 id="${addId(t, 3)}">${t}</h3>`)
    .replace(/^## (.+)$/gm, (_, t) => `<h2 id="${addId(t, 2)}">${t}</h2>`)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);

  // Split by double newlines, process blocks, restore code blocks
  const html = processed
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      const codeMatch = t.match(/^\{\{CODE_BLOCK:(\d+)\}\}$/);
      if (codeMatch) {
        const idx = parseInt(codeMatch[1], 10);
        const { lang, code } = codeBlocks[idx]!;
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
        return `<pre><code class="language-${lang}">${escaped}</code></pre>`;
      }
      if (
        !t ||
        t.startsWith("<h") ||
        t.startsWith("<ul") ||
        t.startsWith("<blockquote")
      )
        return t;
      return `<p>${t}</p>`;
    })
    .join("\n\n");

  return { html, headings };
}

function ShareButton({ title, slug }: { title: string; slug: string }) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : "";
  const share = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title, url, text: title }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url).then(() => {});
    }
  }, [title, url]);

  return (
    <button
      onClick={share}
      className="font-mono text-[11px] text-dim tracking-tag uppercase hover:text-accent transition-colors duration-[80ms] border border-border hover:border-accent/40 px-3 py-1.5"
      type="button"
    >
      SHARE
    </button>
  );
}

export default function BlogDetail({
  post,
  prev,
  next,
  relatedPosts = [],
}: BlogDetailProps) {
  const { html, headings } = useMemo(
    () => convertMarkdownWithHeadings(post.content),
    [post.content]
  );

  const articleRef = useHighlighting();

  return (
    <div className="flex gap-12 lg:gap-16 w-full">
      {/* Sticky TOC — desktop only */}
      <BlogTOC headings={headings} />

      <article
        ref={articleRef}
        className="min-w-0 flex-1 max-w-[680px] mx-auto lg:mx-0"
      >
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
          <span className="flex-1" />
          <ShareButton title={post.title} slug={post.slug} />
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
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <span className="block font-mono text-[11px] text-accent tracking-label uppercase mb-4">
              RELATED
            </span>
            <ul className="space-y-3">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="font-mono text-[14px] text-secondary hover:text-accent transition-colors duration-[80ms]"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Prev/Next footer nav */}
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
      </article>
    </div>
  );
}
