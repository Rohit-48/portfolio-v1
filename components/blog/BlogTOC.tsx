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
        <span className="block font-mono text-[10px] text-dim tracking-label uppercase mb-4">
          ON THIS PAGE
        </span>
        <ul className="space-y-2 border-l border-border pl-4">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className="block font-mono text-[11px] text-ghost hover:text-accent transition-colors duration-[80ms] truncate"
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
