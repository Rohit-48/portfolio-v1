import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export interface TocHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

export function getHeadingsFromMarkdown(md: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = md.split("\n");
  for (const line of lines) {
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    if (h2) {
      headings.push({ level: 2, text: h2[1].trim(), id: slugify(h2[1]) });
    } else if (h3) {
      headings.push({ level: 3, text: h3[1].trim(), id: slugify(h3[1]) });
    }
  }
  return headings;
}
