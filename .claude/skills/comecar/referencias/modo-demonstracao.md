# Modo demonstração — pacote de regras

Vale para qualquer site que ainda não é de um cliente pagante: modo "Teste / pitch" escolhido na fase 0 (pergunta 2) e trilha E (`referencias/pitch-local.md`). As duas situações usam este mesmo pacote; a diferença entre elas é só a origem do material (fictício vs. dados públicos de um negócio real) — ver `referencias/trilhas.md`.

Registrar a escolha no ESTADO (campo "Modo") assim que decidida, para o `checar-ambiente.mjs` e a retomada nunca perderem essa informação.

## Regras fixas

- **Aviso fixo de demonstração:** rótulo `DEMONSTRAÇÃO — DADO FICTÍCIO` (ou, na trilha E, `DEMONSTRAÇÃO — DADOS PÚBLICOS, NÃO OFICIAL`) em `BRIEF.md`, `DIRECAO.md`, `COPY.md`, `MIDIA.md` e `RELATORIO.md`, e um aviso visível no rodapé do site (não só no código-fonte).
- **`noindex`:** `robots` da página com `index: false` desde o primeiro commit — não é ajuste de última hora da fase 6.
- **Formulários só no navegador:** nenhum formulário do site envia para API, e-mail real ou serviço externo; a submissão fica em memória/local no cliente (ex.: mostra uma mensagem de sucesso sem persistir nada). Nunca aponte para um endpoint de produção do cliente real.
- **Dados fictícios sinalizados:** todo dado inventado (depoimento, número, nome, endereço) é marcado como fictício no BRIEF/COPY, nunca apresentado como real; a trilha E não inventa nada — usa só o que é público ou deixa "a preencher".
- **E-mail `example.com`:** qualquer e-mail de contato no site usa o domínio reservado `algo@example.com`, nunca um endereço real do prospect ou da BrandForge.
- **Sem schema de negócio:** nenhum JSON-LD de `LocalBusiness`/`Organization`/similar — a demonstração não deve se anunciar como o negócio oficial para buscadores.
- **Lançamento bloqueado:** sem deploy em produção nem domínio próprio até o dev confirmar a conversão para cliente real.

## Ao converter para cliente real

Atualize a trilha em `ESTADO.md`, volte à fase 1 para completar o BRIEF com o cliente, e remova este pacote item por item: tire o `noindex`, ligue os formulários a um destino real, troque os e-mails, adicione o schema e revise cada dado fictício antes do lançamento.
