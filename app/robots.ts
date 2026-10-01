import type { MetadataRoute } from "next";
import { siteIndexavel, urlDoSite } from "@/lib/site";

// Rastreadores de IA: decisão consciente registrada na revisão (fase 5) (skill site-moderno-seo).
// Padrão do template: liberados, porque negócio local quer aparecer nas respostas de IA.
const RASTREADORES_IA = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  // Antes do lançamento (SITE_INDEXAVEL diferente de "true"): ninguém indexa.
  if (!siteIndexavel()) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: [{ userAgent: "*", allow: "/" }, ...RASTREADORES_IA.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${urlDoSite()}/sitemap.xml`,
  };
}
