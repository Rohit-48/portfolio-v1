import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Tag({ label, active, onClick, className }: TagProps) {
  const Component = onClick ? "button" : "span";
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center h-6 px-[10px] font-mono text-[11px] tracking-tag uppercase transition-colors duration-[80ms] linear border",
        active ? "border-accent text-accent" : "border-border text-ghost hover:border-accent",
        className
      )}
    >
      {label}
    </Component>
  );
}
