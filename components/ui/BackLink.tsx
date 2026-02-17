import Link from "next/link";
import { cn } from "@/lib/utils";

interface BackLinkProps {
  href: string;
  label: string;
  className?: string;
}

export default function BackLink({ href, label, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] text-accent tracking-label uppercase hover:underline underline-offset-4 transition-colors duration-[80ms]",
        className
      )}
    >
      <span aria-hidden="true">&larr;</span>
      {label}
    </Link>
  );
}
