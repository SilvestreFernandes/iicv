#!/usr/bin/env node
// Fase 2 (pacote criativo): fotografa a/b/c em 1440 e 375, incluindo o estado de carregamento
// (screenshot antes da rede ficar ociosa) e o rolado até o fim — screenshot único não mostra scroll
// nem vídeo em loop; por isso o fechamento da fase 2 também manda abrir as pranchas no navegador.
// Requer `servir-pranchas.mjs` rodando em segundo plano (padrão http://localhost:4321).
// Usa o `playwright` instalado como dependência do @playwright/mcp — mais rápido que o MCP quadro a quadro.
// Uso (na raiz do projeto): node .claude/skills/comecar/scripts/fotografar-pranchas.mjs [a b c]

import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { chromium } from "playwright";

const PORTA = Number(process.env.PORTA_PRANCHAS) || 4321;
const pranchas = process.argv.slice(2).length ? process.argv.slice(2) : ["a", "b", "c"];
const saida = resolve(process.cwd(), "projeto", "referencias", "direcoes");
await mkdir(saida, { recursive: true });

const viewports = [
  { nome: "1440", largura: 1440, altura: 900 },
  { nome: "375", largura: 375, altura: 812 },
];

const browser = await chromium.launch();
try {
  for (const prancha of pranchas) {
    const url = `http://localhost:${PORTA}/${prancha}.html`;
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.largura, height: vp.altura } });
      try {
        // Carregando: captura logo após o DOM montar, sem esperar rede ociosa.
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.screenshot({ path: join(saida, `${prancha}-${vp.nome}-carregando.png`) });

        // Estável: com a rede ociosa (vídeos e fontes carregados).
        await page.waitForLoadState("networkidle").catch(() => {});
        await page.screenshot({ path: join(saida, `${prancha}-${vp.nome}.png`) });

        // Rolado até o fim: mostra o que um screenshot do topo não mostra.
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(300);
        await page.screenshot({ path: join(saida, `${prancha}-${vp.nome}-rolado.png`) });

        console.log(`${prancha} @ ${vp.nome}: carregando, estável e rolado salvos.`);
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}

console.log(`Screenshots em ${saida}`);
console.log("Screenshot não mostra scroll nem vídeo em loop: abra as pranchas no navegador antes de fechar a fase 2.");
