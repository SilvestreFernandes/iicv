# Changelog

## Plano V3 concluído (2026-09-29)

### Por quê

Lições do primeiro site real (Paola Marra, fases 0–3): plano completo em `docs/historico/PLANO-V3.md`.

### Adicionado

- `checar-ambiente.mjs` compara o status de cada fase no ESTADO com os arquivos de saída já entregues e alerta divergência; regra de nunca sobrescrever saída de fase (histórico em `projeto/historico/`) e checkpoint por arquivo.
- Pacote de regras único para modo demonstração/pitch (`referencias/modo-demonstracao.md`): aviso fixo, `noindex`, formulário só no navegador, e-mail `example.com`, sem schema de negócio.
- Kit de prompts de vídeo (`referencias/prompts-video.md`) entregue ao fim da fase 1, para gerar no Google Flow enquanto a fase 2 prepara as direções; checklist de mídia gerada por IA na fase 2.
- `scripts/receber-midia.mjs` (copia de Downloads, metadados, folha de contato), `scripts/fotografar-pranchas.mjs` (captura 1440/375 em carregando/estável/rolado) e `scripts/analisar-referencia.mjs` (análise de referência reaproveitável em `referencias/analise/`).
- `servir-pranchas.mjs` passa a servir `/midia/` e gera índice com links A/B/C.
- Faixa de ousadia das três direções conforme a ambição aprovada; checagem de repetição de técnica de assinatura visual.
- Questionário do cliente avisa restrições de nicho regulado antes de coletar preço/avaliação; pergunta sobre imagem real da pessoa e autorização de IA, registrada em BRIEF/ESTADO/MIDIA.
- Modelos `modelos/REVISAO.md` e `modelos/FEEDBACK.md` para padronizar as fases 4 e 6.

### Alterado

- `.gitignore`: `projeto/referencias/midia/` fora do git (só os comprimidos de `public/media/` são versionados).
- `design-moderno.md` (site-moderno-seo): CTA não pode sugerir algo grátis/informal quando não é.
- `checar-ambiente.mjs` roda em modo compacto por padrão (`--completo` para diagnóstico completo); `SKILL.md` ganhou a seção "Economia de tokens".
- `playwright` declarado como devDependency direta (antes só chegava por dependência transitiva do `@playwright/mcp`).

### Removido

- `_arquivo/` (178 KB, skills e arquivos que não eram mais carregados por nada): tabela "por que saiu" migrada para `ATTRIBUTION.md`.

## Plano V2 concluido (2026-09-27)

- Fluxo em sete fases, portao unico, execucao autonoma, refinamento e entrega; diagnostico silencioso e retomada Git.
- Questionario WhatsApp e modo teste/pitch com bloqueio de publicacao ate dados reais.
- Tres direcoes, referencias curadas, plano de midia, hero primeiro e revisao com subagentes Claude.
- Skills copiadas para .agents/skills, fluxo Codex, componentes de logica e documentacao atualizados.
## 2.1.0 — 2026-09-25 · Conta única da empresa

### Por quê

Os dois sócios passam a usar só a conta `brandforgecontato-oss`, no GitHub e na Vercel. O plano Hobby da Vercel não tem colaboradores, e um deploy disparado por commit de outro autor pode ser bloqueado. Com uma conta só, não há PR nem permissão por pessoa para gerenciar.

### Alterado

- Repositório renomeado para `template_sites`; URL no `CLAUDE.md` com o usuário da empresa (`https://brandforgecontato-oss@github.com/brandforgecontato-oss/template_sites.git`), para o Git Credential Manager guardar a credencial da empresa separada da conta pessoal de cada um.
- **Fase 0:** configura, só no repositório do projeto, `user.name` "BrandForge" e `user.email` "brandforge.contato@gmail.com", e coloca o usuário da empresa nas URLs de `origin` e `template`. O diagnóstico (`checar-ambiente.mjs`) passa a conferir isso (`contaEmpresa`).
- **Fase 10:** a entrada do portfólio vai por commit e push direto na `main` do template, em vez de branch + PR. Um arquivo por site evita conflito; se a `main` andou, `pull --rebase` e push.
- README, `docs/EVOLUIR-TEMPLATE.md` e `portfolio/README.md`: sem PR nem acesso por conta; explicam a configuração da conta única.
- Os commits da 2.0.0 foram publicados com o autor BrandForge.

## 2.0.0 — 2026-09-25 · Kit de skills vira template de projeto guiado

O repositório deixa de ser um kit para copiar e instalar e passa a ser um **template de site**: "Use this template" no GitHub, "vamos começar" no Claude Code, e o projeto é conduzido do briefing ao site no ar.

### Por quê

- Instalar skills globalmente por máquina era um passo manual, fácil de esquecer e de desalinhar entre os sócios. Pior: uma skill global com o mesmo nome de uma do projeto **tem prioridade** e esconde a versão atualizada.
- O processo existia em documentos soltos (trilhas, brief, prompt base, checklist), mas dependia de alguém lembrar de seguir. Agora o Claude conduz, com pontos de aprovação.
- Não havia como pausar e retomar (ou passar para o sócio) sem perder o fio.

### Adicionado

- **Orquestrador `/comecar`** (`.claude/skills/comecar/`): 11 fases, uma pergunta por vez, propor → aprovar → registrar, commit local ao fim de cada fase, push só com ok, modelo recomendado por fase (Opus nas criativas, Sonnet na execução).
- **Estado do projeto** em `projeto/ESTADO.md`: fase, decisões, pendências e próximo passo. `/clear`, fechar o VS Code ou trocar de pessoa não perde nada.
- **Scaffold Next.js mínimo**: Next 16.3.6, React 19.2.8, Tailwind v4, ESLint, GSAP/Lenis/Motion instalados sem uso, metadata, sitemap, robots e JSON-LD alimentados por `lib/site.ts`, headers de segurança, rede de `prefers-reduced-motion`. Página inicial em branco.
- **Nada indexado antes do lançamento**: robots, meta robots e `X-Robots-Tag` só liberam com `SITE_INDEXAVEL=true` (fase 9).
- **Playwright MCP no `.mcp.json`**, versão fixa via `node_modules`, mesmo comando no Windows e no macOS, pré-aprovado em `.claude/settings.json`.
- **Fase 0** detecta skills globais que escondem as do projeto e, com ok, faz backup e move.
- **Direção criativa com pranchas visuais descartáveis** fotografadas pelo Playwright (servidor local em Node puro, sem liberar acesso ao disco).
- **Portfólio anti-repetição** em `portfolio/sites/`, lido do remote `template` (na 2.0.0, alimentado por PR; desde a 2.1.0, por push direto).
- **Trilha E destravada** com `referencias/pitch-local.md`.
- **Vocabulário visual** (`referencias/vocabulario-visual.md`): princípios de "parecer caro" e "parecer limpo", sem valores fixos.
- **Referências oficiais** dentro da `stack-web`: 4 skills do GSAP (GreenSock, MIT) e 12 regras de performance da Vercel (MIT).
- `README.md`, `docs/EVOLUIR-TEMPLATE.md` e este changelog.

### Alterado

- Skills movidas de `skills/` para `.claude/skills/` (vão junto com o repositório).
- `frontend-design`: versão atual da Anthropic (processo plano → revisão → construção → autocrítica, lista de clichês de IA).
- `systematic-debugging` e `verification-before-completion`: versões atuais de `obra/superpowers` (nomes válidos, sem links quebrados).
- `web-design-guidelines`: lê as regras de uma cópia local fixada, em vez de baixar instruções da internet a cada uso.
- `stack-web`: tabela única de precedência entre skills; fase 5 remove camadas não usadas; versões conferidas em 25/09/2026.
- `site-moderno-seo`: preenche a base de SEO do template; plano de design vira a fase 3; sem preconnect ao Google Fonts.
- `seguranca-web`: aponta os headers do template; CSP de exemplo sem Google Fonts.
- `TRILHAS`, `CONTEXT-BASE-PROMPT`, `CHECKLIST-ENTREGA` e `BRIEF-TEMPLATE` movidos para `.claude/skills/comecar/` (histórico preservado) e reescritos para o fluxo novo, sem duplicação. O nicho regulado virou referência própria.
- `ATTRIBUTION.md` reescrito com origem, versão, licença e modificações de cada skill.

### Corrigido

- `web-design-guidelines` era atribuída à lotfb86; a origem real é a Vercel (`vercel-labs/agent-skills`).
- `frontend-design` e `theme-factory` (Apache-2.0) estavam sem o `LICENSE.txt` que a licença exige.

### Removido (arquivado em `_arquivo/`, com o motivo)

- Skills `high-end-visual-design`, `minimalist-ui`, `theme-factory`, `full-output-enforcement`, `brainstorming`, `test-driven-development`.
- `install.ps1`, `install.sh` e `mcp.json.template`.

### Avaliado e não incluído

`webapp-testing` (exige Python), `local-business-rebuild` (stack Astro, pipeline externo, baixa arquivos), `deploy-to-vercel` (envia o projeto a endpoint externo), `react-best-practices` completa (só o recorte entrou). Detalhes em `.claude/skills/ATTRIBUTION.md`.

## 1.x — kit de skills

Versões anteriores: 15 skills instaladas globalmente por script, mais documentos de processo para seguir à mão. Ver o histórico do git.
