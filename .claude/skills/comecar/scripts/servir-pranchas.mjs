#!/usr/bin/env node
// Fase 2 (pacote criativo): serve projeto/pranchas/ em http://localhost:4321 para o Playwright
// fotografar as pranchas, e projeto/referencias/midia/ (só leitura) em /midia/, para as pranchas
// referenciarem a mídia recebida sem duplicar arquivo. Sem dependências, só em localhost.
// Uso (na raiz do projeto, em segundo plano): node .claude/skills/comecar/scripts/servir-pranchas.mjs
// Encerrar: parar o processo (Ctrl+C ou encerrar a tarefa em segundo plano).

import { createServer } from "node:http";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize, resolve, sep } from "node:path";

const PORTA = Number(process.env.PORTA_PRANCHAS) || 4321;
const raizPranchas = resolve(process.cwd(), "projeto", "pranchas");
const raizMidia = resolve(process.cwd(), "projeto", "referencias", "midia");
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
};

// Índice com links diretos para A/B/C: sem ele o dev perde tempo achando a URL de cada prancha.
await mkdir(raizPranchas, { recursive: true });
const pranchas = (await readdir(raizPranchas).catch(() => [])).filter((f) => /^[abc]\.html$/.test(f));
const indexHtml = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Pranchas</title>
<style>body{font-family:system-ui;background:#111;color:#eee;padding:24px}a{color:#7cf;font-size:18px;display:block;margin:8px 0}</style></head>
<body><h1>Pranchas da fase 2</h1>${pranchas.map((f) => `<a href="/${f}">${f}</a>`).join("")}
${pranchas.length === 0 ? "<p>Nenhuma prancha a.html/b.html/c.html encontrada ainda.</p>" : ""}</body></html>`;
await writeFile(join(raizPranchas, "index.html"), indexHtml, "utf8");

function servirArquivo(raizPermitida) {
  return async (req, res, caminhoRelativo) => {
    const alvo = normalize(join(raizPermitida, caminhoRelativo === "/" ? "index.html" : caminhoRelativo));
    if (alvo !== raizPermitida && !alvo.startsWith(raizPermitida + sep)) {
      res.writeHead(403).end("proibido");
      return;
    }
    try {
      const conteudo = await readFile(alvo);
      res.writeHead(200, { "Content-Type": tipos[extname(alvo)] ?? "application/octet-stream" }).end(conteudo);
    } catch {
      res.writeHead(404).end("não encontrado");
    }
  };
}
const servirPranchas = servirArquivo(raizPranchas);
const servirMidia = servirArquivo(raizMidia);

createServer(async (req, res) => {
  const caminho = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  if (caminho === "/midia" || caminho.startsWith("/midia/")) {
    await servirMidia(req, res, caminho.replace(/^\/midia\/?/, "/"));
    return;
  }
  await servirPranchas(req, res, caminho);
}).listen(PORTA, "127.0.0.1", () => {
  console.log(`Pranchas em http://localhost:${PORTA}/  (índice com links A/B/C; pasta: ${raizPranchas})`);
  for (const f of pranchas) console.log(`  http://localhost:${PORTA}/${f}`);
  console.log(`Mídia de referência em http://localhost:${PORTA}/midia/  (pasta: ${raizMidia}${existsSync(raizMidia) ? "" : " — ainda não existe"})`);
});
