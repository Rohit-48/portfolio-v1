"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ProfileImageProps {
  src: string;
  alt: string;
  name: string;
  title: string;
  location?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<string, string> = {
  sm: "w-40 h-40",
  md: "w-56 h-56",
  lg: "w-72 h-72",
};

const sizeValues: Record<string, number> = {
  sm: 160,
  md: 224,
  lg: 288,
};

export default function ProfileImage({ src, alt, name, title, location, size = "md" }: ProfileImageProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex-shrink-0"
    >
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 border border-border overflow-hidden transition-colors duration-[120ms] linear group-hover:border-accent">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover object-[center_top] transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            sizes={`(max-width: 768px) 160px, ${sizeValues[size]}px`}
          />
        </div>

        <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-accent opacity-0 transition-opacity duration-[120ms] linear group-hover:opacity-100" />
        <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-accent opacity-0 transition-opacity duration-[120ms] linear group-hover:opacity-100" />
        <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-[120ms] linear group-hover:opacity-100" />
        <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-[120ms] linear group-hover:opacity-100" />
      </div>

      <div className="mt-4">
        <div className="w-full h-px bg-surface2 mb-3" />
        <p className="font-mono text-[13px] text-primary font-semibold tracking-[0.02em] mb-1">{name}</p>
        <p className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase mb-1">{title}</p>
        {location && <p className="font-mono text-[10px] text-muted tracking-[0.08em] uppercase">{location}</p>}
      </div>
    </motion.div>
  );
}
