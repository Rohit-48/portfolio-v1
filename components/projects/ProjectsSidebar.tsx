"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectsSidebarProps {
  /** Tags to show (e.g. current project's tags on detail page) */
  tags?: string[];
  /** All tags for filter mode (list page) */
  allTags?: string[];
  /** Active filter tag (list page) */
  activeTag?: string;
  /** Filter change handler (list page) */
  onTagSelect?: (tag: string) => void;
}

export default function ProjectsSidebar({
  tags = [],
  allTags,
  activeTag = "ALL",
  onTagSelect,
}: ProjectsSidebarProps) {
  const pathname = usePathname();
  const isListPage = pathname === "/projects";

  const displayTags = allTags ?? tags;
  const isFilterMode = !!onTagSelect && !!allTags;

  return (
    <aside className="w-full lg:w-48 xl:w-56 shrink-0">
      <nav className="lg:sticky lg:top-32 space-y-8">
        <Link
          href="/projects"
          className={`block font-mono text-[11px] tracking-label uppercase transition-colors duration-100 ${
            isListPage ? "text-accent font-medium" : "text-ghost hover:text-accent"
          }`}
        >
          ALL PROJECTS
        </Link>

        {displayTags.length > 0 && (
          <div
            className={
              isFilterMode
                ? "flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-2"
                : "flex flex-col gap-2"
            }
          >
            {isFilterMode ? (
              <>
                <button
                  onClick={() => onTagSelect?.("ALL")}
                  className={`px-3 py-2 border font-mono text-[10px] tracking-tag uppercase transition-colors duration-100 lg:w-full lg:text-left ${
                    activeTag === "ALL"
                      ? "border-accent text-accent bg-accent-muted"
                      : "border-tag-border text-tag-text hover:border-accent hover:text-primary"
                  }`}
                >
                  ALL
                </button>
                {displayTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagSelect?.(tag)}
                    className={`px-3 py-2 border font-mono text-[10px] tracking-tag uppercase transition-colors duration-100 lg:w-full lg:text-left ${
                      activeTag === tag
                        ? "border-accent text-accent bg-accent-muted"
                        : "border-tag-border text-tag-text hover:border-accent hover:text-primary"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </>
            ) : (
              displayTags.map((tag) => (
                <span
                  key={tag}
                  className="block px-3 py-2 border border-tag-border font-mono text-[10px] tracking-tag uppercase text-tag-text"
                >
                  {tag}
                </span>
              ))
            )}
          </div>
        )}
      </nav>
    </aside>
  );
}
