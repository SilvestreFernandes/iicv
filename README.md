# Template de sites BrandForge

A BrandForge cria sites para clientes. Este repositório é o ponto de partida de cada projeto criado com **Use this template**. A página inicial fica em branco; o fluxo conduz do ambiente ao lançamento.

## Pré-requisitos

- Node.js 20.9+ e Git.
- Windows: PowerShell e VS Code com Claude Code ou Codex. macOS: VS Code com uma das ferramentas.
- Conta GitHub da empresa (`brandforgecontato-oss`) e conta Vercel quando houver publicação.

## Criar um site

1. No GitHub, use **Use this template** e crie um repositório privado para o cliente.
2. Clone o repositório, abra a pasta no VS Code e rode `npm install`.
3. Inicie Claude Code ou Codex e diga “vamos começar”.
4. Siga as fases. O planejamento termina no portão único “pode construir”; depois a construção e a revisão rodam sem perguntas.

## Fluxo

| Fase | Etapa | Resultado |
|---:|---|---|
| 0 | Ambiente | máquina, modo de versionamento e tipo de projeto |
| 1 | Briefing e nicho | briefing e limites de conteúdo |
| 2 | Pacote criativo | três direções, copy e plano de mídia |
| 3 | Portão | checklist e aprovação “pode construir” |
| 4 | Execução autônoma | hero, site, revisão e relatório final |
| 5 | Refinamento | ajustes pedidos pelo dev |
| 6 | Entrega | preview, feedback, lançamento e portfólio |

## Versionamento

A escolha fica em `projeto/ESTADO.md`.

| Modo | Comportamento |
|---|---|
| 1 · GitHub Desktop | o agente não commita nem envia; entrega resumo e descrição de commit ao fim da etapa |
| 2 · commits locais | o agente commita nos marcos; push depende de autorização |
| 3 · commits e push | commits nos marcos; cada push exige autorização |

## Claude Code e Codex

| Trabalho | Claude Code | Codex |
|---|---|---|
| Planejamento e execução | skill `/comecar`; subagentes Claude disponíveis | segue `.agents/skills/comecar/`; executa as revisões no próprio fluxo |
| Revisão de mídia, SEO, qualidade e segurança | aciona os subagentes definidos em `.claude/agents/` | aplica as mesmas instruções em etapas próprias; revisor e segurança permanecem só leitura |
| Sincronizar skills | `npm run skills:sync` | usa a cópia versionada em `.agents/skills/` |

Claude Code é a ferramenta com subagentes configurados. Codex executa essas responsabilidades diretamente e deve bloquear a conclusão se a revisão de segurança registrar item crítico.

## Problemas comuns

- **PowerShell bloqueia scripts:** no PowerShell normal, rode `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **Projeto dentro do OneDrive:** mova-o para uma pasta local fora da sincronização, como `C:\Dev\`, e reabra no VS Code.
- **`ECONNRESET` no `npm install`:** rode `npm install` novamente; `.npmrc` configura novas tentativas e timeout ampliado.
- **Troca de computador:** sincronize pelo modo escolhido, clone ou atualize o repositório, rode `npm install` e diga “vamos continuar”. A fase 0 verifica o ambiente e divergências do Git.

## Evoluir o template

Veja [`docs/EVOLUIR-TEMPLATE.md`](docs/EVOLUIR-TEMPLATE.md). Os planos V2 e V3 concluídos foram arquivados em [`docs/historico/PLANO-V2.md`](docs/historico/PLANO-V2.md) e [`docs/historico/PLANO-V3.md`](docs/historico/PLANO-V3.md).