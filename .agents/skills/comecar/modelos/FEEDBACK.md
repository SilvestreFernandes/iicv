# Feedback do cliente — {{NOME DO NEGÓCIO}}

Preenchido na fase 6 a cada rodada. O original de cada rodada fica em `projeto/referencias/feedback-<rodada>.md`; aqui vai o que foi extraído e a decisão sobre cada ponto.

## Rodada {{N}} — {{AAAA-MM-DD}}

Original: `projeto/referencias/feedback-{{N}}.md`

| Pedido do cliente | Tipo | Decisão | Onde |
|---|---|---|---|
| {{o que o cliente pediu}} | {{ajuste · dúvida · escopo novo}} | {{aplicado · discutido com o dev · recusado — motivo}} | {{seção/arquivo}} |

Escopo novo ou dúvida que mudou algo aprovado: peça decisão ao dev antes de aplicar; registre a resposta na coluna acima e, se mudar uma decisão do portão, também em `projeto/ESTADO.md`.

Depois de aplicar: `npm run verificar`, conferir as áreas alteradas em 375/1440, atualizar `projeto/ESTADO.md`.

## Pendentes de rodada anterior

- {{item que ainda não foi resolvido, com a rodada de origem}}
