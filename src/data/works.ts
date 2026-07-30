import { Work } from "@/types/project";

// Lista completa de trabalhos usada pela seção FeaturedWorks.tsx (o
// "portfólio de vídeos" original, não usado na home atual — ver comentário
// em FeaturedWorks.tsx). "featured: true" marca os trabalhos exibidos em
// destaque (cards grandes); os demais aparecem numa grade compacta.
export const works: Work[] = [
  {
    id: "demonio-de-maxwell",
    title: "Demônio de Maxwell | Trailer (Curta-metragem)",
    client: "Mokotó Filmes",
    role: "Coordenação de produção",
    year: "2017",
    videoEmbedUrl: "https://player.vimeo.com/video/257190582",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/685054956-e572835ea9678b251c877768e469879d50fa90bd9d70c225a46c02ada72f1f69-d?f=webp&region=us",
    featured: true,
  },
  {
    id: "danki-curacao",
    title: "Danki Curaçao | 2017",
    client: "Curaçao Tourist Board",
    role: "Coordenação de produção",
    year: "2017",
    videoEmbedUrl: "https://player.vimeo.com/video/250306218",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/676369418-ba8f259accf8fc238e56ba3a680b054affa48478c18dbec435b854275cc4904c-d?f=webp&region=us",
    featured: true,
  },
  {
    id: "positivo-dia-das-maes",
    title: "Positivo | Dia das Mães 2018",
    client: "Positivo",
    role: "Produção",
    year: "2018",
    videoEmbedUrl: "https://player.vimeo.com/video/269103048",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/699982234-e5eac9b53495541942ac9c944e6990015fbd692729b42ca322241ce0b151d5eb-d?f=webp&region=us",
  },
  {
    id: "positivo-manifesto-democracia-digital",
    title: "Positivo | Manifesto Democracia Digital",
    client: "Positivo",
    role: "Produção",
    year: "2018",
    videoEmbedUrl: "https://player.vimeo.com/video/269925283",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/700951937-33bcb68d50a85908a2d633da5d2329eed51aca98c0b23bd619fa53583ae861c8-d?f=webp&region=us",
  },
  {
    id: "copag-dia-do-baralho-2017",
    title: "Copag | Dia do Baralho 2017: Truco Trollagem 139",
    client: "Copag",
    role: "Coordenação de produção, produção de locação, produção de evento",
    year: "2017",
    videoEmbedUrl: "https://player.vimeo.com/video/236970065",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/659232972-993325a0519914e04fa2a946fc2a48eafa9a74bc7f1766eb51a6e71c09b46709-d?f=webp&region=us",
  },
  {
    id: "estrella-galicia-00-grafite-sp",
    title: "Estrella Galicia 00 - Grafite em SP",
    client: "Estrella Galicia",
    role: "Produção de set e figurino",
    videoEmbedUrl: "https://player.vimeo.com/video/267311016",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/697802531-f60acc582a5edad0dab9d76a2a4a64e52097cc73376841ea5ce74b7224dfbb29-d?f=webp&region=us",
  },
  {
    id: "copag-dia-do-baralho-2016",
    title: "Copag | Dia do Baralho 2016: A jornada",
    client: "Copag",
    role: "Coordenação de pesquisa, produção de base, ação de vendas",
    year: "2016",
    videoEmbedUrl: "https://player.vimeo.com/video/188699227",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/598781867-f205376e85480694c7ed5d376b3f47eb8fb7d5cad48a832a2de76f2b7b913ace-d?f=webp&region=us",
  },
  {
    id: "rosecler-costa-ironmae-manifesto",
    title: "Rosecler Costa | IronMãe - Manifesto",
    client: "Rosecler Costa",
    role: "Produção de locução, base, assistente de direção",
    videoEmbedUrl: "https://player.vimeo.com/video/249656454",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/675532304-bd2eb0dba7f2b857869259217c40a3a9798b2c65d971160e1cfd0a50aa881801-d?f=webp&region=us",
  },
  {
    id: "sorali-cosmetic-institucional",
    title: "Sorali Cosmetic | Institucional",
    client: "Sorali Cosmetic",
    role: "Produção de casting, produção de set",
    videoEmbedUrl: "https://player.vimeo.com/video/204187777",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/618641659-e299f33ed7b097e75951f7ada794b327f21ed9185c7d4434698f66bab79071a7-d?f=webp&region=us",
  },
  {
    id: "mary-kay-voce-expert-em-fragrancias",
    title: "Mary Kay | Você Expert em Fragrâncias (teaser)",
    client: "Mary Kay",
    role: "Produção de locação, alimentação, base e set",
    videoEmbedUrl: "https://player.vimeo.com/video/188698299",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/598779550-a68ca280215fdb7fddb174be6667e6b10b5a863407a62e6c5a6da24306d06ffb-d?f=webp&region=us",
  },
  {
    id: "copag-dia-do-baralho-2015",
    title: "Copag | Dia do Baralho 2015 - O Rei do Baralho #1",
    client: "Copag",
    role: "Produção",
    year: "2015",
    videoEmbedUrl: "https://player.vimeo.com/video/203465404",
    thumbnailUrl:
      "https://i.vimeocdn.com/video/617769177-84317e00aec5e6d8def5ced4fcc0ce6d9832e1369f1936f4611fa232f021b246-d?f=webp&region=us",
  },
];
