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
import type { BlogMeta } from "@/types/blog";
import BlogHoverPreview from "./BlogHoverPreview";

const BlogPreviewContext = createContext<{
  setPreview: (post: BlogMeta | null, x: number, y: number) => void;
} | null>(null);

export function useBlogPreview() {
  const ctx = useContext(BlogPreviewContext);
  if (!ctx) return null;
  return ctx;
}

export function BlogPreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<{
    post: BlogMeta | null;
    x: number;
    y: number;
  }>({ post: null, x: 0, y: 0 });
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
    setState((s) => (s.post ? { post: null, x: 0, y: 0 } : s));
  }, [pathname]);

  const setPreview = useCallback(
    (post: BlogMeta | null, x: number, y: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (mountedRef.current) setState({ post, x, y });
      });
    },
    []
  );

  return (
    <BlogPreviewContext.Provider value={{ setPreview }}>
      {children}
      <BlogHoverPreview post={state.post} x={state.x} y={state.y} />
    </BlogPreviewContext.Provider>
  );
}
