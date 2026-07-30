import { Brand } from "@/types/project";

// Lista de marcas exibida na seção "Marcas com quem já trabalhei"
// (src/components/sections/Brands.tsx). Os arquivos de logo ficam em
// public/logos/. "logoScale" ajusta o zoom individual de cada logo (alguns
// arquivos têm mais espaço em branco ao redor que outros).
export const brands: Brand[] = [
  { id: "copag", name: "Copag", logoSrc: "/logos/copag.png" },
  { id: "mary-kay", name: "Mary Kay", logoSrc: "/logos/mary-kay.png", logoScale: 1.3 },
  {
    id: "estrella-galicia",
    name: "Estrella Galicia",
    logoSrc: "/logos/estrella-galicia.png",
    logoScale: 1.3,
  },
  { id: "natura", name: "Natura", logoSrc: "/logos/natura.png" },
  {
    id: "hospital-albert-einstein",
    name: "Hospital Albert Einstein",
    logoSrc: "/logos/hospital-albert-einstein.png",
    logoScale: 1.45,
  },
  { id: "santa-helena", name: "Santa Helena", logoSrc: "/logos/santa-helena.png" },
  { id: "galapagos", name: "Galápagos", logoSrc: "/logos/galapagos.svg" },
  {
    id: "sistema-anglo-de-ensino",
    name: "Sistema Anglo de Ensino",
    logoSrc: "/logos/anglo-logo.png",
    logoScale: 1.25,
  },
  { id: "aunt-jackies", name: "Aunt Jackie's", logoSrc: "/logos/aunt-jackies.png" },
  { id: "starbucks", name: "Starbucks", logoSrc: "/logos/starbucks.png" },
  { id: "disney", name: "Disney", logoSrc: "/logos/disney.png" },
  {
    id: "hotel-emiliano",
    name: "Hotel Emiliano",
    logoSrc: "/logos/hotel-emiliano.png",
  },
  {
    id: "oggi-sorvetes",
    name: "Oggi Sorvetes",
    logoSrc: "/logos/oggi-sorvetes.jpg",
    logoScale: 1.3,
  },
  { id: "premier-pet", name: "PremieR Pet", logoSrc: "/logos/premier-pet.png" },
  { id: "bitso", name: "Bitso", logoSrc: "/logos/bitso.png", logoScale: 1.4 },
];
