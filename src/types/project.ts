export interface Project {
  id: string;
  title: string;
  description: string;
  producer: string;
  images: string[];
  videoUrl: string;
  year?: string | number;
}
