import { Award } from "@/types/project";

// Lista de prêmios exibida na seção "Prêmios e Reconhecimentos"
// (src/components/sections/AwardsWithTrailer.tsx). Para adicionar um novo
// prêmio, basta incluir um novo objeto neste array.
export const awards: Award[] = [
  {
    id: "gold-movie-award",
    title: "The Gold Movie Award – Melhor Filme",
    project: "O Demônio de Maxwell",
    year: "2017",
  },
  {
    id: "los-angeles-film-awards",
    title: "Los Angeles Film Awards – Melhor Filme Indie",
    project: "O Demônio de Maxwell",
    year: "2017",
  },
  {
    id: "dada-saheb-phalke-film-festival",
    title: "Dada Saheb Phalke Film Festival – Melhor curta-metragem",
    project: "O Demônio de Maxwell",
    year: "2017",
  },
  {
    id: "santos-film-festival",
    title: "Santos Film Festival – Melhor Filme Documentário",
    project: "Pink Panther",
    year: "2018",
  },
  {
    id: "guia-do-estudante",
    title: "Reconhecimento Guia do Estudante – canal mais inovador",
    project: "Canal Sistema Anglo de Ensino",
    year: "2020",
  },
];
