"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export function useHighlighting() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll<HTMLElement>("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  return ref;
}
