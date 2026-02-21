"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [mounted, resolvedTheme]);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !mounted) return;
    const newTheme = !isDark;

    const applyTheme = () => {
      flushSync(() => {
        document.documentElement.classList.toggle("dark", newTheme);
        setTheme(newTheme ? "dark" : "light");
      });
    };

    const doc = document as Document & {
      startViewTransition?: (callback: () => void | Promise<void>) => { ready: Promise<void> };
    };
    if (doc.startViewTransition) {
      const transition = doc.startViewTransition(applyTheme);
      await transition.ready;

      const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } else {
      applyTheme();
    }
  }, [isDark, duration, mounted, setTheme]);

  if (!mounted) {
    return (
      <div
        className={cn("w-10 h-10 flex items-center justify-center border border-border2", className)}
        aria-hidden
      />
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 flex items-center justify-center border border-border2 bg-transparent text-ghost hover:text-primary hover:border-accent transition-colors duration-150",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      {...props}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
