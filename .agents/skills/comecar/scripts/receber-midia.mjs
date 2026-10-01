#!/usr/bin/env node
// Fase 2/4: recebe mídia gerada (Google Flow) ou enviada pelo cliente sem cópia manual + ffprobe avulso.
// Pega os N arquivos mais recentes de Downloads, numera, copia para projeto/referencias/midia/recebido/,
// lê dimensões/duração e gera uma folha de contato em HTML. Só lê Downloads; só escreve dentro do projeto.
// Uso (na raiz do projeto): node .claude/skills/comecar/scripts/receber-midia.mjs [N]

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { extname, join } from "node:path";
import ffmpegPath from "ffmpeg-static";

const N = Number(process.argv[2]) || 5;
const raiz = process.cwd();
const downloads = join(homedir(), "Downloads");
const destino = join(raiz, "projeto", "referencias", "midia", "recebido");

const EXT_VIDEO = new Set([".mp4", ".mov", ".webm"]);
const EXT_IMAGEM = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

if (!existsSync(downloads)) {
  console.error(`Pasta Downloads não encontrada em ${downloads}.`);
  process.exit(1);
}
if (!ffmpegPath) {
  console.error("ffmpeg-static não tem binário para esta plataforma.");
  process.exit(1);
}

const candidatos = readdirSync(downloads, { withFileTypes: true })
  .filter((d) => d.isFile() && (EXT_VIDEO.has(extname(d.name).toLowerCase()) || EXT_IMAGEM.has(extname(d.name).toLowerCase())))
  .map((d) => ({ nome: d.name, caminho: join(downloads, d.name), mtime: statSync(join(downloads, d.name)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime)
  .slice(0, N);

if (candidatos.length === 0) {
  console.error("Nenhum arquivo de imagem/vídeo recente em Downloads.");
  process.exit(1);
}

mkdirSync(destino, { recursive: true });

// ffmpeg-static só traz o binário ffmpeg (sem ffprobe); "-i" sem saída imprime os metadados no stderr.
function metadados(caminho) {
  const r = spawnSync(ffmpegPath, ["-i", caminho], { encoding: "utf8" });
  const texto = r.stderr ?? "";
  const duracao = /Duration:\s*(\d{2}:\d{2}:\d{2}\.\d{2})/.exec(texto)?.[1] ?? null;
  const dimensoes = /,\s*(\d{2,5})x(\d{2,5})[\s,]/.exec(texto);
  return {
    duracao,
    largura: dimensoes ? Number(dimensoes[1]) : null,
    altura: dimensoes ? Number(dimensoes[2]) : null,
  };
}

function paraSegundos(hhmmss) {
  if (!hhmmss) return null;
  const [h, m, s] = hhmmss.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

function extrairQuadros(caminho, pastaSaida, quantidade = 6) {
  const meta = metadados(caminho);
  const duracaoS = paraSegundos(meta.duracao);
  mkdirSync(pastaSaida, { recursive: true });
  if (!duracaoS) return [];
  const fps = quantidade / duracaoS;
  spawnSync(ffmpegPath, ["-y", "-i", caminho, "-vf", `fps=${fps}`, join(pastaSaida, "quadro-%02d.jpg")], { encoding: "utf8" });
  return readdirSync(pastaSaida).filter((f) => f.endsWith(".jpg"));
}

const linhas = [];
const quadrosHtml = [];

candidatos.forEach((arq, i) => {
  const numero = String(i + 1).padStart(2, "0");
  const ext = extname(arq.nome).toLowerCase();
  const nomeDestino = `${numero}-${arq.nome}`;
  const caminhoDestino = join(destino, nomeDestino);
  copyFileSync(arq.caminho, caminhoDestino);

  const meta = metadados(caminhoDestino);
  const eVideo = EXT_VIDEO.has(ext);
  let quadros = [];
  if (eVideo) {
    const pastaQuadros = join(destino, `${numero}-contato`);
    quadros = extrairQuadros(caminhoDestino, pastaQuadros, 6).map((q) => `${numero}-contato/${q}`);
  }

  const dimensoesTexto = meta.largura ? `${meta.largura}×${meta.altura}` : "?";
  const duracaoTexto = eVideo ? (meta.duracao ?? "?") : "—";
  console.log(`${numero}. ${arq.nome} → ${nomeDestino} · ${dimensoesTexto} · ${duracaoTexto}`);

  linhas.push(`| ${nomeDestino} | {{seção}} | {{recortar/comprimir/otimizar}} | \`public/media/{{caminho}}\` | recebida |`);
  quadrosHtml.push({ nomeDestino, dimensoesTexto, duracaoTexto, eVideo, imagem: eVideo ? (quadros[0] ?? null) : nomeDestino, quadros });
});

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Mídia recebida</title>
<style>body{font-family:system-ui;background:#111;color:#eee;padding:24px}
.item{margin-bottom:32px}img{max-width:220px;margin:4px;border-radius:4px}
h2{font-size:15px;font-weight:600}.meta{color:#999;font-size:13px;margin-bottom:8px}</style></head>
<body><h1>Mídia recebida — folha de contato</h1>
${quadrosHtml
  .map(
    (q) => `<div class="item"><h2>${q.nomeDestino}</h2><div class="meta">${q.dimensoesTexto} · ${q.duracaoTexto}</div>
${q.eVideo ? q.quadros.map((f) => `<img src="${f}">`).join("") : `<img src="${q.imagem}">`}</div>`,
  )
  .join("\n")}
</body></html>`;
writeFileSync(join(destino, "index.html"), html, "utf8");

console.log(`\nFolha de contato: ${join(destino, "index.html")}`);
console.log("\nLinhas prontas para colar em projeto/MIDIA.md (seção \"Mídia do cliente\"):\n");
console.log(linhas.join("\n"));
