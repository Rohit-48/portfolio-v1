"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay, ease },
});

const slideUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease },
});

const slideLeft = (delay: number) => ({
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay, ease },
});

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center">
      <div className="max-w-[800px] mx-auto px-6 w-full pt-24 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-10">
          {/* Left column */}
          <div className="min-w-0 max-w-xl">

            {/* Top line — year + role */}
            <motion.div {...fade(0.1)} className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-[10px] text-accent tracking-label font-medium uppercase">
                PORTFOLIO — {new Date().getFullYear()}
              </span>
            </motion.div>

            {/* Name — display */}
            <h1 className="mb-4">
              <motion.span
                {...slideLeft(0.18)}
                className="block font-mono text-[48px] md:text-[60px] lg:text-[72px] font-bold text-primary leading-[0.9] tracking-tight"
              >
                ROHIT
              </motion.span>
              <motion.span
                {...slideLeft(0.26)}
                className="block font-mono text-[48px] md:text-[60px] lg:text-[72px] font-bold text-primary leading-[0.9] tracking-tight"
              >
                BUILDS<span className="text-accent">.</span>
              </motion.span>
            </h1>

            {/* Role tags */}
            <motion.div {...fade(0.38)} className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[12px] text-dim tracking-nav uppercase">
                WEB ENGINEER
              </span>
              <span className="w-1 h-1 bg-accent" style={{ clipPath: "circle(50%)" }} />
              <span className="font-mono text-[12px] text-dim tracking-nav uppercase">
                CS STUDENT
              </span>
              <span className="w-1 h-1 bg-accent" style={{ clipPath: "circle(50%)" }} />
              <span className="font-mono text-[12px] text-dim tracking-nav uppercase">
                OPEN TO WORK
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              {...slideUp(0.46)}
              className="font-sans text-[14px] md:text-[15px] text-secondary leading-relaxed max-w-md mb-8"
            >
              Full-stack developer focused on web engineering, modern JavaScript
              frameworks, and backend systems. Building clean, scalable products
              with great DX.
            </motion.p>

            {/* CTAs */}
            <motion.div {...slideUp(0.56)} className="flex items-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 h-10 px-5 bg-accent font-mono text-[11px] text-[#F0F0F0] tracking-label uppercase transition-colors duration-150 ease-out hover:bg-accent-hover"
              >
                VIEW WORK
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-150 ease-out">
                  &rarr;
                </span>
              </Link>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 h-10 px-5 border border-border font-mono text-[11px] text-primary tracking-label uppercase transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
              >
                SAY HELLO
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-150 ease-out">
                  &rarr;
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right column — profile card */}
          <motion.aside
            {...fade(0.22)}
            className="mt-4 lg:mt-0 shrink-0"
          >
            <div className="w-64 sm:w-72 lg:w-[280px] lg:h-[360px] border-2 border-white/20 bg-surface overflow-hidden relative group shadow-xl shadow-black/20 hover:border-white/35 transition-[border-color] duration-300">
              <div className="absolute inset-0">
                <Image
                  src="/avatar.png"
                  alt="Rohit portrait"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Matte overlay — soft diffused finish */}
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
              <div className="absolute inset-0 backdrop-saturate-[0.85] backdrop-brightness-[0.95]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              {/* Inner white glow border */}
              <div className="absolute inset-0 border border-white/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-accent" />
                  <span className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase">
                    Portfolio
                  </span>
                </div>
                <h2 className="font-sora text-2xl font-semibold text-white tracking-tight">
                  Rohit
                </h2>
                <p className="font-mono text-[10px] text-white/50 tracking-wide">
                  Web Engineer
                </p>
              </div>
              <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-accent/80 animate-pulse" />
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
