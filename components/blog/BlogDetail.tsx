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
  let html = processed
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
      navigator.share({
        title,
        url,
        text: title,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url).then(() => {});
    }
  }, [title, url]);

  return (
    <button
      onClick={share}
      className="blog-body text-[11px] text-[#a3a3a3] tracking-[0.08em] uppercase hover:text-[#FFD000] transition-colors border border-[#262626] hover:border-[#FFD000] px-3 py-1.5"
      type="button"
    >
      Share
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
    <div className="blog-section min-h-screen">
      <div className="flex gap-12 lg:gap-16 w-full">
        {/* Sticky TOC — desktop only, hidden on mobile */}
        <BlogTOC headings={headings} />

        <article
          ref={articleRef}
          className="min-w-0 flex-1 max-w-[680px] mx-auto lg:mx-0"
        >
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="blog-body inline-flex items-center gap-2 text-[11px] text-[#a3a3a3] tracking-[0.1em] uppercase hover:text-[#FFD000] transition-colors mb-8"
          >
            &larr; All posts
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="blog-body text-[10px] tracking-[0.08em] uppercase px-2 py-1 border border-[#FFD000] text-[#FFD000]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="blog-heading text-[28px] sm:text-[36px] md:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-4">
            {post.title}
          </h1>

          {/* Meta row — date, reading time, share */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <span className="blog-body text-[12px] text-[#a3a3a3]">
              {formatDate(post.date)}
            </span>
            <span className="text-[#404040]">·</span>
            <span className="blog-body text-[12px] text-[#FFD000]">
              {post.readTime} min read
            </span>
            <span className="flex-1" />
            <ShareButton title={post.title} slug={post.slug} />
          </div>

          <div className="border-t border-[#262626] mb-12" />

          {/* Article prose */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* More posts like this */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#262626]">
              <h2 className="blog-heading text-[18px] font-semibold text-white mb-6">
                More posts like this
              </h2>
              <ul className="space-y-4">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="blog-body text-[15px] text-[#a3a3a3] hover:text-[#FFD000] transition-colors"
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
            <div className="mt-16">
              <div className="border-t border-[#262626] mb-10" />
              <div className="flex items-start justify-between gap-6">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="group min-w-0">
                    <span className="blog-body block text-[10px] text-[#a3a3a3] tracking-[0.1em] uppercase mb-1">
                      Previous
                    </span>
                    <span className="blog-body text-sm text-white group-hover:text-[#FFD000] transition-colors line-clamp-2">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group text-right min-w-0"
                  >
                    <span className="blog-body block text-[10px] text-[#a3a3a3] tracking-[0.1em] uppercase mb-1">
                      Next
                    </span>
                    <span className="blog-body text-sm text-white group-hover:text-[#FFD000] transition-colors line-clamp-2">
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
    </div>
  );
}
