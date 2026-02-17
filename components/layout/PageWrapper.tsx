import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main id="main-content" className="relative z-10 min-h-screen">
      <div className={cn("px-6 md:px-12 lg:px-[300px] pt-32 pb-40", className)}>
        {children}
      </div>
    </main>
  );
}
