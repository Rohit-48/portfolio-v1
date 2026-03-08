"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techStack = ["REACT", "JAVASCRIPT", "TYPESCRIPT", "RUST", "NIX", "NEXT.JS", "CSS", "TAILWIND", "C", "NODE.JS", "EXPRESS", "HONO.JS", "PYTHON", "FRAMER", "FIGMA", "DJANGO", "C++", "BUN"];

/* Search-friendly labels for Google queries */
const searchTerms: Record<string, string> = {
  "REACT": "ReactJS",
  "JAVASCRIPT": "JavaScript",
  "TYPESCRIPT": "TypeScript",
  "RUST": "Rust programming language",
  "NIX": "NixOS",
  "NEXT.JS": "Next.js",
  "CSS": "CSS",
  "TAILWIND": "Tailwind CSS",
  "C": "C programming language",
  "NODE.JS": "Node.js",
  "EXPRESS": "Express.js",
  "HONO.JS": "Hono.js",
  "PYTHON": "Python",
  "FRAMER": "Framer Motion",
  "FIGMA": "Figma",
  "DJANGO": "Django",
  "C++": "C++ programming language",
  "BUN": "Bun JavaScript runtime",
};

function googleSearchUrl(tech: string): string {
  const query = searchTerms[tech] ?? tech;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const itemV = { hidden: { x: -14, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-10">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <div>
            <motion.span variants={itemV} className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase mb-2">01</motion.span>
            <motion.h2 variants={itemV} className="font-mono text-[28px] md:text-[32px] font-medium text-primary leading-[1.1] tracking-tighter uppercase mb-6">ABOUT</motion.h2>

            <motion.p variants={itemV} className="font-sans text-[14px] text-ghost leading-relaxed">
              Computer Science student and web engineer from Ratnagiri, Maharashtra. I build full-stack applications with modern JavaScript frameworks and backend systems — aiming for clean architecture, scalable design, and great developer experience.
            </motion.p>
            <motion.p variants={itemV} className="font-sans text-[14px] text-ghost leading-relaxed mt-4">
              I work across the stack — React and Next.js on the frontend, Rust, Node.js, and Python on the backend. Currently open to work and focused on web engineering and systems programming.
            </motion.p>

            <motion.div variants={itemV} className="flex flex-wrap gap-1.5 mt-6">
              {techStack.map((t) => (
                <a key={t} href={googleSearchUrl(t)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-5 px-2 border border-border font-mono text-[10px] text-ghost tracking-tag uppercase transition-colors duration-[80ms] linear hover:border-accent hover:text-accent cursor-pointer">{t}</a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
