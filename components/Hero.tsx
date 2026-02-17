"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease },
});

const slideUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

const slideLeft = (delay: number) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.55, delay, ease },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center">
      <div className="px-6 md:px-12 lg:px-[300px] w-full pt-28 pb-32">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
          {/* Left column */}
          <div className="min-w-0 max-w-2xl">

            {/* Top line — year + role */}
            <motion.div {...fade(0.1)} className="flex items-center gap-4 mb-10">
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-[10px] text-accent tracking-label font-medium uppercase">
                PORTFOLIO — {new Date().getFullYear()}
              </span>
            </motion.div>

            {/* Name — massive display */}
            <h1 className="mb-6">
              <motion.span
                {...slideLeft(0.18)}
                className="block font-mono text-[64px] md:text-[100px] lg:text-[120px] font-bold text-primary leading-[0.9] tracking-tight"
              >
                ROHIT
              </motion.span>
              <motion.span
                {...slideLeft(0.26)}
                className="block font-mono text-[64px] md:text-[100px] lg:text-[120px] font-bold text-primary leading-[0.9] tracking-tight"
              >
                BUILDS<span className="text-accent">.</span>
              </motion.span>
            </h1>

            {/* Role tags */}
            <motion.div {...fade(0.38)} className="flex items-center gap-3 mb-10">
              <span className="font-mono text-[11px] text-dim tracking-nav uppercase">
                WEB ENGINEER
              </span>
              <span className="w-1 h-1 bg-accent" style={{ clipPath: "circle(50%)" }} />
              <span className="font-mono text-[11px] text-dim tracking-nav uppercase">
                CS STUDENT
              </span>
              <span className="w-1 h-1 bg-accent" style={{ clipPath: "circle(50%)" }} />
              <span className="font-mono text-[11px] text-dim tracking-nav uppercase">
                OPEN TO WORK
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              {...slideUp(0.46)}
              className="font-sans text-[15px] md:text-[16px] text-secondary leading-relaxed max-w-lg mb-12"
            >
              Full-stack developer focused on web engineering, modern JavaScript
              frameworks, and backend systems. Building clean, scalable products
              with great DX.
            </motion.p>

            {/* CTAs */}
            <motion.div {...slideUp(0.56)} className="flex items-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 h-11 px-6 bg-accent font-mono text-[12px] text-[#F0F0F0] tracking-label uppercase transition-colors duration-150 ease-out hover:bg-accent-hover"
              >
                VIEW WORK
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-150 ease-out">
                  &rarr;
                </span>
              </Link>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 h-11 px-6 border border-border font-mono text-[12px] text-primary tracking-label uppercase transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
              >
                SAY HELLO
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-150 ease-out">
                  &rarr;
                </span>
              </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              {...fade(0.8)}
              className="mt-20 flex items-center gap-3"
            >
              <span className="w-px h-8 bg-border" />
              <span className="font-mono text-[9px] text-dim tracking-label uppercase">
                SCROLL
              </span>
            </motion.div>
          </div>

          {/* Right column — profile card */}
          <motion.aside
            {...fade(0.22)}
            className="mt-10 lg:mt-0 shrink-0"
          >
            <div className="w-80 sm:w-96 md:w-[380px] lg:w-[440px] lg:h-[560px] border border-border/60 bg-surface overflow-hidden relative group shadow-2xl shadow-black/20">
              <div className="absolute inset-0">
                <Image
                  src="/avatar.png"
                  alt="Rohit portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 border border-white/5" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-accent" />
                  <span className="font-mono text-[10px] text-accent tracking-[0.25em] uppercase">
                    Portfolio
                  </span>
                </div>
                <h2 className="font-sora text-3xl font-semibold text-white tracking-tight">
                  Rohit
                </h2>
                <p className="font-mono text-xs text-white/50 tracking-wide">
                  Web Engineer
                </p>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent/80 animate-pulse" />
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
