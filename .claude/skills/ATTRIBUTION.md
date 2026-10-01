# Origem das skills

Todas as skills do template vivem nesta pasta (`.claude/skills/`) e chegam junto com o repositório. Algumas foram copiadas (vendorizadas) de repositórios públicos; outras são de autoria própria. Material de terceiros mantém a licença original, e as licenças Apache-2.0 e MIT exigem que o arquivo de licença acompanhe a cópia: por isso cada pasta vendorizada tem o seu `LICENSE`/`LICENSE.txt`.

## Skills ativas

| Pasta | Origem | Caminho original | Versão copiada | Licença | Modificada? |
|---|---|---|---|---|---|
| `frontend-design` | github.com/anthropics/skills | `skills/frontend-design` | `3337550` (2026-09-24) | Apache-2.0 (`LICENSE.txt`) | Não |
| `design-taste-frontend` | github.com/Leonxlnx/taste-skill | `skills/taste-skill` | `c184364` (2026-09-23) | MIT (`LICENSE`) | Não. Conflitos com a stack resolvidos pela tabela de precedência da `stack-web` |
| `web-design-guidelines` | github.com/vercel-labs/agent-skills | `skills/web-design-guidelines` | `063bee9` (2026-08-28) | MIT (`LICENSE`) | Sim: lê as regras de `references/command.md` (cópia fixada de github.com/vercel-labs/web-interface-guidelines, `e3d624b`, 2026-08-17) em vez de baixá-las a cada uso |
| `responsive-design` | github.com/lotfb86/web-design-skills | `02-responsive-design` | `81644c1` (2026-04-14) | Sem arquivo de licença; o README do repositório diz "Use them, adapt them, build on them" | Não |
| `systematic-debugging` | github.com/obra/superpowers | `skills/systematic-debugging` | `8ca22db` (2026-09-25) | MIT (`LICENSE`) | Não (copiados só o `SKILL.md` e os arquivos que ele cita) |
| `verification-before-completion` | github.com/obra/superpowers | `skills/verification-before-completion` | `8ca22db` (2026-09-25) | MIT (`LICENSE`) | Não |
| `comecar` | autoria própria | — | — | — | — |
| `stack-web` | autoria própria | — | — | — | — |
| `site-moderno-seo` | autoria própria | — | — | — | — |
| `seguranca-web` | autoria própria | — | — | — | — |

### Correção de atribuição

Versões anteriores deste arquivo atribuíam `web-design-guidelines` à lotfb86/web-design-skills. O conteúdo é idêntico ao da Vercel (`vercel-labs/agent-skills`), que é a origem real; a lotfb86 apenas o redistribuía. A atribuição foi corrigida.

## Material de terceiros dentro de skills próprias

| Onde | Origem | Licença | Observação |
|---|---|---|---|
| `stack-web/references/gsap-oficial/` | github.com/greensock/gsap-skills (`aed9cfd`, 2026-04-21) | MIT (`LICENSE` na pasta) | 4 das 8 skills oficiais, guardadas como referência (não como skills soltas) para não disputar a decisão de biblioteca com a `stack-web` |
| `stack-web/references/react-vercel/` | github.com/vercel-labs/agent-skills, `skills/react-best-practices` (`063bee9`) | MIT (`LICENSE` na pasta) | Recorte de regras relevantes para sites; o guia completo (70 regras) não foi copiado |
| `comecar/referencias/revisao-playwright.md` | Método inspirado em github.com/anthropics/skills, `skills/webapp-testing` | Apache-2.0 | Texto próprio, adaptado ao Playwright MCP; nenhum script copiado |
| `comecar/referencias/pitch-local.md` | Ideias inspiradas em github.com/lotfb86/web-design-skills, `06-local-business-rebuild` | — | Texto próprio na stack do template (a skill original usa Astro e um pipeline externo) |
| `comecar/SKILL.md`, seção "Economia de tokens" | Ideias adaptadas de github.com/valorisa/Claude-Skills, `skills/token-optimization` | MIT | Texto próprio; só as técnicas aplicáveis ao fluxo de fases deste template (contexto isolado por subagente, não trocar ferramenta no meio da fase, `/compact` nas fases longas) |

## Avaliadas e não incluídas

| Skill | Motivo |
|---|---|
| `webapp-testing` (Anthropic) | Exige Python + `pip install playwright` e executa comandos com `shell=True`. O Playwright MCP do template cobre o uso. |
| `local-business-rebuild` (lotfb86) | Stack Astro, depende de pipeline externo (`prospect-scrape`, Apify, `~/prospect-pipeline`), baixa imagens com `curl`, sem licença formal. |
| `deploy-to-vercel` (Vercel) | O `deploy.sh` envia o projeto compactado para um endpoint externo sem conta. O template publica via GitHub + Vercel. |
| `react-best-practices` completa | 112 KB de regras, a maioria para apps com dados. Só o recorte entrou. |
| `high-end-visual-design` | Receita fixa (card com dupla borda em tudo, botão em pílula, etiqueta acima de todo título, navegação flutuante) — todo site "premium" sairia igual, e mandava que nenhum elemento aparecesse estático, o que esconde o hero. Princípios reaproveitáveis extraídos para `comecar/referencias/vocabulario-visual.md`. Chegou a entrar no template e foi removida depois. |
| `minimalist-ui` | Paleta, fontes e bordas com valores fixos — todo site minimalista sairia com a mesma cara — e mandava animar todo bloco. Princípios extraídos para o mesmo `vocabulario-visual.md`. Chegou a entrar e foi removida. |
| `theme-factory` | Temas prontos de cor e fonte geram repetição entre sites; foi feita para slides e documentos; citava um `theme-showcase.pdf` que nunca veio. Chegou a entrar (com `LICENSE.txt` Apache-2.0) e foi removida. |
| `full-output-enforcement` | No Claude Code o código vai para arquivos, então truncamento não é o problema; "não otimize brevidade" gastava tokens e o protocolo `[PAUSED]` atrapalhava os pontos de aprovação. A regra útil (sem placeholder ou TODO) está no checklist de entrega. Chegou a entrar e foi removida. |
| `brainstorming` | Substituída pelas fases 1 e 3 do orquestrador (`/comecar`), que aplicam o mesmo método (uma pergunta por vez, opções, 2–3 alternativas). A cópia tinha nome inválido e apontava para skills que não existem aqui. Chegou a entrar e foi removida. |
| `test-driven-development` | Site institucional quase não tem lógica testável, e a descrição ("use em qualquer feature") dispararia a cada seção. Para projeto com lógica real, instalar a versão atual de `github.com/obra/superpowers`. Chegou a entrar e foi removida. |
| `install.ps1` / `install.sh` (arquivos, não skill) | Instalavam as skills em `~/.claude/skills/` (global); uma skill global com o mesmo nome tem prioridade sobre a do projeto e esconderia a versão atualizada. Agora as skills vêm dentro do projeto; a fase 0 do `/comecar` detecta conflito com skills globais e propõe mover. |
| `mcp.json.template` (arquivo, não skill) | Substituído pelo `.mcp.json` na raiz, que já vem configurado e funciona igual no Windows e no macOS. |

Essas seis skills e os dois arquivos ficaram guardados em `_arquivo/` por um tempo "para consulta e poder voltar atrás"; como nada ali era carregado pelo Claude Code e o histórico do git já cumpre esse papel sem pesar o checkout, a pasta foi removida — reativar é `git log -- _arquivo` e restaurar a versão antiga. Os antigos `TRILHAS.md`, `BRIEF-TEMPLATE.md`, `CONTEXT-BASE-PROMPT.md` e `CHECKLIST-ENTREGA.md` não estão aqui: foram movidos (com histórico) para `.claude/skills/comecar/referencias/` e `modelos/`.

## Como atualizar uma skill vendorizada

Ver `docs/EVOLUIR-TEMPLATE.md`, seção "Atualizar uma skill de terceiros".
