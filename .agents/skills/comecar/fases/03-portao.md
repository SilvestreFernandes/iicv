# Fase 3 — Portão de planejamento

**Objetivo:** tudo o que a execução autônoma precisa está pronto e o dev diz "pode construir" uma vez. **Modelo:** Opus.

Trava: sem o "pode construir" registrado, nenhum código do site.

## 1. Stack (automática)

Leia só o `SKILL.md` da `stack-web`. Escolha as camadas pelas tabelas dela a partir da direção escolhida (principalmente a assinatura) e grave na seção "Stack" do ESTADO, uma linha por camada com o motivo, incluindo o que **não** entra. Formulário, agendamento, login ou pagamento: defina como (ex.: formulário → rota de servidor + validação + anti-spam) e marque que a `seguranca-web` entra. Não peça aprovação: a stack só aparece no resumo.

## 2. Checklist do pacote

Confira cada item nos arquivos:

- [ ] BRIEF com negócio, público, ação principal, diferenciais, trilha e escopo
- [ ] Nicho registrado; se regulado, regras com fonte e confirmação (feita ou pendência com responsável)
- [ ] Recomendação de direção no `DIRECAO.md`, com prancha em `projeto/referencias/direcoes/`; registrar a escolha final neste portão
- [ ] Três direções documentadas antes da escolha: ousadia variada, uma uau, H1, referências citadas e ideias de mídia por direção
- [ ] `COPY.md` com todas as páginas e seções, SEO de cada página e microtextos
- [ ] `MIDIA.md` com prompts, destinos, status e mídia do cliente
- [ ] Stack gravada no ESTADO
- [ ] Dados de contato recebidos ou marcados "a preencher", com pendência do cliente
- [ ] Modo de versionamento gravado no ESTADO

## 3. Uma mensagem só

1. Faltou algo: reúna todas as perguntas numeradas, com opções e recomendação. Complete com as respostas e confira de novo.
2. Checklist completo: resumo em até 8 linhas (direções A/B/C e recomendação, H1, seções, stack, pendências) com caminhos de `DIRECAO.md`, `COPY.md` e `MIDIA.md`. Pergunte uma única vez: **pode construir?** (sim · escolher outra direção/ajustar: o quê).
3. Ajuste pedido: aplique e mostre só o que mudou.

## Fechar

Se o dev escolher outra direção, ajuste DIRECAO, COPY, MIDIA e a stack dependente; confira o checklist novamente. Com o "pode construir": registre a direção escolhida e a aprovação (data e nome) em "Decisões aprovadas", fase 3 concluída, versione conforme o modo. Termine com:
> Planejamento aprovado. Para a construção autônoma: `/clear`, `/model sonnet` e "vamos continuar".
