export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: "live" | "wip" | "archived";
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Project extends ProjectMeta {
  content: string;
}
