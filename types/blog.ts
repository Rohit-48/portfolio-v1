export interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  published: boolean;
}

export interface BlogPost extends BlogMeta {
  content: string;
}
