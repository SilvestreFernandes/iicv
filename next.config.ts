import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";
import { siteIndexavel } from "./lib/site";

// IPs desta máquina na rede local: o servidor de desenvolvimento aceita o celular na mesma rede Wi-Fi
// (o Next bloqueia origens que não sejam localhost). Só vale no `next dev`.
const ipsDaRede = Object.values(networkInterfaces())
  .flat()
  .filter((i) => i && i.family === "IPv4" && !i.internal)
  .map((i) => i!.address);

// Headers de segurança base (skill seguranca-web, assets/headers-seguranca.md).
// A CSP completa (script-src etc.) é ajustada na fase 5 conforme o que o site carrega de fato;
// aqui só entram diretivas que não quebram nada.
const headersSeguranca = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ipsDaRede,
  async headers() {
    const headers = siteIndexavel() ? headersSeguranca : [...headersSeguranca, { key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
