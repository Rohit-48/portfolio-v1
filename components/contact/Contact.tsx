"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Gitlab,
  MessageCircle,
  Calendar,
  Coffee,
  Code,
  BarChart3,
  Palette,
  Pin,
  GitFork,
  Mail,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SocialLink {
  label: string;
  href: string;
  tag: string;
  icon: LucideIcon;
  brand: string;
}

const socials: SocialLink[] = [
  { label: "GITHUB", href: "https://github.com/Rohit-48", tag: "Open source", icon: Github, brand: "#8B949E" },
  { label: "X", href: "https://x.com/rohitcpp", tag: "Short thoughts", icon: Twitter, brand: "#1DA1F2" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/rohit48", tag: "Career", icon: Linkedin, brand: "#0A66C2" },
  { label: "DISCORD", href: "https://discord.com/users/rohitvince0", tag: "Chat", icon: MessageCircle, brand: "#5865F2" },
  { label: "BOOK A CALL", href: "https://cal.com/rohitvince0", tag: "Schedule", icon: Calendar, brand: "#FF6B4A" },
  { label: "COFFEE", href: "https://buymeacoffee.com/rohit77", tag: "Support", icon: Coffee, brand: "#FFDD00" },
  { label: "LEETCODE", href: "https://leetcode.com/u/rohit-48/", tag: "DSA", icon: Code, brand: "#FFA116" },
  { label: "KAGGLE", href: "https://www.kaggle.com/rohitmandavkar48", tag: "ML", icon: BarChart3, brand: "#20BEFF" },
  { label: "CODEBERG", href: "https://codeberg.org/giyucode", tag: "Open source", icon: GitFork, brand: "#2185D0" },
  { label: "GITLAB", href: "https://gitlab.com/giyucode", tag: "Open source", icon: Gitlab, brand: "#FC6D26" },
  { label: "BEHANCE", href: "https://www.behance.net/rohitmandavkar", tag: "Design", icon: Palette, brand: "#1769FF" },
  { label: "PINTEREST", href: "https://pin.it/6H1ZDBaie", tag: "Inspiration", icon: Pin, brand: "#E60023" },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } },
});

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay, ease } },
});

const slideIn = (delay: number) => ({
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, delay, ease } },
});

const socialCard = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const socialStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.5 } },
};

function SocialCard({ s, variants }: { s: SocialLink; variants: typeof socialCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={variants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-start gap-3 p-4 border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5"
      style={{
        borderColor: hovered ? `${s.brand}66` : "var(--border)",
        backgroundColor: hovered ? `${s.brand}0F` : "transparent",
      }}
    >
      <span
        className="absolute bottom-0 left-0 h-px transition-[width] duration-300 ease-out"
        style={{
          width: hovered ? "100%" : "0%",
          backgroundColor: s.brand,
        }}
      />
      <s.icon
        size={14}
        className="mt-0.5 shrink-0 transition-colors duration-150 ease-out"
        style={{ color: hovered ? s.brand : "var(--dim)" }}
      />
      <span className="flex flex-col min-w-0">
        <span
          className="font-mono text-[11px] tracking-nav uppercase transition-colors duration-150 ease-out truncate"
          style={{ color: hovered ? s.brand : "var(--primary)" }}
        >
          {s.label}
        </span>
        <span className="font-mono text-[9px] text-dim tracking-tag mt-1.5">
          {s.tag}
        </span>
      </span>
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="min-h-[70vh] flex flex-col">
      <div className="border-t border-border" />

      <div className="px-6 md:px-12 lg:px-[300px] pt-28 pb-16 flex flex-col flex-1">
        {/* Availability badge */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2.5 h-8 px-4 border border-accent/60">
            <span className="contact-pulse-dot" />
            <span className="font-mono text-[10px] text-accent tracking-label font-medium">
              AVAILABLE FOR WORK
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={slideIn(0.08)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-mono text-[52px] md:text-[72px] font-bold text-primary leading-[0.95] tracking-tight"
        >
          LET&apos;S BUILD
        </motion.h2>
        <motion.h2
          variants={slideIn(0.16)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-mono text-[52px] md:text-[72px] font-bold text-accent leading-[0.95] tracking-tight mb-10"
        >
          SOMETHING.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeIn(0.26)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-sans text-[15px] text-secondary leading-relaxed max-w-lg mb-14"
        >
          Open to full-time roles, freelance projects, and interesting problems.
          Let&apos;s talk about what we can create together.
        </motion.p>

        {/* Email CTA card */}
        <motion.a
          href="mailto:rohitmandavkar3477@gmail.com"
          variants={fadeUp(0.34)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="group relative block p-8 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5 mb-4"
        >
          <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
          <span className="flex items-center gap-3 mb-3">
            <Mail size={14} className="text-dim" />
            <span className="font-mono text-[10px] text-dim tracking-label uppercase">
              SAY HELLO
            </span>
          </span>
          <span className="flex items-center justify-between">
            <span className="font-mono text-[18px] md:text-[22px] text-primary group-hover:text-accent transition-colors duration-150 ease-out">
              rohitmandavkar3477@gmail.com
            </span>
            <span className="font-mono text-accent text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 ease-out">
              &nearr;
            </span>
          </span>
        </motion.a>

        {/* Phone card */}
        <motion.a
          href="tel:+917058315306"
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="group relative block p-6 border border-border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover hover:-translate-y-0.5 mb-16"
        >
          <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-4">
              <Phone size={13} className="text-dim" />
              <span className="font-mono text-[10px] text-dim tracking-label uppercase">
                PHONE
              </span>
              <span className="font-mono text-[14px] text-primary group-hover:text-accent transition-colors duration-150 ease-out">
                +91 7058315306
              </span>
            </span>
            <span className="font-mono text-accent text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 ease-out">
              &nearr;
            </span>
          </span>
        </motion.a>

        {/* Section label */}
        <motion.span
          variants={fadeIn(0.46)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="block font-mono text-[10px] text-dim tracking-label uppercase mb-6"
        >
          FIND ME ON
        </motion.span>

        {/* Social links grid */}
        <motion.div
          variants={socialStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
        >
          {socials.map((s) => (
            <SocialCard key={s.label} s={s} variants={socialCard} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
