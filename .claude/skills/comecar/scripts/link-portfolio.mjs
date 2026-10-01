#!/usr/bin/env node
// Fase 6, modo 1: gera o link do GitHub que abre o arquivo novo do portfólio já preenchido
// na main do template. O dev só confere e clica em "Commit changes".
// Uso: node .claude/skills/comecar/scripts/link-portfolio.mjs projeto/portfolio-<slug>.md <slug>
// O caminho inteiro vai em "filename" (o GitHub ignora a última pasta da URL quando filename é usado).

import { readFileSync } from "node:fs";

const [arquivo, slug] = process.argv.slice(2);
if (!arquivo || !slug) {
  console.error("uso: link-portfolio.mjs <arquivo da entrada> <slug>");
  process.exit(1);
}

const base = "https://github.com/brandforgecontato-oss/template_sites/new/main";
const nome = `?filename=${encodeURIComponent(`portfolio/sites/${slug}.md`)}`;
const conteudo = readFileSync(arquivo, "utf8");
const completo = `${base}${nome}&value=${encodeURIComponent(conteudo)}`;

// Links muito longos podem ser cortados pelo navegador: aí o conteúdo é colado à mão.
if (completo.length <= 7000) console.log(completo);
else console.log(`${base}${nome}\n(conteúdo longo demais para o link: cole o de ${arquivo})`);
