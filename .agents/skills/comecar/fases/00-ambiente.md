# Fase 0 — Ambiente

**Objetivo:** máquina pronta, modo de versionamento escolhido e `projeto/ESTADO.md` criado. **Modelo:** Sonnet.

**Silenciosa:** só fale se houver problema. Roda uma vez por projeto e de novo sempre que o projeto mudar de máquina.

## 1. Diagnóstico

```
node .claude/skills/comecar/scripts/checar-ambiente.mjs
```

Tudo ok: não comente. Com problema: diga só uma linha por item, com solução. Peça autorização apenas antes de executar uma ação que altere o ambiente. Sem `node`, o script nem roda: comece pelo item Node. A saída padrão é compacta (só o necessário para decidir); se precisar de um path exato para depurar algo específico (cache do Playwright, pasta de skills globais), rode de novo com `--completo`.

## 2. Soluções

- **Repositório errado** (`git.origin` é o próprio template): site novo começa por "Use this template" no GitHub. Só continue se for teste.
- **ESTADO desatualizado** (`estadoDesatualizado` não vazio): existe arquivo de saída de uma fase marcada como "não iniciada" no ESTADO — alguém entregou e o registro não acompanhou. Não prossiga a fase até corrigir: confira o conteúdo do arquivo, atualize o status da fase no ESTADO e, se for retomar essa fase, siga a regra de nunca sobrescrever (`SKILL.md`, seção Regras).
- **Projeto dentro do OneDrive** (`ambiente.emOneDrive: true`): a sincronização em tempo real do OneDrive interfere com `npm install` e `git`. Mova o repositório para fora do OneDrive (ex.: `C:\Dev\`) e reabra no VS Code.
- **PowerShell bloqueado** (`ambiente.executionPolicyBloqueada: true`): `Restricted` ou `AllSigned` pode impedir scripts do npm; no PowerShell normal, rode `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **Commits locais sem push** (`sincronizacao.commitsSemPush > 0`): diga a quantidade e a ação conforme o modo; no modo 1, sincronize no GitHub Desktop antes de trocar de computador; nos modos 2/3, push só conforme a autorização configurada.
- **Commits remotos sem pull** (`sincronizacao.commitsSemPull > 0`): pare antes de editar; atualize a branch com GitHub Desktop ou `git pull` depois de conferir a divergência.
- **Fetch falhou** (`sincronizacao.fetchOk: false`): a contagem remota pode estar desatualizada; confira conexão/credencial GitHub e tente novamente antes de continuar.
- **Node < 20.9:** Windows `winget install OpenJS.NodeJS.LTS` · macOS `brew install node` (ou o instalador LTS de nodejs.org). Depois, fechar e abrir o VS Code.
- **Git ausente:** Windows git-scm.com · macOS `xcode-select --install`.
- **Conta da empresa** (`identidadeOk`, `originComUsuario` ou `templateComUsuario` = `false`): todo projeto usa só `brandforgecontato-oss` (o plano Hobby da Vercel bloqueia deploy de commit de outro autor). Com ok, só neste repositório, nunca `--global`:
  ```
  git config --local user.name "BrandForge"
  git config --local user.email "brandforge.contato@gmail.com"
  git remote set-url origin https://brandforgecontato-oss@github.com/brandforgecontato-oss/<repositório>.git
  ```
  No primeiro `fetch` ou `push` abre o login do GitHub: entrar com a conta da empresa. Conferir com `git fetch origin`.
- **Dependências** (`dependenciasInstaladas: false`): `npm install`. O aviso `npm warn allow-scripts … unrs-resolver` é inofensivo.
- **Chromium do Playwright:** `npx playwright install chromium` (idempotente; rode sempre).
- **Playwright MCP inativo:** depois de `npm install`, só sobe numa sessão nova (reabrir o Claude Code e dizer "vamos continuar"). Pendente em `/mcp`: aprovar ou confiar no workspace. Teste: abrir `about:blank` e tirar screenshot.
- **Skills globais com o mesmo nome** (`conflitosComGlobais`, `globaisArquivadasNoTemplate`): escondem as do projeto ou disparam fora de hora. Uma pergunta: mover conflitos + arquivadas (recomendado) · só conflitos · não mover. Com ok: `node .claude/skills/comecar/scripts/mover-skills-globais.mjs nome1 nome2` (faz backup em `~/.claude/skills-backup-<data>/`) e reabrir o Claude Code.
- **Remote `template` ausente ou sem usuário:** `git remote add template https://brandforgecontato-oss@github.com/brandforgecontato-oss/template_sites.git` (ou `set-url`) e `git fetch template`. Fetch falhou: credencial salva com a conta errada; remover a de `github.com` no Gerenciador de Credenciais (Windows) ou no Acesso às Chaves (macOS).
- **Vercel:** nada agora; a fase 6 guia a conexão.

## 3. Remote Control (opcional)

Uma linha, só na primeira execução: "Quer acompanhar e responder pelo celular ou navegador? No Claude Code, use `/remote-control` e confirme Enable Remote Control; a sessão local segue rodando no seu computador."

## 4. Primeira execução do projeto

Só se `projeto/ESTADO.md` não existir:

1. Crie `projeto/` e `projeto/referencias/`; copie `modelos/ESTADO.md` para `projeto/ESTADO.md` (negócio "a definir", fase 0 concluída).
2. Pergunte as duas perguntas abaixo numa única mensagem:
   - **Versionamento:**
     1. **Eu versiono pelo GitHub Desktop** (recomendado): o Claude nunca faz commit nem push; no fim de cada etapa avisa "hora de commitar" com resumo e descrição prontos.
     2. **Claude faz commit local**; push só com o meu ok.
     3. **Claude faz commit e push.**
   - **Tipo de projeto:**
     1. **Cliente real** — dados reais, lançamento liberado.
     2. **Teste / pitch** — dados fictícios marcados como fictícios; lançamento bloqueado até o dev confirmar. Aplique o pacote de regras de `referencias/modo-demonstracao.md` (aviso fixo, `noindex`, formulário só no navegador, e-mail `example.com`, sem schema de negócio) desde o primeiro commit.
3. Grave ambas as escolhas no ESTADO ("Versionamento" e "Modo") e siga as regras do `SKILL.md`.

## Fechar

Siga direto para a fase 1, sem mensagem. Só no modo 2 ou 3: commit `fase 0: ambiente conferido`.
