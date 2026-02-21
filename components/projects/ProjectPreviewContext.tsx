"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import type { ProjectMeta } from "@/types/project";
import ProjectHoverPreview from "./ProjectHoverPreview";

interface ProjectPreviewState {
  project: ProjectMeta | null;
  x: number;
  y: number;
}

const ProjectPreviewContext = createContext<{
  setPreview: (project: ProjectMeta | null, x: number, y: number) => void;
} | null>(null);

export function useProjectPreview() {
  const ctx = useContext(ProjectPreviewContext);
  if (!ctx) return null;
  return ctx;
}

export function ProjectPreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<ProjectPreviewState>({
    project: null,
    x: 0,
    y: 0,
  });
  const rafRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    setState((s) => (s.project ? { project: null, x: 0, y: 0 } : s));
  }, [pathname]);

  const setPreview = useCallback(
    (project: ProjectMeta | null, x: number, y: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (mountedRef.current) setState({ project, x, y });
      });
    },
    []
  );

  return (
    <ProjectPreviewContext.Provider value={{ setPreview }}>
      {children}
      <ProjectHoverPreview
        project={state.project}
        x={state.x}
        y={state.y}
      />
    </ProjectPreviewContext.Provider>
  );
}
