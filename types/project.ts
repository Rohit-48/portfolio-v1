export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "archived";
  year: number;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Project extends ProjectMeta {
  content: string;
  stack: string[];
  screenshots?: string[];
}
