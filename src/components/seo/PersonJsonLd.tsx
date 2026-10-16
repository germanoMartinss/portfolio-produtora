import { awards } from "@/data/awards";
import { CONTACT, PRODUCER_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

// Dados estruturados (JSON-LD, schema.org/Person): ajudam Google e IAs a
// entender quem é a pessoa do site — nome, profissão, prêmios, contatos.
// Montado a partir dos dados que já existem no projeto (src/data, lib/site),
// então atualizar um prêmio ali atualiza aqui também.
// Validar em https://validator.schema.org/ depois de publicar.
export default function PersonJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PRODUCER_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/bruna-hero-pb.jpeg`,
    jobTitle: "Produtora audiovisual",
    description: SITE_DESCRIPTION,
    email: `mailto:${CONTACT.email}`,
    sameAs: [`https://www.instagram.com/${CONTACT.instagram}`],
    worksFor: { "@type": "Organization", name: "Mokotó Filmes" },
    knowsAbout: [
      "Produção audiovisual",
      "Coordenação de produção",
      "Produção executiva",
      "Direção de cena",
      "Assistência de direção",
    ],
    award: awards.map(
      (award) => `${award.title} (${award.project}${award.year ? `, ${award.year}` : ""})`,
    ),
  };

  return (
    <script
      type="application/ld+json"
      // Troca "<" por < para nenhum texto conseguir fechar a tag
      // <script> (recomendação da doc do Next contra XSS).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}
