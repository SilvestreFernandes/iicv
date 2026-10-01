// Fonte única dos dados do negócio. Alimenta metadata, JSON-LD, sitemap e robots.
// Preenchido na fase 4 (construção) a partir de projeto/BRIEF.md. Nunca invente dados:
// campo sem informação real fica vazio e o JSON-LD omite o que estiver vazio.

export type Endereco = {
  rua: string; // "Rua Exemplo, 123"
  bairro: string;
  cidade: string;
  uf: string; // "DF"
  cep: string; // "70000-000"
};

export type Negocio = {
  // Subtipo mais preciso de schema.org quando existir: "Dentist", "BarberOrHairSalon", "Attorney"...
  tipoSchema: string;
  telefone: string; // formato internacional: "+55-61-90000-0000"
  whatsapp: string; // só dígitos com DDI: "5561900000000"
  email: string;
  endereco: Endereco | null; // null se o negócio não atende em endereço físico
  horario: string[]; // formato schema.org: ["Mo-Fr 09:00-19:00", "Sa 09:00-14:00"]
  redes: string[]; // URLs completas dos perfis oficiais
  registroProfissional: string; // "CRO-DF 12345", se o nicho exigir
};

export type Site = {
  nome: string;
  descricao: string; // até ~155 caracteres; vira a meta description padrão
  paginas: string[]; // rotas públicas e indexáveis; o sitemap é gerado a partir desta lista
  negocio: Negocio;
};

export const site: Site = {
  nome: "IICV - Instituto de Intervenção Cardiovascular",
  descricao:
    "Excelência em hemodinâmica, eletrofisiologia e cardiologia intervencionista em Brasília.",
  paginas: ["/"],
  negocio: {
    tipoSchema: "MedicalClinic",
    telefone: "+55-61-4040-4824",
    whatsapp: "",
    email: "",
    endereco: {
      rua: "SGAS 613, Bloco C, Lote 2",
      bairro: "Asa Sul",
      cidade: "Brasília",
      uf: "DF",
      cep: "70200-730",
    },
    horario: ["Mo-Fr 08:00-18:00"],
    redes: [],
    registroProfissional: "",
  },
};

// URL canônica do site: variável explícita, depois o domínio de produção da Vercel, depois localhost.
export function urlDoSite(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

// Nada é indexado até o lançamento (fase 8), quando SITE_INDEXAVEL=true é definida no ambiente de
// produção da Vercel. Assim o endereço provisório (projeto.vercel.app) enviado ao cliente na fase 7,
// os previews e os builds locais nunca aparecem no Google antes da hora.
export function siteIndexavel(): boolean {
  return process.env.SITE_INDEXAVEL === "true";
}
