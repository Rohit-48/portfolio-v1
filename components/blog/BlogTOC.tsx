"use client";

import { useCallback } from "react";

export interface TocHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

interface BlogTOCProps {
  headings: TocHeading[];
}

export default function BlogTOC({ headings }: BlogTOCProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block w-44 xl:w-52 shrink-0"
    >
      <div className="sticky top-32">
        <span className="blog-body block text-[10px] text-[#a3a3a3] tracking-[0.1em] uppercase mb-4">
          On this page
        </span>
        <ul className="space-y-2 border-l border-[#262626] pl-4">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className="blog-body block text-[11px] text-[#a3a3a3] hover:text-[#FFD000] transition-colors truncate"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
