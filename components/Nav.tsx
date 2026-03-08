"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME", href: "/", scroll: false },
  { label: "PROJECTS", href: "/projects", scroll: false },
  { label: "BLOGS", href: "/blog", scroll: false },
  { label: "CONTACT", href: "#contact", scroll: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-3 md:px-0">
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        aria-label="Main navigation"
        data-floating-nav
        className={cn(
          "pointer-events-auto mb-2 md:mb-5 h-12 md:h-14 px-3 md:px-6 flex items-center justify-between md:justify-start gap-1.5 md:gap-3 border transition-all duration-300 w-full md:w-auto",
          "!rounded-full",
          scrolled
            ? "bg-bg/95 backdrop-blur-xl border-border shadow-lg shadow-black/10"
            : "bg-bg/95 backdrop-blur-xl border-border shadow-md shadow-black/10"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-[12px] md:text-[13px] text-primary tracking-nav font-medium px-1.5 md:px-4 shrink-0"
        >
          R.
        </Link>

        <div className="w-px h-5 bg-border/50 shrink-0" />

        {/* Nav links — always visible */}
        <div className="flex items-center flex-1 md:flex-none justify-around md:justify-start gap-0 md:gap-1.5">
          {navLinks.map((link) =>
            link.scroll ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="font-mono text-[12px] md:text-[13px] tracking-nav uppercase text-ghost hover:text-primary hover:bg-surface-hover px-2.5 md:px-5 py-1.5 md:py-2 !rounded-full transition-all duration-150"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[12px] md:text-[13px] tracking-nav uppercase text-ghost hover:text-primary hover:bg-surface-hover px-2.5 md:px-5 py-1.5 md:py-2 !rounded-full transition-all duration-150"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="w-px h-5 bg-border/50 shrink-0" />

        {/* Theme toggle */}
        <div className="px-1 md:px-2 shrink-0">
          <AnimatedThemeToggler />
        </div>
      </motion.nav>
    </div>
  );
}
