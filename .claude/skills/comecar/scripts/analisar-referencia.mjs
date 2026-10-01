#!/usr/bin/env node
// Fase 2 (pacote criativo): abre uma referência de referencias/sites.md, rola por etapas (alguns sites
// só carregam conteúdo/animação com scroll real, não com salto direto) e salva capturas em
// referencias/analise/<slug>/ na raiz do TEMPLATE — não em projeto/ — para o próximo site reaproveitar
// em vez de reanalisar. Requer `playwright` (instalado como dependência do @playwright/mcp).
// Uso: node .claude/skills/comecar/scripts/analisar-referencia.mjs <url> <slug> [esperaMs] [passos]
//   esperaMs: espera fixa após carregar, para sites com abertura animada (ex.: 12000 para 12s). Padrão 2000.
//   passos: quantos scrolls incrementais até o fim da página. Padrão 6.

import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { chromium } from "playwright";

const [, , url, slug, esperaArg, passosArg] = process.argv;
if (!url || !slug) {
  console.error("Uso: node analisar-referencia.mjs <url> <slug> [esperaMs] [passos]");
  process.exit(1);
}
const espera = Number(esperaArg) || 2000;
const passos = Number(passosArg) || 6;
const saida = resolve(process.cwd(), "referencias", "analise", slug);
await mkdir(saida, { recursive: true });

const browser = await chromium.launch();
try {
  for (const [nome, viewport] of [["1440", { width: 1440, height: 900 }], ["375", { width: 375, height: 812 }]]) {
    const page = await browser.newPage({ viewport });
    try {
      const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => {
        console.error(`Falha ao abrir ${url} em ${nome}: ${e.message}`);
        return null;
      });
      if (resp && !resp.ok()) {
        console.error(`${url} respondeu ${resp.status()} em ${nome} — pode bloquear navegador automatizado; analise manualmente e registre em sites.md.`);
      }
      await page.waitForTimeout(espera);
      await page.screenshot({ path: join(saida, `${nome}-00-abertura.png`) });

      for (let i = 1; i <= passos; i++) {
        await page.evaluate((fracao) => window.scrollTo(0, document.body.scrollHeight * fracao), i / passos);
        await page.waitForTimeout(600);
        await page.screenshot({ path: join(saida, `${nome}-${String(i).padStart(2, "0")}.png`) });
      }
      console.log(`${nome}: ${passos + 1} capturas salvas.`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

console.log(`Capturas em ${saida}`);
console.log(`Depois de descrever a técnica, preencha o campo "Técnica" da entrada em referencias/sites.md.`);
