interface ProjectActionButtonsProps {
  liveUrl?: string;
  githubUrl?: string;
  projectTitle: string;
}

export default function ProjectActionButtons({
  liveUrl,
  githubUrl,
  projectTitle,
}: ProjectActionButtonsProps) {
  if (!liveUrl && !githubUrl) return null;

  const hasOnlyGithub = !liveUrl && !!githubUrl;
  const baseButtonClass =
    "h-11 px-6 border text-[12px] tracking-tag uppercase font-mono inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-[background-color,color,border-color] duration-[120ms] ease-linear";

  return (
    <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View live site for ${projectTitle}`}
          className={`${baseButtonClass} w-full sm:w-auto border-accent bg-accent text-white hover:bg-transparent hover:text-accent`}
        >
          View Live Site <span className="ml-2">↗</span>
        </a>
      ) : null}

      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View source code on GitHub for ${projectTitle}`}
          className={`${baseButtonClass} group w-full sm:w-auto ${
            hasOnlyGithub
              ? "border-accent bg-accent text-white hover:bg-transparent hover:text-accent"
              : "border-border bg-transparent text-primary hover:border-accent hover:text-accent"
          }`}
        >
          View on GitHub{" "}
          <span
            className={`ml-2 ${
              hasOnlyGithub
                ? "text-current"
                : "text-ghost transition-colors duration-[120ms] ease-linear group-hover:text-accent"
            }`}
          >
            ↗
          </span>
        </a>
      ) : null}
    </div>
  );
}
