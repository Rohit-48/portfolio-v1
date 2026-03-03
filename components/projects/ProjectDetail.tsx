import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import ProjectActionButtons from "@/components/projects/ProjectActionButtons";
import ProjectMetaGrid from "@/components/projects/ProjectMetaGrid";

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
      const text = block.trim();
      if (
        !text ||
        text.startsWith("<h") ||
        text.startsWith("<ul") ||
        text.startsWith("<pre") ||
        text.startsWith("<blockquote")
      ) {
        return text;
      }
      return `<p>${text}</p>`;
    })
    .join("\n");
}

const statusBadgeMap: Record<Project["status"], string> = {
  live: "border-accent text-accent",
  wip: "border-[#92400E] text-[#92400E] dark:border-[#D97706] dark:text-[#D97706]",
  archived: "border-[#555555] text-[#555555]",
};

const statusLabelMap: Record<Project["status"], string> = {
  live: "LIVE",
  wip: "WIP",
  archived: "ARCHIVED",
};

export default function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  const navJustify = prev && next ? "justify-between" : prev ? "justify-start" : "justify-end";

  return (
    <div className="w-full">
      <Link
        href="/projects"
        className="mb-10 inline-flex items-center font-mono text-[11px] text-ghost tracking-label uppercase hover:text-accent transition-colors duration-[80ms] ease-linear"
      >
        &larr; ALL PROJECTS
      </Link>

      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 border border-tag-border font-mono text-[10px] tracking-tag uppercase text-tag-text"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-3 font-mono text-[36px] md:text-[48px] font-bold text-primary leading-[1.05] tracking-tight">
          {project.title}
        </h1>

        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-0.5 border font-mono text-[10px] tracking-[0.1em] uppercase ${statusBadgeMap[project.status]}`}
          >
            {statusLabelMap[project.status]}
          </span>
          <span className="text-ghost">·</span>
          <span className="font-mono text-[11px] text-ghost tracking-tag">
            {project.year}
          </span>
        </div>
      </div>

      <div className="mb-8 border-t border-border" />

      <ProjectActionButtons
        liveUrl={project.liveUrl}
        githubUrl={project.githubUrl}
        projectTitle={project.title}
      />

      <ProjectMetaGrid status={project.status} year={project.year} stack={project.stack} />

      <div className="mb-10 border-t border-border" />

      <section className="mb-16 max-w-[640px]">
        <h2 className="mb-3 font-mono text-[10px] text-ghost tracking-label uppercase">
          OVERVIEW
        </h2>
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: convertMarkdown(project.content) }}
        />

        {project.screenshots?.length ? (
          <div className="mt-10">
            {project.screenshots.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
                width={1280}
                height={720}
                className="my-8 w-full border border-border"
              />
            ))}
          </div>
        ) : null}
      </section>

      {(prev || next) && (
        <section>
          <div className="mb-8 border-t border-border" />
          <div className={`flex items-start ${navJustify}`}>
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group max-w-[48%]">
                <span className="mb-1 block font-mono text-[10px] text-ghost tracking-label uppercase">
                  PREVIOUS PROJECT
                </span>
                <span className="line-clamp-1 font-mono text-[14px] text-primary transition-colors duration-[80ms] ease-linear group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            ) : null}

            {next ? (
              <Link href={`/projects/${next.slug}`} className="group max-w-[48%] text-right">
                <span className="mb-1 block font-mono text-[10px] text-ghost tracking-label uppercase">
                  NEXT PROJECT
                </span>
                <span className="line-clamp-1 font-mono text-[14px] text-primary transition-colors duration-[80ms] ease-linear group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
