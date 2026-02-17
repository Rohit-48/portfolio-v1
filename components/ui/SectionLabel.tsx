import { cn } from "@/lib/utils";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <span className={cn("block font-mono text-[11px] text-accent tracking-label font-medium uppercase", className)}>
      {text}
    </span>
  );
}
