---
name: comecar
description: Conduz sites BrandForge do ambiente à entrega. Planejamento com o dev termina no portão “pode construir”; construção e revisão seguem sem perguntas; depois vêm refinamento e entrega. Retoma pelo projeto/ESTADO.md. Use para começar, continuar, retomar, saber onde parou ou ao chamar /comecar.
when_to_use: Início ou retomada de qualquer projeto de site criado a partir do template.
argument-hint: "[fase N]"
---

# Fluxo BrandForge

Leia `projeto/ESTADO.md`; se não existir, inicie na fase 0. Ao retomar, rode `node .claude/skills/comecar/scripts/checar-ambiente.mjs` e informe apenas alertas, uma linha por problema com solução. Com `/comecar fase N`, confira os portões anteriores e não os pule. Avise em uma linha a fase e o próximo passo; avise uma vez se o modelo da sessão divergir do recomendado. Leia apenas o arquivo da fase atual.

## Etapas

| Etapa | Fase | Arquivo | Saída | Modelo |
|---|---:|---|---|---|
| Planejamento | 0 | `fases/00-ambiente.md` | ambiente, modo de versionamento e estado inicial | Sonnet |
| | 1 | `fases/01-briefing.md` | briefing e nicho | Opus |
| | 2 | `fases/02-pacote-criativo.md` | três direções e pacote recomendado com copy e mídia | Opus |
| Portão | 3 | `fases/03-portao.md` | checklist, direção final, stack e aprovação única “pode construir” | Opus |
| Execução autônoma | 4 | `fases/04-execucao-autonoma.md` | site construído, revisado e relatório final | Sonnet |
| Refinamento | 5 | `fases/05-refinamento.md` | ajustes pedidos pelo dev | Sonnet |
| Entrega | 6 | `fases/06-entrega.md` | preview, feedback, lançamento e portfólio | Sonnet |

Modelos recomendados: fase 0 Sonnet; fases 1–3 Opus; fases 4–6 Sonnet. Claude Code pode avisar uma vez por etapa se o modelo divergir. Em Codex, informe o recomendado em uma linha; o dev controla o modelo pela interface.

## Regras

- Planejamento: proponha; reúna todas as perguntas pendentes numa mensagem, com opções numeradas e recomendação primeiro. Aceite texto, áudio transcrito, imagens e mensagens como briefing. Registre decisões aprovadas em `projeto/ESTADO.md`.
- **Nunca sobrescreva uma saída de fase já entregue** (`BRIEF.md`, `DIRECAO.md`, `COPY.md`, `MIDIA.md`, `REVISAO.md`, `RELATORIO.md`). Antes de reescrever um desses arquivos, mova a versão atual para `projeto/historico/<arquivo>-v<N>.md` (N = próximo número livre) e só então grave a nova versão. Vale mesmo quando o ESTADO diz que a fase não começou — o arquivo existente é o que manda.
- Checkpoint no ESTADO a cada arquivo de saída entregue, não só ao fechar a fase inteira: se o crédito ou a sessão acabar no meio, a retomada não pode achar uma fase "não iniciada" com arquivo pronto no disco.
- Portão: não escreva código do site antes do “pode construir”. Pranchas descartáveis em `projeto/pranchas/` são permitidas.
- Execução autônoma: fases 4; não pergunte. Resolva dúvidas reversíveis conforme a direção e a copy e registre em `projeto/DECISOES.md`. Dados de negócio ausentes viram “a preencher” e pendência. Atualize o progresso no ESTADO a cada marco.
- Refinamento e entrega: aplique pedidos diretamente. Peça decisão só quando houver leituras materialmente diferentes, conflito com regra aprovada ou ação irreversível.
- Nunca invente dados do negócio. Dados reais ficam em `lib/site.ts`.
- Nada de push ou deploy em produção sem aprovação explícita. Não apague arquivos alheios nem instale programas.
- Só diga que algo passou após executar a checagem nesta sessão. Travas: nicho regulado conferido; portão aprovado; `npm run verificar` no fim da construção; segurança sem achados críticos aplicáveis.
- Conflitos entre skills: precedência definida em `stack-web`.

## Economia de tokens

Sem trocar resultado nem rigor — só corta releitura, saída que ninguém usa e contexto que não precisava ter entrado. Ideias adaptadas de github.com/valorisa/Claude-Skills (`skills/token-optimization`, MIT) para o fluxo deste template — ver `.claude/skills/ATTRIBUTION.md`.

- Não releia um arquivo que já está no contexto desta sessão (ESTADO, BRIEF, DIRECAO, COPY, MIDIA) a menos que possa ter mudado (outra sessão editou, `/clear` no meio, retomada em máquina nova). Na dúvida, confira só a data de "Última atualização" no ESTADO antes de reler tudo.
- De uma referência grande (skill inteira, `design-taste-frontend`, `stack-web`), carregue só a seção citada pela fase — cada fase já diz qual (ex.: "só as seções 0, 4 e 9"). Não abra o resto "por garantia".
- Ao citar um arquivo para o dev, aponte o caminho; não cole o conteúdo de volta (já vale pela regra de comunicação, mas vale também para não reprocessar o próprio arquivo na resposta).
- `checar-ambiente.mjs` roda em modo compacto por padrão (só o que muda uma decisão); `--completo` é só para depurar um problema específico, não para uso normal.
- No `ESTADO.md`, mantenha o "Diário curto" com as últimas 5–8 entradas; mova as mais antigas para `projeto/historico/diario.md` em vez de deixar crescer um arquivo que é lido inteiro toda sessão.
- **Contexto isolado por subagente:** auditoria (`revisor`, `seguranca`), preenchimento técnico (`seo-e-dados`) e processamento de mídia (`processador-de-midia`) já rodam como subagentes com ferramentas restritas — eles exploram o que precisam e devolvem só o relatório; o agente principal nunca carrega os arquivos que eles leram para chegar lá. Ao criar uma nova checagem que exige varrer muito código ou muitas capturas, siga o mesmo padrão em vez de fazer a varredura no agente principal.
- **Não troque ferramenta no meio da fase:** adicionar um MCP, uma skill ou trocar de modelo no meio de uma fase invalida o cache de prompt construído até ali (cada troca reprocessa o prefixo inteiro). Ajustes desse tipo esperam a borda de fase já prevista (`/clear` + `/model` no fim do portão); no meio de uma fase, só se for bloqueante.
- Fase 2 e fase 4 são as mais longas da sessão: se sentir a resposta ficando mais lenta ou o contexto claramente cheio de idas e voltas já resolvidas, rode `/compact` no lugar de deixar só a compressão automática decidir o que cortar.

## Versionamento

A escolha é registrada no ESTADO na fase 0 e determina cada operação:

| Modo | Comportamento |
|---|---|
| 1 · GitHub Desktop | Claude não faz commit nem push. Ao fim de cada etapa, fornece “hora de commitar”, resumo e descrição; durante a execução, cria marcos locais com `marco.mjs`. |
| 2 · commits locais | Claude faz commits nos marcos e no fim das etapas. Push somente após autorização explícita. |
| 3 · commits e push | Claude faz commits nos marcos e etapas; cada push para no controle de permissões até ser autorizado. |

Retomada: o diagnóstico confere commits locais sem push e, nos modos 2 e 3, atualiza `origin` para conferir commits remotos sem pull. Se houver divergência, pare antes de editar e informe contagem e ação sugerida em uma linha. No modo 1, não faça fetch: informe o que o GitHub Desktop mostra.

## Fechamento

Atualize `projeto/ESTADO.md` com status, decisões, pendências, próximo passo e modelo recomendado. Versione conforme o modo. Mensagens de marco em uma linha; fechamento de etapa em até 5 linhas. Ao concluir o portão, recomende `/clear`, Sonnet e “vamos continuar”. Ao concluir a execução autônoma, apresente o relatório e ofereça refinamento. Não resuma arquivos: indique seus caminhos.

## Arquivos

Projeto: `projeto/`. Modelos: `modelos/`. Referências de processo: `referencias/`. Referências visuais: `referencias/sites.md`. Scripts: `scripts/`.
