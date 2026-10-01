#!/usr/bin/env node
// Fase 0: diagnóstico do ambiente. Só LÊ; não instala, não move e não apaga nada.
// Uso (na raiz do projeto): node .claude/skills/comecar/scripts/checar-ambiente.mjs [--completo]
// Padrão: saída compacta (só o que muda uma decisão) — a maioria das retomadas está tudo ok e não
// precisa de path absoluto de cache/skills globais no contexto do Claude. --completo traz tudo, para
// depurar um problema específico. Funciona igual no Windows e no macOS. Saída em JSON.
const completo = process.argv.includes("--completo");

import { execFileSync, execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join, normalize } from "node:path";

const raiz = normalize(process.cwd());

function rodar(cmd) {
  try {
    return execSync(cmd, { cwd: raiz, stdio: ["ignore", "pipe", "ignore"], encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

// OneDrive: caminhos que contêm OneDrive indicam sincronização ativa, o que causa conflitos com npm e git.
const emOneDrive = /[/\\]OneDrive[/\\]/i.test(raiz);

// PowerShell ExecutionPolicy (Windows): "Restricted" impede rodar scripts npm e mjs.
let executionPolicy = null;
if (platform() === "win32") {
  executionPolicy = rodar("powershell -NonInteractive -Command Get-ExecutionPolicy");
}
const executionPolicyBloqueada =
  executionPolicy !== null && ["restricted", "allsigned"].includes(executionPolicy.trim().toLowerCase());

function pastasCom(dir, arquivo) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, arquivo)))
    .map((d) => d.name);
}

// Node
const versaoNode = process.versions.node;
const [maior, menor] = versaoNode.split(".").map(Number);
const nodeOk = maior > 20 || (maior === 20 && menor >= 9);

// Git e remotes
const versaoGit = rodar("git --version");
const remotes = rodar("git remote -v") ?? "";
const remoteTemplate = /^template\s+(\S+)/m.exec(remotes)?.[1] ?? null;
const remoteOrigin = /^origin\s+(\S+)/m.exec(remotes)?.[1] ?? null;
const usuarioGit = rodar("git config user.name");
// Conta única da empresa: identidade local do repositório e usuário na URL do origin (ver fase 0).
const CONTA_EMPRESA = "brandforgecontato-oss";
const EMAIL_EMPRESA = "brandforge.contato@gmail.com";
const nomeLocal = rodar("git config --local user.name");
const emailLocal = rodar("git config --local user.email");
const contaEmpresa = {
  nomeLocal,
  emailLocal,
  identidadeOk: emailLocal === EMAIL_EMPRESA,
  originComUsuario: !!remoteOrigin && remoteOrigin.startsWith(`https://${CONTA_EMPRESA}@github.com/`),
  templateComUsuario: !!remoteTemplate && remoteTemplate.startsWith(`https://${CONTA_EMPRESA}@github.com/`),
};

// Dependências do projeto
const dependenciasInstaladas = existsSync(join(raiz, "node_modules", "next")) && existsSync(join(raiz, "node_modules", "@playwright", "mcp"));

// Navegador do Playwright (Chromium) no cache padrão de cada sistema
const cachePlaywright =
  process.env.PLAYWRIGHT_BROWSERS_PATH ||
  (platform() === "win32"
    ? join(process.env.LOCALAPPDATA ?? join(homedir(), "AppData", "Local"), "ms-playwright")
    : platform() === "darwin"
      ? join(homedir(), "Library", "Caches", "ms-playwright")
      : join(homedir(), ".cache", "ms-playwright"));
const navegadores = existsSync(cachePlaywright) ? readdirSync(cachePlaywright) : [];
// A revisão exigida muda com a versão do Playwright; na dúvida, "npx playwright install chromium" é idempotente.
const chromiumPresente = navegadores.some((n) => n.startsWith("chromium"));

// Skills globais (pessoais) com o mesmo nome das do projeto: a global TEM PRIORIDADE e esconde a do projeto.
const dirConfig = process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
const dirSkillsGlobais = join(dirConfig, "skills");
const skillsProjeto = pastasCom(join(raiz, ".claude", "skills"), "SKILL.md");
const skillsGlobais = pastasCom(dirSkillsGlobais, "SKILL.md");
const conflitos = skillsGlobais.filter((s) => skillsProjeto.includes(s));
// Skills que já existiram no template e foram removidas (ver ATTRIBUTION.md, "Avaliadas e não incluídas"):
// se sobrarem como skill GLOBAL de alguma máquina antiga, não escondem nada do projeto, mas podem
// disparar no meio do fluxo sem ninguém esperar. Lista fixa: não há mais pasta _arquivo/ para ler.
const SKILLS_REMOVIDAS_DO_TEMPLATE = [
  "high-end-visual-design",
  "minimalist-ui",
  "theme-factory",
  "full-output-enforcement",
  "brainstorming",
  "test-driven-development",
];
const globaisArquivadas = skillsGlobais.filter((s) => SKILLS_REMOVIDAS_DO_TEMPLATE.includes(s));

// Vercel: CLI não é obrigatória (o fluxo padrão é GitHub + Vercel pelo painel).
const vercelLinkado = existsSync(join(raiz, ".vercel", "project.json")) || existsSync(join(raiz, ".vercel", "repo.json"));

// Estado do projeto
const estadoExiste = existsSync(join(raiz, "projeto", "ESTADO.md"));
const estado = estadoExiste ? readFileSync(join(raiz, "projeto", "ESTADO.md"), "utf8") : "";
const modoVersionamento = /\*\*Versionamento:\*\*\s*modo\s*([123])/i.exec(estado)?.[1] ?? null;

// Saída de cada fase x status registrado no ESTADO: um arquivo entregue com a fase marcada
// como "não iniciada" (ou sem marca) indica que o ESTADO ficou para trás — reescrevê-lo por cima
// apagaria trabalho já feito. Ver PLANO-V3 item 1.
function statusDaFase(numero) {
  const linha = new RegExp(`\\|\\s*${numero}\\s*\\|[^|]*\\|\\s*([^|]*)\\|`).exec(estado);
  return linha ? linha[1].trim().toLowerCase() : "";
}
const SAIDAS_POR_FASE = [
  { fase: 1, arquivo: "projeto/BRIEF.md" },
  { fase: 2, arquivo: "projeto/DIRECAO.md" },
  { fase: 2, arquivo: "projeto/COPY.md" },
  { fase: 2, arquivo: "projeto/MIDIA.md" },
  { fase: 4, arquivo: "projeto/REVISAO.md" },
  { fase: 4, arquivo: "projeto/RELATORIO.md" },
];
const estadoDesatualizado = estadoExiste
  ? SAIDAS_POR_FASE.filter(({ fase, arquivo }) => {
      if (!existsSync(join(raiz, ...arquivo.split("/")))) return false;
      const status = statusDaFase(fase);
      return status === "" || status.includes("não iniciada");
    })
  : [];

// Divergência com o upstream: modos 2/3 atualizam a referência remota antes de comparar.
let upstream = null;
let commitsSemPush = null;
let commitsSemPull = null;
let fetchOk = null;
try {
  upstream = execFileSync("git", ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"], {
    cwd: raiz, stdio: ["ignore", "pipe", "ignore"], encoding: "utf8",
  }).trim();
  if (modoVersionamento === "2" || modoVersionamento === "3") {
    const remote = upstream.split("/")[0];
    try {
      execFileSync("git", ["fetch", "--quiet", remote], { cwd: raiz, stdio: "ignore", timeout: 45000 });
      fetchOk = true;
    } catch {
      fetchOk = false;
    }
  }
  const [ahead, behind] = execFileSync("git", ["rev-list", "--left-right", "--count", `HEAD...${upstream}`], {
    cwd: raiz, stdio: ["ignore", "pipe", "ignore"], encoding: "utf8",
  }).trim().split(/\s+/).map(Number);
  commitsSemPush = ahead;
  commitsSemPull = behind;
} catch {
  // Repositório sem upstream configurado: não há comparação remota possível.
}

// Monta a saída completa uma vez; o modo compacto (padrão) tira só os campos que não mudam nenhuma
// decisão do fase 0 quando está tudo bem (paths absolutos, listas informativas, valores redundantes
// com o booleano equivalente) — continuam calculados, só não entram no JSON que o Claude lê.
const saidaCompleta = {
  sistema: platform(),
  ambiente: { emOneDrive, executionPolicy, executionPolicyBloqueada },
  node: { versao: versaoNode, ok: nodeOk, minimo: "20.9.0" },
  git: { versao: versaoGit, usuario: usuarioGit, origin: remoteOrigin, template: remoteTemplate },
  sincronizacao: { modoVersionamento, upstream, commitsSemPush, commitsSemPull, fetchOk },
  contaEmpresa,
  dependenciasInstaladas,
  playwright: { cache: cachePlaywright, chromiumPresente },
  skills: {
    dirGlobal: dirSkillsGlobais,
    projeto: skillsProjeto,
    conflitosComGlobais: conflitos,
    globaisArquivadasNoTemplate: globaisArquivadas,
    outrasGlobais: skillsGlobais.filter((s) => !conflitos.includes(s) && !globaisArquivadas.includes(s)),
  },
  vercel: { projetoLinkado: vercelLinkado },
  estadoExiste,
  estadoDesatualizado,
};

if (completo) {
  console.log(JSON.stringify(saidaCompleta, null, 2));
} else {
  const saida = {
    sistema: saidaCompleta.sistema,
    ambiente: { emOneDrive, executionPolicyBloqueada },
    node: { ok: nodeOk, minimo: "20.9.0" },
    git: { instalado: !!versaoGit, origin: remoteOrigin, template: remoteTemplate },
    sincronizacao: { modoVersionamento, commitsSemPush, commitsSemPull, fetchOk },
    contaEmpresa: {
      identidadeOk: contaEmpresa.identidadeOk,
      originComUsuario: contaEmpresa.originComUsuario,
      templateComUsuario: contaEmpresa.templateComUsuario,
    },
    dependenciasInstaladas,
    playwrightChromiumPresente: chromiumPresente,
    skillsConflitosComGlobais: conflitos,
    skillsGlobaisArquivadasNoTemplate: globaisArquivadas,
    estadoExiste,
    estadoDesatualizado,
  };
  // Problema fora do booleano simples: só então vale gastar tokens com o path/detalhe.
  if (!nodeOk) saida.node.versao = versaoNode;
  if (executionPolicyBloqueada) saida.ambiente.executionPolicy = executionPolicy;
  if (!contaEmpresa.identidadeOk) saida.contaEmpresa.emailLocal = contaEmpresa.emailLocal;
  if (!chromiumPresente) saida.playwrightCache = cachePlaywright;
  if (conflitos.length || globaisArquivadas.length) saida.skillsDirGlobal = dirSkillsGlobais;
  console.log(JSON.stringify(saida, null, 2));
}
