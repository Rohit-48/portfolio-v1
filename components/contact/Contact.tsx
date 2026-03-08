"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Mail, NotebookPen } from "lucide-react";
import {
  SiGithub,
  SiX,
  SiLinkedin,
  SiDiscord,
  SiCaldotcom,
  SiBuymeacoffee,
  SiLeetcode,
  SiKaggle,
  SiCodeberg,
  SiGitlab,
  SiBehance,
  SiPinterest,
} from "react-icons/si";
import type { IconType } from "react-icons";

/* ━━━ Types ━━━ */
interface SocialLink {
  label: string;
  href: string;
  tag: string;
  icon: IconType | typeof NotebookPen;
  brand: string;
  hoverColor?: string;
}

/* ━━━ P1 — Primary socials (large cards) ━━━ */
const primarySocials: SocialLink[] = [
  { label: "GITHUB", href: "https://github.com/Rohit-48", tag: "Open source", icon: SiGithub, brand: "#8B949E" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/rohit48", tag: "Career", icon: SiLinkedin, brand: "#0A66C2" },
  { label: "X", href: "https://x.com/rohitcpp", tag: "Short thoughts", icon: SiX, brand: "#000000" },
  { label: "NOTES", href: "https://notes.rohitxyz.me", tag: "My notes", icon: NotebookPen, brand: "#10B981" },
  { label: "BOOK A CALL", href: "https://cal.com/rohitvince0", tag: "Schedule", icon: SiCaldotcom, brand: "#FF6B4A" },
];

/* ━━━ P2 — Secondary socials (small icons) ━━━ */
const secondarySocials: SocialLink[] = [
  { label: "Discord", href: "https://discord.com/users/rohitvince0", tag: "Chat", icon: SiDiscord, brand: "#5865F2" },
  { label: "Coffee", href: "https://buymeacoffee.com/rohit77", tag: "Support", icon: SiBuymeacoffee, brand: "#FFDD00" },
  { label: "LeetCode", href: "https://leetcode.com/u/rohit-48/", tag: "DSA", icon: SiLeetcode, brand: "#FFA116" },
  { label: "Kaggle", href: "https://www.kaggle.com/rohitmandavkar48", tag: "ML", icon: SiKaggle, brand: "#20BEFF" },
  { label: "Codeberg", href: "https://codeberg.org/giyucode", tag: "Open source", icon: SiCodeberg, brand: "#2185D0" },
  { label: "GitLab", href: "https://gitlab.com/giyucode", tag: "Open source", icon: SiGitlab, brand: "#FC6D26" },
  { label: "Behance", href: "https://www.behance.net/rohitmandavkar", tag: "Design", icon: SiBehance, brand: "#1769FF" },
  { label: "Pinterest", href: "https://pin.it/6H1ZDBaie", tag: "Inspiration", icon: SiPinterest, brand: "#E60023" },
];

/* ━━━ Animation helpers ━━━ */
const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease } },
});

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, delay, ease } },
});

const slideIn = (delay: number) => ({
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay, ease } },
});

const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
};

const staggerSmall = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.65 } },
};

/* ━━━ P1 Card component ━━━ */
function PrimaryCard({
  s,
  resolvedTheme,
  mounted,
}: {
  s: SocialLink;
  resolvedTheme?: string;
  mounted: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isX = s.label === "X";
  const effectiveHoverColor =
    isX && mounted
      ? resolvedTheme === "dark"
        ? "#FFFFFF"
        : "#000000"
      : isX
        ? "#000000"
        : s.hoverColor ?? s.brand;

  const Icon = s.icon;

  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-3 p-4 border bg-transparent transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5"
      style={{
        borderColor: hovered ? `${effectiveHoverColor}66` : "var(--border)",
        backgroundColor: hovered ? `${effectiveHoverColor}0F` : "transparent",
      }}
    >
      <span
        className="absolute bottom-0 left-0 h-px transition-[width] duration-300 ease-out"
        style={{
          width: hovered ? "100%" : "0%",
          backgroundColor: effectiveHoverColor,
        }}
      />
      <Icon
        size={18}
        className="shrink-0 transition-colors duration-150 ease-out"
        style={{ color: hovered ? effectiveHoverColor : "var(--dim)" }}
      />
      <span className="flex flex-col min-w-0">
        <span
          className="font-mono text-[13px] tracking-nav uppercase transition-colors duration-150 ease-out truncate"
          style={{ color: hovered ? effectiveHoverColor : "var(--primary)" }}
        >
          {s.label}
        </span>
        <span className="font-mono text-[10px] text-dim tracking-tag mt-0.5">
          {s.tag}
        </span>
      </span>
    </motion.a>
  );
}

/* ━━━ P2 small icon link ━━━ */
function SecondaryIcon({ s }: { s: SocialLink }) {
  const [hovered, setHovered] = useState(false);
  const Icon = s.icon;

  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={s.label}
      title={s.label}
      className="flex items-center justify-center w-8 h-8 border transition-[border-color,background-color] duration-150 ease-out"
      style={{
        borderColor: hovered ? `${s.brand}66` : "var(--border)",
        backgroundColor: hovered ? `${s.brand}0F` : "transparent",
      }}
    >
      <Icon
        size={14}
        className="transition-colors duration-150 ease-out"
        style={{ color: hovered ? s.brand : "var(--dim)" }}
      />
    </motion.a>
  );
}

/* ━━━ Main Contact section ━━━ */
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="contact" ref={ref}>
      <div className="max-w-[800px] mx-auto px-6 pt-12 pb-8">
        {/* Availability badge */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 h-7 px-3 border border-accent/60">
            <span className="contact-pulse-dot" />
            <span className="font-mono text-[10px] text-accent tracking-label font-medium">
              AVAILABLE FOR WORK
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={slideIn(0.06)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-mono text-[32px] md:text-[40px] font-bold text-primary leading-[0.95] tracking-tight"
        >
          LET&apos;S BUILD
        </motion.h2>
        <motion.h2
          variants={slideIn(0.12)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-mono text-[32px] md:text-[40px] font-bold text-accent leading-[0.95] tracking-tight mb-6"
        >
          SOMETHING.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeIn(0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-sans text-[14px] text-secondary leading-relaxed max-w-md mb-8"
        >
          Open to full-time roles, freelance projects, and interesting problems.
        </motion.p>

        {/* Email CTA — compact */}
        <motion.a
          href="mailto:rohitmandavkar3477@gmail.com"
          variants={fadeUp(0.28)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="group relative flex items-center justify-between p-4 border border-border bg-transparent transition-[border-color,background-color] duration-200 ease-out hover:border-accent/40 hover:bg-surface-hover mb-6"
        >
          <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
          <span className="flex items-center gap-3">
            <Mail size={14} className="text-dim" />
            <span className="font-mono text-[13px] md:text-[15px] text-primary group-hover:text-accent transition-colors duration-150 ease-out">
              rohitmandavkar3477@gmail.com
            </span>
          </span>
          <span className="font-mono text-accent text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 ease-out">
            &nearr;
          </span>
        </motion.a>

        {/* P1 — Primary social cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8"
        >
          {primarySocials.map((s) => (
            <PrimaryCard key={s.label} s={s} resolvedTheme={resolvedTheme} mounted={mounted} />
          ))}
        </motion.div>

        {/* P2 — Secondary socials (small icons row) */}
        <motion.div
          variants={staggerSmall}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="font-mono text-[10px] text-dim tracking-label uppercase mr-1">
            ALSO ON
          </span>
          {secondarySocials.map((s) => (
            <SecondaryIcon key={s.label} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
