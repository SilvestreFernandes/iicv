# Plano V3: template_sites

Lições do site Paola Marra (fases 0 a 3). Base para a v3 do template. Itens de alta e média prioridade implementados — ver `CHANGELOG.md`, "Plano V3 concluído".

## Alta prioridade

### 1. ESTADO desatualizado fez trabalho ser sobrescrito
O Codex entregou e commitou um pacote da fase 2, mas o ESTADO continuou como "fase 2 não iniciada". Na retomada, `DIRECAO.md`, `COPY.md` e `MIDIA.md` foram refeitos e substituídos, e boas ideias se perderam (botão "Simular consulta", títulos com "Conceito", breadcrumbs).
- `checar-ambiente.mjs` compara o ESTADO com os arquivos de saída de cada fase e alerta. Ex.: "DIRECAO.md existe, mas a fase 2 está como não iniciada".
- Regra no `comecar`: nunca sobrescrever uma saída de fase. Antes de reescrever, a versão anterior vai para `projeto/historico/<arquivo>-v1.md`.
- Toda sessão encerra atualizando o ESTADO, inclusive quando o crédito acaba no meio. Checkpoint a cada arquivo entregue.

### 2. Caminhos quebrados na fase 2
`02-pacote-criativo.md` manda ler `modelos/DIRECAO.md`, `modelos/COPY.md`, `referencias/vocabulario-visual.md` e `referencias/trilhas.md`. Os três primeiros não existem, e o `trilhas.md` só existe em `.claude/skills/comecar/referencias/`. Criar os modelos ou corrigir os caminhos.

### 3. Tipo de projeto "demonstração de portfólio" desde a fase 0
O projeto mudou de "cliente real" para "demonstração" no meio da fase 1, gerando várias rodadas de ajuste no briefing, nas pendências e no escopo. Incluir a opção na fase 0, com um pacote de regras pronto:
- aviso fixo de demonstração;
- `noindex`;
- formulários só no navegador;
- dados fictícios sinalizados;
- e-mail `example.com`;
- sem schema de negócio.

(Relacionado ao modo teste/pitch da v2: unificar ou deixar claras as diferenças.)

### 4. Vídeo entrando cedo no fluxo
Os vídeos chegaram no meio da fase 2 e forçaram refazer as três direções.
- No fim da fase 1, entregar um kit de prompts do Google Flow por nicho: abstratos e seguros para nicho regulado, com bloco de estilo, 16:9 + 9:16 e 1080p. O dev gera enquanto as direções são preparadas.
- Criar `referencias/prompts-video.md` com os prompts que funcionaram (partículas, persiana, partículas assentando).
- Pedir 1080p e as versões verticais já na primeira rodada. Aqui foram duas rodadas.

### 5. Script de mídia recebida
Todo vídeo exigiu cópia manual, `ffprobe` e folha de contato. Criar `scripts/receber-midia.mjs` que:
- pega os N arquivos mais recentes de Downloads e numera em sequência;
- lê dimensões e duração;
- gera uma folha de contato de 5 a 10 quadros;
- preenche a linha no `INVENTARIO.md`.

### 6. Checagem de mídia gerada por IA
Achados deste projeto: vídeo com texto na tela e marca de outro escritório ("LAICIA FIRM"); logo da Apple e capa de livro legível; arranha-céus que não são a cidade do cliente; vídeo que não fecha loop.
- Checklist fixo no `MIDIA.md`: texto ou marca visível · pessoa · lugar que finge ser real · loop fecha ou toca uma vez · resolução.

## Média prioridade

### 7. Servidor e fotos das pranchas
- `servir-pranchas.mjs` só serve `projeto/pranchas/`, o que obrigou a duplicar mídia. Deve servir também `projeto/referencias/midia/` (só leitura) em `/midia/`.
- Gerar uma `index.html` com links para A, B e C e imprimir as URLs ao iniciar (o dev não achou A e C).
- Criar `scripts/fotografar-pranchas.mjs`: captura 1440 e 375, mais estados de scroll e de carregamento. Pelo MCP, quadro a quadro, foi lento.
- Screenshot não mostra scroll nem vídeo: o fechamento da fase 2 sempre manda o dev abrir as pranchas no navegador.

### 8. Fontes só do Google Fonts nas pranchas
Satoshi e Cabinet Grotesk (fora do Google Fonts) caíram em fonte padrão sem ninguém perceber. Regra: nas pranchas, só Google Fonts. Fontshare apenas com `next/font/local`, decidido no portão.

### 9. Ambição define a faixa das três direções
Hoje a fase exige uma discreta, uma marcante e uma uau. Regra: com ambição "uau", as três ficam entre marcante e uau.

### 10. Análise de referências reaproveitável
Meer Mohsin precisou de 12 s de espera; Moto Card tem abertura com logo; OpenAI bloqueia o navegador automatizado (403).
- Criar `scripts/analisar-referencia.mjs` com espera configurável e rolagem por etapas.
- Salvar as capturas no template (`referencias/analise/<site>/`), não no projeto, para o próximo site não reanalisar.
- Marcar na `sites.md` quem exige análise manual.

### 11. Nicho regulado no questionário
O questionário pediu preços, avaliações, depoimento com resultado ("ganhou 35% a mais") e parcelamento, e a OAB veta tudo isso na publicidade. Em nicho regulado, a própria pergunta deve avisar o que não poderá aparecer no site, para não coletar o que será descartado.

### 12. Imagem da pessoa real
O vídeo 10 retrata a Paola gerada por IA. O questionário deve perguntar se há fotos ou vídeos da pessoa e se ela autoriza gerar imagem com IA. O ESTADO registra a autorização desde o início.

## Baixa prioridade

### 13. Vídeos pesados no git
Os originais somam cerca de 60 MB. Colocar `projeto/referencias/midia/originais/*.mp4` no `.gitignore` (ou usar Git LFS) e versionar só os comprimidos de `public/media/`.

### 14. CTA honesto na referência de copy
Consulta paga pede "Agendar consulta", não "conversa". Registrar em `design-moderno.md`: o botão não pode dar a entender que algo é gratuito.

### 15. Travessão
A `design-taste-frontend` proíbe e a `stack-web` deixa a decisão para a copy. Fixar a regra no modelo de COPY para as pranchas já nascerem certas.

### 16. Assinaturas visuais reutilizáveis
Depois da entrega, registrar em `portfolio/sites/` as técnicas usadas: palavra-janela (vídeo dentro das letras com `multiply`), travessia por escala, clarão e assinatura escrita pelo scroll. Assim o próximo site não repete a mesma técnica por engano.
