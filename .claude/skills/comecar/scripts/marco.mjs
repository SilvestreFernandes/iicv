#!/usr/bin/env node
// Marcos de restauração do modo de versionamento 1 (o dev versiona pelo GitHub Desktop).
// Guarda o estado dos arquivos (inclusive os novos, respeitando o .gitignore) sem commit na branch
// e sem mexer no que o dev deixou preparado para commit. Cada marco fica em refs/marcos/<nome>:
// o GitHub Desktop não mostra e o push não envia.
//
// Uso (na raiz do projeto):
//   node .claude/skills/comecar/scripts/marco.mjs criar <nome>   guarda o estado atual
//   node .claude/skills/comecar/scripts/marco.mjs listar         lista os marcos
//   node .claude/skills/comecar/scripts/marco.mjs voltar <nome>  devolve os arquivos ao marco
//   node .claude/skills/comecar/scripts/marco.mjs limpar         apaga todos os marcos (na entrega)
//
// "voltar" cria antes um marco "antes-de-voltar-<data>", então dá para desfazer a volta.

import { execFileSync } from "node:child_process";
import { existsSync, rmSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const git = (args, env) =>
  execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"], // avisos do git (fim de linha) não poluem a saída
    env: env ? { ...process.env, ...env } : process.env,
  }).trim();

const raiz = git(["rev-parse", "--show-toplevel"]);
process.chdir(raiz);

// Árvore com o estado atual da pasta, montada num índice temporário (o índice real fica intacto).
function arvoreAtual() {
  const indice = git(["rev-parse", "--git-path", "index-marco"]);
  const env = { GIT_INDEX_FILE: indice };
  try {
    git(["read-tree", "HEAD"], env);
    git(["add", "-A"], env);
    return git(["write-tree"], env);
  } finally {
    rmSync(indice, { force: true });
  }
}

function nomeLivre(nome) {
  const base = nome.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "marco";
  let final = base;
  for (let n = 2; git(["for-each-ref", `refs/marcos/${final}`]); n++) final = `${base}-${n}`;
  return final;
}

function criar(nome) {
  const final = nomeLivre(nome);
  const commit = git(["commit-tree", arvoreAtual(), "-p", "HEAD", "-m", `marco: ${final}`]);
  git(["update-ref", `refs/marcos/${final}`, commit]);
  console.log(`marco criado: ${final}`);
  return final;
}

function listar() {
  const linhas = git(["for-each-ref", "--sort=creatordate", "--format=%(refname:lstrip=2)  %(creatordate:format:%Y-%m-%d %H:%M)", "refs/marcos"]);
  console.log(linhas || "nenhum marco");
}

function voltar(nome) {
  const alvo = `refs/marcos/${nome}`;
  if (!git(["for-each-ref", alvo])) throw new Error(`marco não encontrado: ${nome} (veja "listar")`);
  const data = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");
  criar(`antes-de-voltar-${data}`);
  const mudancas = git(["diff", "--name-status", "--no-renames", arvoreAtual(), alvo]);
  if (!mudancas) return console.log("nada a mudar: os arquivos já estão como no marco");
  const restaurar = [];
  for (const linha of mudancas.split("\n")) {
    const [status, arquivo] = linha.split("\t");
    if (status === "D") {
      if (existsSync(join(raiz, arquivo))) unlinkSync(join(raiz, arquivo)); // criado depois do marco
    } else restaurar.push(arquivo);
  }
  if (restaurar.length) git(["restore", `--source=${alvo}`, "--worktree", "--", ...restaurar]);
  console.log(`arquivos de volta ao marco ${nome}:\n${mudancas}`);
}

function limpar() {
  const refs = git(["for-each-ref", "--format=%(refname)", "refs/marcos"]);
  if (!refs) return console.log("nenhum marco");
  for (const ref of refs.split("\n")) git(["update-ref", "-d", ref]);
  console.log(`${refs.split("\n").length} marco(s) apagado(s)`);
}

const [acao, nome] = process.argv.slice(2);
try {
  if (acao === "criar" && nome) criar(nome);
  else if (acao === "listar") listar();
  else if (acao === "voltar" && nome) voltar(nome);
  else if (acao === "limpar") limpar();
  else {
    console.error("uso: marco.mjs criar <nome> | listar | voltar <nome> | limpar");
    process.exit(1);
  }
} catch (erro) {
  console.error(erro.message);
  process.exit(1);
}
