import { FeaturedVideo } from "@/types/project";

// Vídeos exibidos na seção "Vídeos em Destaque" (FeaturedVideos.tsx).
// "embedUrl" é a URL de embed do player — para YouTube, use o domínio
// youtube-nocookie.com (não grava cookies de rastreamento até o play). O
// VideoLightbox adiciona "autoplay=1" na hora de abrir; o iframe só é
// carregado nesse momento (a página inicial mostra apenas a thumbnail).
// Thumbnails do YouTube: "sddefault.jpg" (640×480 com tarjas pretas, que o
// object-cover corta em 16:9). É a maior que existe para todos os vídeos —
// o "maxresdefault" falta em alguns deles.
// Opcionais, por vídeo: "imageUrl" (frame próprio em alta, em public/) e
// "loopUrl" (MP4 de 3 a 5 s, sem áudio, em public/) — se existirem,
// substituem a thumbnail (ver VideoFrame.tsx). Ex.:
//   imageUrl: "/frames/copag.jpg", loopUrl: "/loops/copag.mp4",
export const featuredVideos: FeaturedVideo[] = [
  {
    id: "einstein-retratos-pandemia",
    title: "Retratos de Uma Pandemia | Trailer",
    badge: "Hospital Albert Einstein",
    embedUrl: "https://www.youtube-nocookie.com/embed/qDrJCRrSQjE",
    thumbnailUrl: "https://img.youtube.com/vi/qDrJCRrSQjE/sddefault.jpg",
  },
  {
    id: "mondial-mixer-turbo-inox",
    title: "Mondial | Facilite sua rotina com o Mixer Turbo Inox",
    badge: "Mondial",
    embedUrl: "https://www.youtube-nocookie.com/embed/uDZPWJv9q5E",
    thumbnailUrl: "https://img.youtube.com/vi/uDZPWJv9q5E/sddefault.jpg",
  },
  {
    id: "copag-dia-do-trabalho",
    title: "Copag | Dia do Trabalho",
    badge: "Copag",
    embedUrl: "https://www.youtube-nocookie.com/embed/fC03EYfRzi8",
    thumbnailUrl: "https://img.youtube.com/vi/fC03EYfRzi8/sddefault.jpg",
  },
];

// Vídeos da seção Bastidores (BehindTheScenes.tsx): o primeiro aparece
// grande no mosaico, os outros dois menores ao lado.
export const behindTheScenesVideos: FeaturedVideo[] = [
  {
    id: "einstein-nossa-historia",
    title: "Nossa história: Hospital Israelita Albert Einstein",
    badge: "Hospital Albert Einstein",
    embedUrl: "https://www.youtube-nocookie.com/embed/rlAmbwA6nfU",
    thumbnailUrl: "https://img.youtube.com/vi/rlAmbwA6nfU/sddefault.jpg",
  },
  {
    id: "cea-curadoria-inclusiva",
    title:
      "Curadoria Inclusiva – Costurando vivências para desenhar novos futuros | Episódio 1",
    badge: "C&A",
    embedUrl: "https://www.youtube-nocookie.com/embed/oV7XwlCkDps",
    thumbnailUrl: "https://img.youtube.com/vi/oV7XwlCkDps/sddefault.jpg",
  },
  {
    id: "anglo-reconhecimento-facial",
    title: "RECONHECIMENTO FACIAL: controle ou segurança? | Caverna do Leão - EP. 36",
    badge: "Anglo Sistema de Ensino",
    embedUrl: "https://www.youtube-nocookie.com/embed/eAvWDtT2G-8",
    thumbnailUrl: "https://img.youtube.com/vi/eAvWDtT2G-8/sddefault.jpg",
  },
];

// Trailer do filme "Demônio de Maxwell", usado na seção AwardsWithTrailer.tsx
// (ao lado da lista de prêmios). Hospedado no Vimeo.
export const trailerVideo: FeaturedVideo = {
  id: "demonio-de-maxwell-trailer",
  title: "Demônio de Maxwell",
  badge: "Trailer",
  embedUrl: "https://player.vimeo.com/video/257190582?dnt=1",
  thumbnailUrl:
    "https://i.vimeocdn.com/video/685054956-e572835ea9678b251c877768e469879d50fa90bd9d70c225a46c02ada72f1f69-d?f=webp&region=us",
};
