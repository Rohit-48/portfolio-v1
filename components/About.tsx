"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techStack = ["REACT", "JAVASCRIPT", "TYPESCRIPT", "RUST", "NIX", "NEXT.JS", "CSS", "TAILWIND", "C", "NODE.JS", "EXPRESS", "HONO.JS", "PYTHON", "FRAMER", "FIGMA", "DJANGO", "C++", "BUN"];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const itemV = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-12">
      <div className="px-8 md:px-16 xl:px-[340px]">
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <div>
            <div>
              <motion.span variants={itemV} className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase mb-2">01</motion.span>
              <motion.h2 variants={itemV} className="font-mono text-[40px] md:text-[48px] font-medium text-primary leading-[1.1] tracking-tighter uppercase mb-10">ABOUT</motion.h2>

              <motion.p variants={itemV} className="font-sans text-[15px] text-ghost leading-relaxed">
                I am a Computer Science student and web engineer from Ratnagiri, Maharashtra. I focus on building full-stack applications with modern JavaScript frameworks and backend systems — always aiming for clean architecture, scalable design, and great developer experience.
              </motion.p>
              <motion.p variants={itemV} className="font-sans text-[15px] text-ghost leading-relaxed mt-6">
                I work across the stack — from React and Next.js on the frontend to Rust, Node.js, and Python on the backend. Whether it is building a CLI tool in Rust, configuring NixOS declaratively, or shipping a full web app, I find the cleanest path from problem to production.
              </motion.p>
              <motion.p variants={itemV} className="font-sans text-[15px] text-ghost leading-relaxed mt-6">
                Currently open to work and focused on web engineering, systems programming, and making developer tooling that removes friction at every layer.
              </motion.p>

              <motion.div variants={itemV} className="flex flex-wrap gap-2 mt-10">
                {techStack.map((t) => (
                  <span key={t} className="inline-flex items-center h-6 px-[10px] border border-border font-mono text-[11px] text-ghost tracking-tag uppercase transition-colors duration-[80ms] linear hover:border-accent">{t}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
