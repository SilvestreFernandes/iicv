#!/usr/bin/env node
// Roda `node --check` em todo .mjs de .claude/skills/**/scripts/. O eslint ignora .claude/** de
// propósito (não é código do site), então sem isso um erro de sintaxe num script só aparece na
// próxima vez que alguém rodar exatamente aquele script. Uso: node .claude/skills/comecar/scripts/checar-sintaxe.mjs

import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const raiz = process.cwd();
const baseSkills = join(raiz, ".claude", "skills");

function scriptsMjs(dir) {
  const achados = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const caminho = join(dir, entry.name);
    if (entry.isDirectory()) achados.push(...scriptsMjs(caminho));
    else if (entry.isFile() && entry.name.endsWith(".mjs") && dir.split(/[\\/]/).includes("scripts")) {
      achados.push(caminho);
    }
  }
  return achados;
}

const scripts = scriptsMjs(baseSkills);
let falhou = false;

for (const script of scripts) {
  const r = spawnSync(process.execPath, ["--check", script], { encoding: "utf8" });
  if (r.status !== 0) {
    falhou = true;
    console.error(`ERRO de sintaxe em ${script}:`);
    console.error(r.stderr.trim());
  }
}

if (falhou) {
  process.exit(1);
}
console.log(`checar-sintaxe: ${scripts.length} script(s) .mjs ok.`);
