import type { MetadataRoute } from "next";
import { site, urlDoSite } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlDoSite();
  return site.paginas.map((rota) => ({
    url: `${base}${rota === "/" ? "" : rota}`,
    lastModified: new Date(),
  }));
}
