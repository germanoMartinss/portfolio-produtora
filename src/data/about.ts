import { BioSegment, Highlight } from "@/types/project";

// Textos das seções "Sobre" (Bio.tsx) e "Minha História" (MyStory.tsx).

// Bio da seção Sobre: cada parágrafo é uma lista de trechos; nomes de marca
// vão como { strong } e aparecem em negrito (sem cor — o azul fica para os
// elementos de interface).
export const bio: BioSegment[][] = [
  [
    "Com mais de 10 anos de estrada na produção audiovisual, já passei por praticamente todas as etapas de um set: produção, coordenação e direção de produção, produção executiva e assistência de direção. Esse trânsito entre funções resultou em projetos para marcas como ",
    { strong: "Starbucks" },
    ", ",
    { strong: "Disney" },
    ", ",
    { strong: "Natura" },
    ", ",
    { strong: "Copag" },
    ", ",
    { strong: "Mary Kay" },
    " e ",
    { strong: "Hospital Albert Einstein" },
    ", além de dois filmes autorais premiados internacionalmente.",
  ],
  [
    "Formada em Cinema e Audiovisual, atualmente curso pós-graduação em Produção Audiovisual Multiplataforma.",
  ],
];

// Números de destaque abaixo da bio.
export const highlights: Highlight[] = [
  { value: 10, suffix: "+", label: "anos de experiência" },
  { value: 2, label: "filmes premiados" },
  { value: 20, suffix: "+", label: "marcas atendidas" },
];

// Texto da seção Minha História, em 3 parágrafos (trajetória/funções,
// clientes/orçamentos, filmes autorais premiados).
export const story: string[] = [
  `Produtora audiovisual e de eventos — MKT Virtual/ Mokotó Filmes. Responsável por coordenar todas as produções da empresa, entre suas funções estão produção de base e set, alimentação, objetos, figurino e elenco. Sua principal função é dar vida a todas as ideias, pautas e briefings, cuidando de toda equipe, fornecedores, logística e qualquer item necessário para que o produto audiovisual seja materializado com sucesso entre a pré, a pós e durante a produção.`,
  `É responsável pela elaboração de parte dos orçamentos da casa e de todas as programações de pagamentos. Em alguns vídeos atua como diretora de cena (especialmente os com entrevistas), assistente de direção e produção executiva. Participa das reuniões de criação, briefing e organização, e atua na tratativa direta com clientes como Copag, Mary Kay, Estrella Galicia, Natura, Hospital Albert Einstein, Santa Helena, Galápagos, Sistema Anglo de Ensino, Aunt Jackie's, entre muitas outras.`,
  `Realizou dois filmes autorais premiados: "Os Demônios de Maxwell", em coparceria com o cineasta de Los Angeles Marcos Vaz, e o documentário "Pink Panther", contemplado no 6º FACULT da cidade de Santos (Setembro 2016 / Outubro 2023).`,
];
