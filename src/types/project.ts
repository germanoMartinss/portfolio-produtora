export interface Work {
  id: string;
  title: string;
  client: string;
  role: string;
  year?: string;
  videoSrc?: string;
  videoEmbedUrl?: string;
  thumbnailUrl: string;
  featured?: boolean;
}

export interface Award {
  id: string;
  title: string;
  project: string;
  year?: string;
}

export interface Brand {
  id: string;
  name: string;
  logoSrc: string;
  logoScale?: number;
  clipPath?: string;
}

export interface FeaturedVideo {
  id: string;
  title: string;
  badge?: string;
  embedUrl: string;
  thumbnailUrl: string;
}
