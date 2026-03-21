"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";

const projects = getFeaturedProjects().slice(0, 3);

const ease = [0.25, 0.1, 0.25, 1] as const;

const headerVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease } },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

export default function WorkGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-10">
      <div className="max-w-[800px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.span
          variants={headerVariant(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase mb-2"
        >
          SELECTED WORK
        </motion.span>
        <motion.h2
          variants={headerVariant(0.06)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-mono text-[28px] md:text-[32px] font-bold text-primary leading-[1.0] tracking-tight"
        >
          Projects
        </motion.h2>
        <motion.p
          variants={headerVariant(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-sans text-[14px] text-secondary mt-3 max-w-md"
        >
          A few things I&apos;ve built recently.
        </motion.p>

        <motion.div
          variants={headerVariant(0.14)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="border-t border-border mt-6 mb-4"
        />

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          variants={headerVariant(0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-6"
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
