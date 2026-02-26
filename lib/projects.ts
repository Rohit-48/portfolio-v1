import type { Project, ProjectMeta } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "cyberpunk-components-library",
    title: "CYBERPUNK COMPONENTS LIBRARY",
    description:
      "A library of cyberpunk-themed UI components built with Next.js and TypeScript.",
    tags: ["NEXT.JS", "TYPESCRIPT", "REACT", "TAILWIND"],
    status: "wip",
    year: 2026,
    githubUrl: "https://github.com/Rohit-48/Cyberpunk-Components-Library",
    liveUrl: "https://cyberpunk-components-library.vercel.app/",
    featured: true,
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    content: `## What It Is

A collection of cyberpunk-themed UI components for modern web apps. Every component follows a neon aesthetic while remaining functional and accessible.

## Components

- **Cyberpunk Button** — glowing borders, hover pulse effects, multiple variants
- **Cyberpunk Input** — styled text inputs with neon focus states
- **Cyberpunk Select** — custom dropdown with themed styling
- **Cyberpunk Checkbox** — toggle-style with glow effects
- **Cyberpunk Radio** — radio buttons with neon ring indicators

## Stack

Built with Next.js and TypeScript, styled entirely with Tailwind CSS. Designed to drop into any React project with minimal config.`,
  },
  {
    slug: "t-browsee",
    title: "T-BROWSEE",
    description:
      "A command-line searching tool built with Rust, Actix-web, and Tokio.",
    tags: ["RUST", "ACTIX-WEB", "TOKIO", "CLI"],
    status: "wip",
    year: 2026,
    githubUrl: "https://github.com/Rohit-48/T-Browsee",
    featured: true,
    stack: ["Rust", "Clap", "Tokio", "Actix-web"],
    content: `## The Problem

Context switching between terminal and browser kills developer flow.

## The Solution

T-Browsee lets you search directly from your terminal. Run a command, get answers, stay in flow.

## Architecture

- **Rust** — startup under 10ms, zero runtime overhead
- **Clap** — ergonomic argument parsing
- **Tokio** — non-blocking HTTP requests
- **Actix-web** — production-grade HTTP client`,
  },
  {
    slug: "cyberdeck",
    title: "CYBERDECK",
    description:
      "A project and task management web app inspired by the Cyberpunk aesthetic.",
    tags: ["NEXT.JS", "TYPESCRIPT", "REACT", "SHADCN"],
    status: "live",
    year: 2025,
    githubUrl: "https://github.com/Rohit-48/CYBERDECK",
    liveUrl: "https://cyberchoom.netlify.app/",
    featured: true,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    content: `## Overview

CYBERDECK is a task management app with a Cyberpunk visual identity.

## Features

- **Task Creation** — create, edit, delete tasks with priority levels
- **Project Organization** — group tasks into projects with progress tracking
- **Neon UI** — full cyberpunk design system
- **Responsive** — works across desktop and mobile

## Stack

Next.js + TypeScript + Tailwind CSS + Shadcn UI. Deployed on Netlify.`,
  },
  {
    slug: "Neurolink",
    title: "Neurolink",
    description:
      "NeroLink enables peer-to-peer file sharing across devices on the same local network. It provides both a web-based interface accessible via browsers and command-line tools for programmatic file transfers.",
    tags: ["RUST", "ACTIX-WEB", "TOKIO", "CLI", "JAVASCRIPT", "TYPESCRIPT"],
    status: "live",
    year: 2026,
    githubUrl: "https://github.com/Rohit-48/Neurolink",
    featured: true,
    stack: ["Rust", "Actix-web", "Tokio", "JavaScript", "TypeScript"],
    content: `## Overview

Neurolink is a file sharing platform built with Rust, Actix-web, and Tokio.

## Features

- **File Sharing** — share files with other devices on the same local network
- **Web Interface** — access the platform via a web browser
- **Command Line** — use the platform via a command line interface
- **Neon UI** — full cyberpunk design system
- **Responsive** — works across desktop and mobile

## Stack

Rust + Actix-web + Tokio + JavaScript + TypeScript. Deployed on Netlify.`,
  },
  {
    slug: "task-rs",
    title: "TASK.RS",
    description:
      "A blazingly fast task manager built with Rust backend and React frontend.",
    tags: ["RUST", "REACT", "ACTIX-WEB", "TYPESCRIPT"],
    status: "live",
    year: 2025,
    githubUrl: "https://github.com/Rohit-48/Task-M",
    featured: false,
    stack: ["Rust", "Actix-web", "React", "TypeScript"],
    content: `## Motivation

Most todo apps are slow. TASK.RS uses a Rust backend for zero-overhead data handling paired with a lightweight React frontend.

## Architecture

- **Actix-web** — async HTTP server
- **TypeScript React** — full type safety frontend
- **Optimistic updates** — UI updates immediately, syncs async`,
  },
  {
    slug: "yappington",
    title: "YAPPINGTON",
    description:
      "The ultimate yap log template for techies. Minimalist and monochrome.",
    tags: ["NEXT.JS", "TYPESCRIPT", "MDX", "CSS"],
    status: "live",
    year: 2025,
    githubUrl: "https://github.com/Rohit-48/Yappington",
    featured: false,
    stack: ["Next.js", "TypeScript", "MDX", "CSS"],
    content: `## What It Is

A blog template for developers who want to write without fighting tools. Clone, write MDX, deploy.

## Stack

- **Next.js** — static generation for zero-latency loads
- **TypeScript** — type safety
- **MDX** — blog posts with React component support
- **CSS** — custom styling, no heavy libraries`,
  },
  {
    slug: "yapitte",
    title: "YAPITTE",
    description: "A social media platform built with Django and Python.",
    tags: ["DJANGO", "PYTHON", "SQL", "TAILWIND"],
    status: "live",
    year: 2025,
    githubUrl: "https://github.com/Rohit-48/Django-Project",
    featured: false,
    stack: ["Django", "Python", "SQL", "Tailwind CSS"],
    content: `## Overview

Yapitte is a social media platform built from scratch with Django.

## Features

- **User Authentication** — register, login, logout
- **Post Creation** — create and publish content
- **User Profiles** — view profiles and follow users
- **Feed** — chronological feed from followed users`,
  },
];

export function getAllProjects(): ProjectMeta[] {
  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    description: project.description,
    tags: project.tags,
    status: project.status,
    year: project.year,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    featured: project.featured,
  }));
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
