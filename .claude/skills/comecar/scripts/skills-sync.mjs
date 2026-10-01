#!/usr/bin/env node
// Copia .claude/skills → .agents/skills (fonte única em .claude/skills).
// Uso: node .claude/skills/comecar/scripts/skills-sync.mjs [--check]
// --check: só verifica se estão sincronizados; sai com código 1 se não estiverem.

import { cpSync, existsSync, lstatSync, mkdirSync, rmSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const raiz = process.cwd();
const origem = join(raiz, ".claude", "skills");
const destino = join(raiz, ".agents", "skills");
const verificar = process.argv.includes("--check");

if (!existsSync(origem)) {
  console.error("Pasta .claude/skills não encontrada.");
  process.exit(1);
}

const linksOrigem = symlinks(origem);
if (linksOrigem.length) {
  console.error("ERRO: .claude/skills não pode conter links simbólicos:");
  linksOrigem.forEach((f) => console.error("  " + f));
  process.exit(1);
}
if (existsSync(destino) && lstatSync(destino).isSymbolicLink()) {
  console.error("ERRO: .agents/skills é um link simbólico; esperado é uma cópia real.");
  process.exit(1);
}

if (verificar) {
  // Compara recursivamente se destino existe e está igual à origem.
  if (!existsSync(destino)) {
    console.error("ERRO: .agents/skills não existe. Rode: npm run skills:sync");
    process.exit(1);
  }
  const linksDestino = symlinks(destino);
  if (linksDestino.length) {
    console.error("ERRO: .agents/skills contém links simbólicos:");
    linksDestino.forEach((f) => console.error("  " + f));
    process.exit(1);
  }
  const diff = diffDirs(origem, destino);
  if (diff.length > 0) {
    console.error("ERRO: .agents/skills está desatualizado. Rode: npm run skills:sync");
    diff.forEach((f) => console.error("  " + f));
    process.exit(1);
  }
  console.log(".agents/skills está sincronizado com .claude/skills.");
  process.exit(0);
}

// Sincroniza arquivos reais: o destino não pode ser um link para fora da pasta.
if (existsSync(destino)) rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
cpSync(origem, destino, { recursive: true, dereference: true });

const total = contarArquivos(destino);
console.log(`skills:sync concluído — ${total} arquivo(s) copiado(s) para .agents/skills`);

// --- Helpers ---

function diffDirs(a, b, base = "") {
  const diffs = [];
  const arquivosA = listar(a);
  const arquivosB = listar(b);

  for (const nome of arquivosA) {
    const caminhoA = join(a, nome);
    const caminhoB = join(b, nome);
    const rel = base ? base + "/" + nome : nome;

    if (!existsSync(caminhoB)) {
      diffs.push("falta em .agents: " + rel);
      continue;
    }
    const statA = statSync(caminhoA);
    const statB = statSync(caminhoB);
    if (statA.isDirectory() !== statB.isDirectory() || statA.isFile() !== statB.isFile()) {
      diffs.push("tipo diferente: " + rel);
      continue;
    }
    if (statA.isDirectory() && statB.isDirectory()) {
      diffs.push(...diffDirs(caminhoA, caminhoB, rel));
    } else if (statA.isFile() && statB.isFile()) {
      if (readFileSync(caminhoA).compare(readFileSync(caminhoB)) !== 0) {
        diffs.push("conteúdo diferente: " + rel);
      }
    }
  }

  for (const nome of arquivosB) {
    const rel = base ? base + "/" + nome : nome;
    if (!existsSync(join(a, nome))) {
      diffs.push("sobra em .agents: " + rel);
    }
  }

  return diffs;
}

function listar(dir) {
  return existsSync(dir) ? readdirSync(dir) : [];
}

function symlinks(dir, base = "") {
  const links = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? base + "/" + entry.name : entry.name;
    if (entry.isSymbolicLink()) links.push(rel);
    else if (entry.isDirectory()) links.push(...symlinks(join(dir, entry.name), rel));
  }
  return links;
}

function contarArquivos(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) total += contarArquivos(join(dir, entry.name));
    else total++;
  }
  return total;
}
