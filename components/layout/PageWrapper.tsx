import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main id="main-content" className="relative z-10 min-h-screen">
      <div className={cn("max-w-[800px] mx-auto px-6 pt-24 pb-16", className)}>
        {children}
      </div>
    </main>
  );
}
