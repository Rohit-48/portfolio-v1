"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "HOME", href: "/", scroll: false },
  { label: "PROJECTS", href: "/projects", scroll: false },
  { label: "BLOGS", href: "/blog", scroll: false },
  { label: "CONTACT", href: "#contact", scroll: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-14 border-b border-border transition-[background-color,backdrop-filter] duration-200",
          scrolled ? "bg-bg/80 backdrop-blur-[12px]" : "bg-bg"
        )}
      >
        <div className="h-full px-6 md:px-12 lg:px-[300px] flex items-center justify-between">
          <Link href="/" className="font-mono text-sm text-primary tracking-nav font-medium">Rohit.builds</Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.scroll ? (
                <a key={link.href} href={link.href} onClick={(e) => handleScrollClick(e, link.href)}
                  className="font-sans text-[13px] tracking-nav uppercase text-ghost hover:text-primary transition-colors duration-[80ms] linear">{link.label}</a>
              ) : (
                <Link key={link.href} href={link.href}
                  className="font-sans text-[13px] tracking-nav uppercase text-ghost hover:text-primary transition-colors duration-[80ms] linear">{link.label}</Link>
              )
            )}
            <div className="w-px h-4 bg-border" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col gap-[5px] p-2" aria-label="Toggle menu" aria-expanded={mobileOpen}>
              <span className={cn("block w-5 h-px bg-primary transition-transform duration-200", mobileOpen && "rotate-45 translate-y-[3px]")} />
              <span className={cn("block w-5 h-px bg-primary transition-opacity duration-200", mobileOpen && "opacity-0")} />
              <span className={cn("block w-5 h-px bg-primary transition-transform duration-200", mobileOpen && "-rotate-45 -translate-y-[3px]")} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-12 md:hidden">
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.3 }}>
                {link.scroll ? (
                  <a href={link.href} onClick={(e) => handleScrollClick(e, link.href)}
                    className="font-mono text-[32px] text-ghost hover:text-primary transition-colors duration-[80ms]">{link.label}</a>
                ) : (
                  <Link href={link.href} onClick={() => setMobileOpen(false)}
                    className="font-mono text-[32px] text-ghost hover:text-primary transition-colors duration-[80ms]">{link.label}</Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
