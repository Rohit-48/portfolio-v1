"use client";

import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { getFeaturedProjects } from "@/lib/projects";
import { useProjectPreview } from "@/components/projects/ProjectPreviewContext";
import type { ProjectMeta } from "@/types/project";

const projects = getFeaturedProjects().slice(0, 3);

const ease = [0.25, 0.1, 0.25, 1] as const;

function WorkGridCard({
  project,
  index,
  variants,
}: {
  project: ProjectMeta;
  index: number;
  variants: Variants;
}) {
  const { setPreview } = useProjectPreview() ?? {};
  const num = String(index + 1).padStart(3, "0");
  const statusLabel = project.status.toUpperCase();

  return (
    <motion.div variants={variants}>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex items-center justify-between gap-4 px-6 py-5 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5"
        onMouseEnter={(e) => setPreview?.(project, e.clientX, e.clientY)}
        onMouseMove={(e) => setPreview?.(project, e.clientX, e.clientY)}
        onMouseLeave={() => setPreview?.(null, 0, 0)}
      >
        <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />

        {/* Left: number + title + tags */}
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-mono text-[11px] text-accent tracking-label font-medium shrink-0">
            {num}
          </span>
          <h3 className="font-mono text-[16px] md:text-[18px] font-semibold text-primary leading-tight tracking-tighter truncate group-hover:text-accent transition-colors duration-150 ease-out">
            {project.title}
          </h3>
          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] tracking-tag uppercase px-2 py-0.5 border border-tag-border text-tag-text group-hover:border-accent/40 transition-colors duration-150 ease-out"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: status + arrow */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-[10px] tracking-[0.1em] text-dim">
            {statusLabel}
          </span>
          <span className="font-mono text-accent text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 ease-out">
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

const headerVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } },
});

const cardVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};

export default function WorkGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-20">
      <div className="px-8 md:px-16 lg:px-[340px]" ref={ref}>
        {/* Header */}
        <motion.span
          variants={headerVariant(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase mb-3"
        >
          SELECTED WORK
        </motion.span>
        <motion.h2
          variants={headerVariant(0.08)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-mono text-[40px] md:text-[48px] font-bold text-primary leading-[1.0] tracking-tight"
        >
          Projects
        </motion.h2>
        <motion.p
          variants={headerVariant(0.14)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-sans text-[15px] text-secondary mt-4 max-w-md"
        >
          A few things I&apos;ve built recently.
        </motion.p>

        <motion.div
          variants={headerVariant(0.18)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="border-t border-border mt-10 mb-8"
        />

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-3"
        >
          {projects.map((p, i) => (
            <WorkGridCard key={p.slug} project={p} index={i} variants={cardVariant} />
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          variants={headerVariant(0.5)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-[11px] text-accent tracking-label uppercase hover:underline underline-offset-4 transition-colors duration-150"
          >
            VIEW ALL PROJECTS
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-150 ease-out">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
