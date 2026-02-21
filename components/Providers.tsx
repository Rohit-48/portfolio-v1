"use client";

import { ThemeProvider } from "next-themes";
import { ProjectPreviewProvider } from "@/components/projects/ProjectPreviewContext";
import { BlogPreviewProvider } from "@/components/blog/BlogPreviewContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ProjectPreviewProvider>
        <BlogPreviewProvider>{children}</BlogPreviewProvider>
      </ProjectPreviewProvider>
    </ThemeProvider>
  );
}
