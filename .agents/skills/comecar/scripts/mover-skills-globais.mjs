#!/usr/bin/env node
// Fase 0: move skills GLOBAIS (~/.claude/skills) para uma pasta de backup, para que as
// versões do projeto (.claude/skills) passem a valer. Nada é apagado.
//
// Só rode DEPOIS que a pessoa aprovar a lista mostrada pelo checar-ambiente.mjs.
// Uso: node .claude/skills/comecar/scripts/mover-skills-globais.mjs nome1 nome2 ...
// Desfazer: mover as pastas de volta do backup para ~/.claude/skills.

import { cpSync, existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const nomes = process.argv.slice(2);
if (!nomes.length) {
  console.error("Informe os nomes das skills a mover. Nada foi feito.");
  process.exit(1);
}

const dirConfig = process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
const origem = join(dirConfig, "skills");
const carimbo = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
const backup = join(dirConfig, `skills-backup-${carimbo}`);

for (const nome of nomes) {
  if (!/^[a-z0-9-]+$/i.test(nome)) {
    console.error(`Nome inválido, pulado: ${nome}`);
    continue;
  }
  const de = join(origem, nome);
  if (!existsSync(de)) {
    console.log(`= ${nome}: não existe em ${origem}, pulado`);
    continue;
  }
  mkdirSync(backup, { recursive: true });
  const para = join(backup, nome);
  try {
    renameSync(de, para);
  } catch {
    // Em alguns casos (outro disco, OneDrive) renomear falha: copia e só então remove.
    cpSync(de, para, { recursive: true });
    rmSync(de, { recursive: true, force: true });
  }
  console.log(`> ${nome}: movida para ${para}`);
}

console.log(`\nBackup em: ${backup}`);
console.log("Feche e abra o Claude Code (ou abra uma sessão nova) para a lista de skills ser recarregada.");
