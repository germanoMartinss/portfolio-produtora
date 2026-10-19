// Tipos usados pelos dados do site (src/data/) e pelos componentes que os
// consomem. Manter os tipos aqui evita duplicar formas de objeto em vários
// arquivos.

// Um prêmio/reconhecimento (src/data/awards.ts), exibido em
// AwardsWithTrailer.tsx.
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
  // Recorte CSS (clip-path) opcional, para esconder partes indesejadas
  // de um arquivo de logo.
  clipPath?: string;
}

// Trecho de um parágrafo da bio (src/data/about.ts): texto corrido ou um
// nome de marca destacado em negrito.
export type BioSegment = string | { strong: string };

// Número de destaque da seção Sobre ("10+ anos de experiência").
export interface Highlight {
  value: number;
  // Sufixo depois do número (ex.: "+").
  suffix?: string;
  label: string;
}

// Um vídeo (src/data/videos.ts), usado pela lista + tela de Trabalhos
// (WorkList.tsx), pelo mosaico de Bastidores (VideoMosaic.tsx) e pelo
// trailer em AwardsWithTrailer (TrailerPlayer.tsx).
export interface FeaturedVideo {
  id: string;
  title: string;
  // Nome do cliente/marca, mostrado acima do título no card (opcional —
  // os vídeos de "Direção de Cena" não usam badge, por exemplo).
  badge?: string;
  // URL de embed do player, sem parâmetros de autoplay (ver VideoLightbox.tsx).
  embedUrl: string;
  // Thumbnail da plataforma (YouTube/Vimeo) — sempre existe.
  thumbnailUrl: string;
  // Opcional: frame próprio em alta (ex.: "/frames/copag.jpg", em
  // public/). Se existir, substitui a thumbnail em todo o site.
  imageUrl?: string;
  // Opcional: trecho curto do vídeo (3 a 5 s, MP4 H.264, SEM áudio, em
  // public/). Toca em loop por cima do frame quando o vídeo está em
  // destaque (tela de Trabalhos, hover no mosaico), nunca com "reduzir
  // movimento".
  loopUrl?: string;
}
