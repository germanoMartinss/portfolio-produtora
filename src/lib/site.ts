// Dados gerais do site, centralizados aqui para trocar em um único lugar.

// Nome da produtora, usado em vários pontos do site (Hero, Header, Footer,
// metadados, imagem de compartilhamento, JSON-LD).
export const PRODUCER_NAME = "Bruna Rodriguez";

// Função e cidades, como na linha de crédito do Hero.
export const PRODUCER_ROLE = "Produtora audiovisual";
export const PRODUCER_LOCATION = "São Paulo · Santos";

// URL pública do site, sem barra no final. Usada em metadados (canonical,
// Open Graph), sitemap.xml, robots.txt e JSON-LD.
// PROVISÓRIA: o domínio ainda não foi comprado. Ao publicar, defina a
// variável de ambiente NEXT_PUBLIC_SITE_URL (ex.: na Vercel) ou troque o
// valor padrão abaixo. O ".example" é um domínio reservado que nunca
// existe, para ficar claro que é um marcador.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dominio-provisorio.example"
).replace(/\/$/, "");

// Título e descrição padrão (aba do navegador, Google, compartilhamento).
export const SITE_TITLE = `${PRODUCER_NAME} | Produtora Audiovisual`;
export const SITE_DESCRIPTION =
  "Produtora audiovisual há 10+ anos, da produção à direção de cena, para Starbucks, Disney e Natura. Dois filmes premiados.";

// Contatos exibidos no Header/Footer e no JSON-LD.
// A CONFIRMAR com a cliente se são os contatos públicos definitivos.
export const CONTACT = {
  email: "brunarodriguez_@hotmail.com",
  instagram: "brurodriguezz",
  phone: "+55 (13) 99116-4282",
};
