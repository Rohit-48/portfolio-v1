import type { Project, ProjectMeta } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "cyberpunk-components-library",
    title: "CYBERPUNK COMPONENTS LIBRARY",
    description: "A library of cyberpunk-themed UI components built with Next.js and TypeScript.",
    longDescription: "A library of cyberpunk components featuring buttons, inputs, selects, checkboxes, and radio buttons — all with a neon-infused aesthetic. Built with Next.js, TypeScript, and Tailwind CSS.",
    tags: ["NEXT.JS", "TYPESCRIPT", "REACT", "TAILWIND"],
    status: "wip",
    year: "2026",
    githubUrl: "https://github.com/Rohit-48/Cyberpunk-Components-Library",
    liveUrl: "https://cyberpunk-components-library.vercel.app/",
    featured: true,
    content: `## What It Is\n\nA collection of cyberpunk-themed UI components for modern web apps. Every component follows a neon aesthetic while remaining functional and accessible.\n\n## Components\n\n- **Cyberpunk Button** — glowing borders, hover pulse effects, multiple variants\n- **Cyberpunk Input** — styled text inputs with neon focus states\n- **Cyberpunk Select** — custom dropdown with themed styling\n- **Cyberpunk Checkbox** — toggle-style with glow effects\n- **Cyberpunk Radio** — radio buttons with neon ring indicators\n\n## Stack\n\nBuilt with Next.js and TypeScript, styled entirely with Tailwind CSS. Designed to drop into any React project with minimal config.`,
  },
  {
    slug: "t-browsee",
    title: "T-BROWSEE",
    description: "A command-line searching tool built with Rust, Actix-web, and Tokio.",
    longDescription: "A CLI tool for searching queries directly from the terminal. Run a command and get answers instantly without leaving your workflow. Built with Rust for speed.",
    tags: ["RUST", "ACTIX-WEB", "TOKIO", "CLI"],
    status: "wip",
    year: "2026",
    githubUrl: "https://github.com/Rohit-48/T-Browsee",
    featured: true,
    content: `## The Problem\n\nContext switching between terminal and browser kills developer flow.\n\n## The Solution\n\nT-Browsee lets you search directly from your terminal. Run a command, get answers, stay in flow.\n\n## Architecture\n\n- **Rust** — startup under 10ms, zero runtime overhead\n- **Clap** — ergonomic argument parsing\n- **Tokio** — non-blocking HTTP requests\n- **Actix-web** — production-grade HTTP client`,
  },
  {
    slug: "cyberdeck",
    title: "CYBERDECK",
    description: "A project and task management web app inspired by the Cyberpunk aesthetic.",
    longDescription: "Task and project management with Cyberpunk-inspired visuals. Features task creation, project organization, and a neon-infused UI built with modern web technologies.",
    tags: ["NEXT.JS", "TYPESCRIPT", "REACT", "SHADCN"],
    status: "live",
    year: "2025",
    githubUrl: "https://github.com/Rohit-48/CYBERDECK",
    liveUrl: "https://cyberchoom.netlify.app/",
    featured: true,
    content: `## Overview\n\nCYBERDECK is a task management app with a Cyberpunk visual identity.\n\n## Features\n\n- **Task Creation** — create, edit, delete tasks with priority levels\n- **Project Organization** — group tasks into projects with progress tracking\n- **Neon UI** — full cyberpunk design system\n- **Responsive** — works across desktop and mobile\n\n## Stack\n\nNext.js + TypeScript + Tailwind CSS + Shadcn UI. Deployed on Netlify.`,
  },
  {
    slug: "Neurolink",
    title: "Neurolink",
    description: "NeroLink enables peer-to-peer file sharing across devices on the same local network. It provides both a web-based interface accessible via browsers and command-line tools for programmatic file transfers.",
    longDescription: "NeroLink enables peer-to-peer file sharing across devices on the same local network. It provides both a web-based interface accessible via browsers and command-line tools for programmatic file transfers.",
    tags: ["RUST", "ACTIX-WEB", "TOKIO", "CLI", "JAVASCRIPT", "TYPESCRIPT"],
    status: "live",
    year: "2026",
    githubUrl: "https://github.com/Rohit-48/Neurolink",
    featured: true,
    content: `## Overview\n\nNeurolink is a file sharing platform built with Rust, Actix-web, and Tokio.\n\n## Features\n\n- **File Sharing** — share files with other devices on the same local network\n- **Web Interface** — access the platform via a web browser\n- **Command Line** — use the platform via a command line interface\n- **Neon UI** — full cyberpunk design system\n- **Responsive** — works across desktop and mobile\n\n## Stack\n\nRust + Actix-web + Tokio + JavaScript + TypeScript. Deployed on Netlify.`,
  },
  {
    slug: "task-rs",
    title: "TASK.RS",
    description: "A blazingly fast task manager built with Rust backend and React frontend.",
    longDescription: "A todo list application with Rust backend (Actix-web) and React frontend. Features task creation, completion, and deletion with a clean UI.",
    tags: ["RUST", "REACT", "ACTIX-WEB", "TYPESCRIPT"],
    status: "live",
    year: "2025",
    githubUrl: "https://github.com/Rohit-48/Task-M",
    featured: false,
    content: `## Motivation\n\nMost todo apps are slow. TASK.RS uses a Rust backend for zero-overhead data handling paired with a lightweight React frontend.\n\n## Architecture\n\n- **Actix-web** — async HTTP server\n- **TypeScript React** — full type safety frontend\n- **Optimistic updates** — UI updates immediately, syncs async`,
  },
  {
    slug: "yappington",
    title: "YAPPINGTON",
    description: "The ultimate yap log template for techies. Minimalist and monochrome.",
    longDescription: "The ultimate yap log template for techies. Clone, write MDX, deploy. No CMS, no database, no configuration.",
    tags: ["NEXT.JS", "TYPESCRIPT", "MDX", "CSS"],
    status: "live",
    year: "2025",
    githubUrl: "https://github.com/Rohit-48/Yappington",
    featured: false,
    content: `## What It Is\n\nA blog template for developers who want to write without fighting tools. Clone, write MDX, deploy.\n\n## Stack\n\n- **Next.js** — static generation for zero-latency loads\n- **TypeScript** — type safety\n- **MDX** — blog posts with React component support\n- **CSS** — custom styling, no heavy libraries`,
  },
  {
    slug: "yapitte",
    title: "YAPITTE",
    description: "A social media platform built with Django and Python.",
    longDescription: "A social media platform built with Django and Python, featuring user authentication and TailwindCSS styling.",
    tags: ["DJANGO", "PYTHON", "SQL", "TAILWIND"],
    status: "live",
    year: "2025",
    githubUrl: "https://github.com/Rohit-48/Django-Project",
    featured: false,
    content: `## Overview\n\nYapitte is a social media platform built from scratch with Django.\n\n## Features\n\n- **User Authentication** — register, login, logout\n- **Post Creation** — create and publish content\n- **User Profiles** — view profiles and follow users\n- **Feed** — chronological feed from followed users`,
  },
];

export function getAllProjects(): ProjectMeta[] {
  return projects.map(({ content, ...meta }) => meta);
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
