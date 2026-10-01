# Fase 2 — Pacote criativo

**Objetivo:** três direções e um pacote criativo completo recomendado (direção, copy e mídia), pronto para aprovação única no portão. **Modelo:** Opus.

Apresente o pacote completo para o dev confirmar ou ajustar; não peça aprovações intermediárias por seção. O portão da fase 3 reúne os ajustes finais e o único “pode construir”.

Leia antes: `projeto/BRIEF.md`, `modelos/DIRECAO.md`, `modelos/COPY.md`, `referencias/vocabulario-visual.md`, `referencias/sites.md` (raiz do repositório), a skill `frontend-design` e, da `design-taste-frontend`, só as seções 0, 4 e 9. Conflitos: tabela de precedência da `stack-web`.

Regra visual: nicho regulado limita o que se diz, não o visual. Use apenas `referencias/sites.md`, material visual enviado pelo cliente e `portfolio/sites/` como fontes visuais. Não pesquise inspiração em outros sites, blogs, artigos, galerias ou redes.

## 1. Portfólio

```
git fetch template
git ls-tree --name-only template/main portfolio/sites/
git show template/main:portfolio/sites/<arquivo>.md
```
Mais o `portfolio/sites/` local. Sem remote `template`: só o local, com uma linha de aviso. Nenhuma direção repete a combinação de fonte, paleta e hero de um site anterior, nem a fonte display do mais recente, nem a mesma técnica de "Interação-assinatura" registrada.

## 2. Três direções

Escreva em `projeto/DIRECAO.md`, no formato do modelo:
- Cada uma com um conceito tirado de fatos do BRIEF (o ofício, o lugar, o público, a história), nunca de tendência.
- Mostre a ambição aprovada no BRIEF e varie a ousadia entre as três dentro da faixa que a ambição define: ambição **discreta** → discreta, discreta+, marcante; **marcante** → discreta, marcante, uau (padrão: A discreta, B marcante, C uau); ambição **uau** → as três entre marcante e uau, nenhuma discreta. A regra do nicho nunca reduz a ousadia visual.
- Cada direção traz referências citadas de `referencias/sites.md` (nome e link), técnica observada via Playwright e como será reinterpretada; use a referência principal do nicho em pelo menos uma direção quando houver. Complete "Técnica: a analisar" no arquivo curado na primeira utilização. Junte apenas referências enviadas pelo cliente e portfólio; nunca copie.
- Cada direção inclui seu H1, ideia de mídia e prancha própria. Escolha uma recomendação coerente com briefing/ambição; deixe as três opções visíveis até o portão. Diferencie paleta, tipografia, estrutura, assinatura e grau de ousadia.
- Autocrítica antes de mostrar (processo da `frontend-design`): o que sairia igual para qualquer negócio parecido é refeito.

## 3. Pranchas

1. `projeto/pranchas/a.html`, `b.html`, `c.html` (fora do git): HTML estático, CSS no arquivo, com composição de hero em alta fidelidade para desktop e celular, H1 real, assinatura e quadro da mídia de referência. Não use só paleta e wireframe. Fontes só do Google Fonts por `<link>` na prancha — Fontshare e outras fora do Google Fonts caem em fonte padrão sem aviso; se a direção final usar Fontshare (`next/font/local`), isso só entra depois de decidido no portão (fase 3), nunca na prancha. Mídia de referência: linke `/midia/<arquivo>` (servido pelo `servir-pranchas.mjs`) em vez de copiar o arquivo para dentro de `pranchas/`.
2. `node .claude/skills/comecar/scripts/servir-pranchas.mjs` em segundo plano; ele imprime as URLs de a/b/c e do índice — confira que as três aparecem.
3. `node .claude/skills/comecar/scripts/fotografar-pranchas.mjs` captura 1440×900 e 375×812 de cada prancha, nos estados carregando/estável/rolado, em `projeto/referencias/direcoes/`. Mais rápido que o Playwright MCP quadro a quadro. Cada prancha mostra o hero em alta fidelidade e a moldura/quadro de mídia pensado para a composição.

## 4. Recomendação visual

Registre a recomendação em `DIRECAO.md`; não peça escolha nem aprovação nesta fase. As pranchas A/B/C, a copy e a mídia recomendadas seguem juntas ao portão. O dev pode escolher outra direção ou pedir ajustes na única aprovação do portão. Antes de fechar a fase, abra as três pranchas no navegador (`http://localhost:4321/`) — screenshot não mostra scroll nem vídeo em loop, só o navegador confirma isso. Encerre o servidor das pranchas; mantenha os arquivos em `projeto/pranchas/` até a entrega.

## 5. Plano de mídia

Para cada direção, liste ideias específicas de imagem/vídeo que reforcem o conceito. Crie `projeto/MIDIA.md` para a direção recomendada, com um bloco de estilo comum e um prompt pronto para o Google Flow para cada mídia proposta (hero desktop e mobile, no mínimo); reaproveite `referencias/prompts-video.md` e o kit já entregue ao fim da fase 1. Cada item precisa de uso, proporção (16:9 e 9:16 para variantes do hero), duração/loop para vídeo, movimento de câmera, instrução explícita sem texto, caminho exato, poster quando houver e status (pendente · recebida · processada). Repita o bloco de estilo em cada prompt. Peça sempre **1080p** e as duas proporções (16:9 + 9:16) já na primeira rodada de geração — pedir depois custa uma segunda rodada. Se o dev selecionar outra direção no portão, atualize o pacote antes de registrar a aprovação.
- Nicho regulado: mídia gerada por IA não pode sugerir resultado real, equipe, cliente/paciente ou espaço real. Limite a textura, atmosfera e objetos; registre essas restrições no bloco de estilo e em cada prompt.
- Mídia fornecida pelo cliente ou gerada no Flow: rode `node .claude/skills/comecar/scripts/receber-midia.mjs` para copiar de Downloads, ler dimensões/duração e gerar a folha de contato; cole a linha impressa em "Mídia do cliente" e complete uso/tratamento/destino. Não misture com conteúdo gerado sem registrar a origem.
- Na construção, use reserva com proporção e dimensões previstas, fundo coerente e sem conteúdo inventado; substitua quando a mídia chegar.
- **Checagem de mídia gerada por IA** (antes de marcar como "recebida"): texto ou marca visível na cena (mesmo de outra empresa) · pessoa não solicitada · lugar que finge ser um lugar real (skyline, prédio, cidade específica) · loop fecha sem salto perceptível, ou o vídeo não devia ser loop e toca uma vez · resolução mínima 1080p. Reprove e regenere se falhar em qualquer item; não processe mídia reprovada.

## 6. Copy completa (sem aprovação por seção)

Leia a seção "Texto da interface" de `.claude/skills/site-moderno-seo/references/design-moderno.md` e a estrutura da trilha em `referencias/trilhas.md`. Escreva tudo em `projeto/COPY.md`:
- Mapa de páginas e seções (a partir da trilha, do escopo e da direção), depois o texto de cada seção.
- Tom de voz, uso do travessão e rótulo único do CTA: decida e registre no topo do COPY; o dev corrige no portão se quiser.
- Toda frase passa pelas regras de nicho do BRIEF §2.
- Nada inventado: sem dado, "a preencher: …" e pendência no ESTADO.
- Hero: H1 de até 2 linhas no desktop, apoio de até ~20 palavras, CTA visível.
- Específico ganha de bonito; sem clichês de IA ("eleve", "transforme", "experiência única", "soluções").
- SEO de cada página: title (até ~60 caracteres) e description (até ~155); H1 diz o que é e onde, se for negócio local.
- Microtextos: rodapé com NAP igual ao BRIEF §4, formulário (rótulos, erro, sucesso), 404, texto do Open Graph.
- Releia tudo de uma vez: frase quebrada, tom inconsistente, CTA com rótulos diferentes.

## Fechar

Versione conforme o modo (inclua `projeto/MIDIA.md` no commit) e siga direto para a fase 3.
