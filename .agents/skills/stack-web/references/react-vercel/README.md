# Regras de performance React/Next (recorte da Vercel)

Recorte de `vercel-labs/agent-skills/skills/react-best-practices` (commit `063bee9`, licença MIT, ver `LICENSE`). Das 70 regras, ficaram só as que importam para site institucional ou landing page. Arquivos sem modificação.

Use na fase 5 (revisão): percorra a lista, procure o padrão errado no código e corrija com o exemplo do arquivo.

| Arquivo | O que checar no site |
|---|---|
| `bundle-dynamic-imports.md` | 3D, mapas, players e carrosséis pesados entram por `next/dynamic` |
| `bundle-defer-third-party.md` | Analytics, pixels e chat carregam depois da hidratação |
| `bundle-barrel-imports.md` | Ícones e utilitários importados direto, não do arquivo-índice |
| `bundle-conditional.md` | Módulo de recurso opcional só carrega quando ativado |
| `server-serialization.md` | Client Component recebe só os dados que usa |
| `server-hoist-static-io.md` | Leitura de arquivo estático (fonte, logo) fora do componente |
| `rendering-hydration-no-flicker.md` | Nada pisca entre o HTML do servidor e a hidratação |
| `rendering-conditional-render.md` | Ternário em vez de `&&` com número |
| `rendering-resource-hints.md` | `preload`/`preconnect` só onde medem diferença |
| `rerender-no-inline-components.md` | Componente não é definido dentro de outro |
| `client-passive-event-listeners.md` | Listener de scroll/toque passivo (e scroll manual continua proibido: use ScrollTrigger) |
| `async-parallel.md` | Buscas independentes em `Promise.all` |

Para o guia completo: github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
