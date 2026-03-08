"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/projects" },
  { label: "BLOGS", href: "/blog" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
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
          "pointer-events-auto mb-2 md:mb-4 h-12 md:h-11 px-3 md:px-4 flex items-center justify-between md:justify-start gap-1.5 md:gap-2 border transition-all duration-300 w-full md:w-auto",
          "!rounded-full",
          scrolled
            ? "bg-bg/95 backdrop-blur-xl border-border shadow-lg shadow-black/10"
            : "bg-bg/95 backdrop-blur-xl border-border shadow-md shadow-black/10"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-[12px] md:text-[12px] text-primary tracking-nav font-medium px-1.5 md:px-4 shrink-0"
        >
          R.
        </Link>

        <div className="w-px h-4 bg-border/50 shrink-0" />

        {/* Nav links — always visible */}
        <div className="flex items-center flex-1 md:flex-none justify-around md:justify-start gap-0 md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-[12px] md:text-[11px] tracking-nav uppercase px-2.5 md:px-4 py-1.5 !rounded-full transition-all duration-150",
                isActive(link.href)
                  ? "text-accent bg-accent-muted"
                  : "text-ghost hover:text-primary hover:bg-surface-hover"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="w-px h-4 bg-border/50 shrink-0" />

        {/* Theme toggle */}
        <div className="px-1 md:px-1.5 shrink-0">
          <AnimatedThemeToggler />
        </div>
      </motion.nav>
    </div>
  );
}
