import type { Project } from "@/types/project";
import Link from "next/link";

interface NavItem {
  slug: string;
  title: string;
}

interface ProjectDetailProps {
  project: Project;
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

const statusDisplay: Record<string, { className: string; label: string }> = {
  live: { className: "text-accent", label: "LIVE" },
  wip: { className: "text-muted", label: "WIP" },
  archived: { className: "text-dim", label: "ARCHIVED" },
};

export default function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  const status = statusDisplay[project.status];

  return (
    <div>
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-[11px] text-dim tracking-label uppercase hover:text-accent transition-colors duration-[80ms] mb-12"
      >
        &larr; ALL PROJECTS
      </Link>

      {/* Header */}
      <span className="block font-mono text-[11px] text-accent tracking-label font-medium mb-3">
        {project.year}
      </span>
      <h1 className="font-mono text-[36px] md:text-[48px] font-bold text-primary leading-[1.0] tracking-tight mb-5">
        {project.title}
      </h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-tag uppercase px-2 py-1 border border-tag-border text-tag-text"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t border-border mb-8" />

      {/* Meta grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div>
          <p className="font-mono text-[10px] text-dim tracking-label uppercase mb-1">
            STATUS
          </p>
          <p className={`font-mono text-sm font-medium ${status.className}`}>
            {status.label}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-dim tracking-label uppercase mb-1">
            YEAR
          </p>
          <p className="font-mono text-sm text-primary font-medium">
            {project.year}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-dim tracking-label uppercase mb-1">
            LINKS
          </p>
          <div className="flex flex-col gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-accent hover:underline underline-offset-2 transition-colors duration-[80ms]"
              >
                GitHub &nearr;
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-accent hover:underline underline-offset-2 transition-colors duration-[80ms]"
              >
                Live &nearr;
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content body */}
      <div className="max-w-[640px]">
        <div className="font-sans text-[16px] text-secondary leading-[1.8] mb-12">
          {project.longDescription}
        </div>

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: convertMarkdown(project.content) }}
        />
      </div>

      {/* Prev / Next nav */}
      {(prev || next) && (
        <div className="mt-20">
          <div className="border-t border-border mb-8" />
          <div className="flex items-start justify-between">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group">
                <span className="block font-mono text-[10px] text-dim tracking-label uppercase mb-1">
                  PREVIOUS PROJECT
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
                href={`/projects/${next.slug}`}
                className="group text-right"
              >
                <span className="block font-mono text-[10px] text-dim tracking-label uppercase mb-1">
                  NEXT PROJECT
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
  );
}
