export type ProjectItem = {
  name: string;
  description: string;
  summary: string;
  period: string;
  role: string;
  contribution: string;
  tech: string[];
  github?: string;
  notion?: string;
  primaryActionLabel?: string;
  highlights: string[];
  features: Array<{
    title: string;
    items: string[];
  }>;
  problem: string;
  approach: string[];
  collaboration: string;
  learnings: string[];
  galleryTitle?: string;
  galleryImages?: string[];
};
