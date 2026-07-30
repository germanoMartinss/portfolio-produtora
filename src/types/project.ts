// Tipos usados pelos dados do site (src/data/) e pelos componentes que os
// consomem. Manter os tipos aqui evita duplicar formas de objeto em vários
// arquivos.

// Um trabalho do "portfólio de vídeos" original (src/data/works.ts),
// consumido por FeaturedWorks.tsx / WorkCard.tsx.
export interface Work {
  id: string;
  title: string;
  client: string;
  role: string;
  year?: string;
  // Só um dos dois costuma ser usado: videoSrc para um link direto,
  // videoEmbedUrl para um link de embed de player (Vimeo/YouTube).
  videoSrc?: string;
  videoEmbedUrl?: string;
  thumbnailUrl: string;
  // Quando true, o trabalho aparece em destaque (card grande) em vez da
  // grade compacta.
  featured?: boolean;
}

// Um prêmio/reconhecimento (src/data/awards.ts), exibido em
// AwardsWithTrailer.tsx e Awards.tsx.
export interface Award {
  id: string;
  title: string;
  project: string;
  year?: string;
}

// Uma marca/cliente (src/data/brands.ts), exibida na grade de logos da
// seção Brands.tsx.
export interface Brand {
  id: string;
  name: string;
  logoSrc: string;
  // Zoom aplicado ao logo individualmente (padrão: 1, sem zoom).
  logoScale?: number;
  // Recorte CSS (clip-path) opcional, usado para esconder partes
  // indesejadas de um arquivo de logo (ver Sistema Anglo de Ensino em
  // src/data/brands.ts).
  clipPath?: string;
}

// Um vídeo em destaque (src/data/videos.ts), usado pelos cards de vídeo
// (VideoCard.tsx) nas seções FeaturedVideos, BehindTheScenes e pelo
// trailer em AwardsWithTrailer.
export interface FeaturedVideo {
  id: string;
  title: string;
  // Nome do cliente/marca, mostrado acima do título no card (opcional —
  // os vídeos de "Direção de Cena" não usam badge, por exemplo).
  badge?: string;
  // URL de embed do player, sem parâmetros de autoplay (ver VideoLightbox.tsx).
  embedUrl: string;
  thumbnailUrl: string;
}
