import { site, urlDoSite } from "@/lib/site";

// Dados estruturados do negócio (schema.org). Só é renderizado quando lib/site.ts tem
// pelo menos o nome preenchido, e omite todo campo vazio: nunca publica dado inventado.
export function JsonLdNegocio() {
  const { nome, descricao, negocio } = site;
  if (!nome) return null;

  const dados: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": negocio.tipoSchema,
    name: nome,
    url: urlDoSite(),
  };
  if (descricao) dados.description = descricao;
  if (negocio.telefone) dados.telephone = negocio.telefone;
  if (negocio.email) dados.email = negocio.email;
  if (negocio.horario.length) dados.openingHours = negocio.horario;
  if (negocio.redes.length) dados.sameAs = negocio.redes;
  if (negocio.endereco) {
    const e = negocio.endereco;
    dados.address = {
      "@type": "PostalAddress",
      streetAddress: e.bairro ? `${e.rua}, ${e.bairro}` : e.rua,
      addressLocality: e.cidade,
      addressRegion: e.uf,
      postalCode: e.cep,
      addressCountry: "BR",
    };
  }

  // JSON.stringify não escapa "<": trocar por < impede fechar a tag <script> por engano.
  const json = JSON.stringify(dados).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
