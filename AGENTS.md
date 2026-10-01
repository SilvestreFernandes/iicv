# BrandForge — regras do projeto

A BrandForge cria sites para clientes. Todo projeto novo começa a partir do template; cada cliente ganha um repositório próprio, criado com "Use this template".

## Como trabalhar aqui

- Para iniciar, retomar ou saber onde parou: leia `projeto/ESTADO.md`. Se não existir, o projeto está na fase 0; leia `.agents/skills/comecar/fases/00-ambiente.md` e siga-o. As fases estão em `.agents/skills/comecar/fases/`.
- Fluxo: **planejamento** (fases 0–2) → **portão** (fase 3, um único "pode construir") → **execução autônoma** (fase 4, construção + revisão sem perguntas; dúvidas em `projeto/DECISOES.md` e resultado em `projeto/RELATORIO.md`) → **refinamento** (fase 5) → **entrega** (fase 6).
- Nenhum código do site antes do "pode construir" (fase 3).
- Commit e push: siga o modo de versionamento em `projeto/ESTADO.md`; push exige autorização do controle de permissões.
- Nunca invente dados do negócio. Os dados reais ficam só em `lib/site.ts`.
- Pedido avulso (corrigir bug, trocar texto): atenda e registre no ESTADO se mudar alguma decisão aprovada.
- Skills de referência: `.agents/skills/` (fonte: `.claude/skills/`; sincronize com `npm run skills:sync`).
- No Codex, leia `.agents/skills/comecar/SKILL.md` e a fase atual; use skills locais como referência. Os subagentes de `.claude/agents/` são exclusivos do Claude Code: Codex executa as mesmas tarefas diretamente e não afirma que chamou um subagente. Faça as revisões de mídia e SEO durante a construção; revisor e segurança são leituras sem edição, com relatório de gravidade. Um achado crítico de segurança impede declarar o site pronto.
- Onde uma skill citar comandos, permissões, Remote Control ou subagentes exclusivos do Claude Code, use a alternativa neutra descrita nela; peça decisões em texto direto com opções numeradas.

## Comunicação

Não narre antes de agir. Progresso só nos marcos, em uma linha. Fim de etapa em no máximo 5 linhas. Explique só quando o dev precisa decidir ou quando fugir do plano. Não resuma arquivos; indique o caminho. Reúna perguntas, com opções numeradas.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
