---
name: site-moderno-seo
description: Cria sites e landing pages com design moderno e autoral, já prontos para serem encontrados no Google e citados por assistentes de IA (ChatGPT, Claude, Perplexity). Use sempre que o usuário pedir para criar, refazer, modernizar ou revisar um site, landing page, portfólio, página de empresa ou de produto — inclusive sites "vibecoded" ou gerados por IA/Lovable/v0/Bolt — e também quando ele reclamar que o site "não aparece no Google", pedir SEO, meta tags, sitemap, robots.txt, imagem de compartilhamento no WhatsApp ou dados estruturados. Use mesmo que ele só fale em "design bonito" ou só em "SEO", porque os dois andam juntos nesta skill.
---

# Site moderno + encontrável

Esta skill junta duas coisas que quase sempre saem separadas em sites feitos com IA: um visual que não parece template e uma base técnica que deixa buscadores e modelos de IA lerem o site. Um site lindo que o Google não indexa é invisível; um site indexado com cara de template genérico não converte. O trabalho só está pronto quando as duas partes estão.

## Fluxo de trabalho

Siga as etapas na ordem. Cada uma depende da anterior.

### 1. Entender o negócio antes de desenhar

Descubra (pela conversa, arquivos ou perguntando uma vez só) o que é o negócio, quem é o público, qual é a ação principal da página (agendar, comprar, chamar no WhatsApp, pedir orçamento) e se é um negócio local. Se o usuário mandar código existente, trabalhe **sobre o código**, não sobre a URL: com o código dá para corrigir; sem ele, só dá conselho genérico.

Se for negócio local no Brasil, avise logo no início que o perfil do Google Empresas (endereço, horário, fotos reais) costuma trazer mais cliente que o site inteiro e deve ser resolvido primeiro. É gratuito.

### 2. Plano de design (antes de escrever código)

**No template, o plano de design sai do pacote criativo (fase 2 do `/comecar`)** e fica aprovado em `projeto/DIRECAO.md` (cor, tipografia, layout, interação-assinatura). Não refaça o plano aqui: leia a direção aprovada e construa em cima dela. `references/design-moderno.md` continua valendo como lista de padrões genéricos a evitar.

Fora do template (site avulso), monte um mini sistema visual específico para o negócio: 4–6 cores nomeadas em hex, 1 ou 2 famílias tipográficas com papéis claros, conceito de layout em uma frase + wireframe ASCII, e um único elemento memorável. Se o plano sairia igual para qualquer negócio parecido, mude a parte genérica antes de codar.

### 3. Construir já com a base técnica embutida

Escreva o HTML/componentes com a estrutura de SEO desde o começo, não como remendo. A stack (Next.js + TypeScript + Tailwind, e quais camadas de animação entram) vem da skill `stack-web`.

**No template, a base de SEO já existe e só precisa ser preenchida:**
- `lib/site.ts`: nome, descrição, páginas, NAP, horário, redes. É a fonte única: metadata, JSON-LD, sitemap e robots leem daqui. Dado que o cliente não forneceu fica vazio, nunca inventado.
- `app/layout.tsx`: metadata padrão (title com template, description, canonical, Open Graph, robots).
- Cada página nova exporta `metadata` própria (title, description, `alternates.canonical`) e entra em `site.paginas`.
- `components/seo/JsonLd.tsx`: `LocalBusiness` (troque `tipoSchema` pelo subtipo). Para `Service` ou `FAQPage`, siga `assets/jsonld-exemplos.md` no mesmo padrão.
- `app/opengraph-image.tsx` (ou `opengraph-image.jpg`, 1200×630) é criado na construção (fase 4), na identidade aprovada.
- Nada é indexado até o lançamento: robots, meta robots e `X-Robots-Tag` bloqueiam tudo enquanto `SITE_INDEXAVEL` não for `true` (definida na Vercel, só em produção, na fase 6). Ver `siteIndexavel()` em `lib/site.ts`.

Os arquivos de `assets/` (head completo, robots.txt, sitemap.xml) servem para site fora do Next. Requisitos mínimos de construção:

- HTML semântico (`header`, `main`, `nav`, `section`, `footer`), um único `<h1>` por página dizendo o que ela é, e H2/H3 em hierarquia sem pular níveis.
- `lang="pt-BR"`, viewport correto, imagens com `alt`, `width`/`height` e `loading="lazy"` abaixo da dobra; formatos WebP/AVIF.
- Responsivo de verdade a partir do celular, foco de teclado visível, `prefers-reduced-motion` respeitado, contraste AA.
- Conteúdo principal no HTML servido (não depender só de JavaScript para o texto aparecer), porque muitos rastreadores de IA não executam JS.

### 4. Auditoria de SEO em três blocos + camada de IA

Leia `references/checklist-seo.md` e aplique **um bloco por vez**, na ordem. O bloco 1 é pré-requisito: sem ele, nada do resto importa, porque ninguém está lendo o site.

1. **Deixar entrar** — sem `noindex` por engano, `sitemap.xml` real, `robots.txt` sem bloqueio acidental, HTTPS forçado.
2. **Deixar entender** — H1 único, title e description escritos para pessoas, URLs limpas, links internos, dados estruturados.
3. **Deixar rápido e apresentável** — imagens comprimidas, mobile rápido, imagem de compartilhamento (Open Graph) para WhatsApp e redes. Esta última é o item de maior retorno por esforço e o mais esquecido.
4. **Aparecer nas respostas de IA** — decidir conscientemente se libera os rastreadores de modelos (GPTBot, ClaudeBot, PerplexityBot etc.) no robots.txt, e escrever texto claro e estruturado.

### 5. Entregar com rastreabilidade

Todo achado de auditoria vem com **arquivo e linha** (ou trecho exato), para o usuário conseguir verificar. Title, description, JSON-LD, robots.txt e texto do Open Graph saem **prontos para colar**, nunca como instrução do tipo "adicione uma description".

Termine com a checagem final abaixo, marcando o que foi feito e o que depende do usuário.

## Checagem final (antes de dizer que está pronto)

- [ ] Nenhuma página tem `noindex` por engano (meta tag nem cabeçalho `X-Robots-Tag`)
- [ ] `sitemap.xml` existe e lista as páginas reais, com URLs absolutas em HTTPS
- [ ] Cada página tem um H1 só, que diz o que ela é
- [ ] O link compartilhado mostra imagem (1200×630) e título corretos
- [ ] O site abre rápido no celular, testado em rede lenta
- [ ] Decisão consciente sobre liberar ou bloquear rastreadores de IA
- [ ] O design tem um elemento memorável e não cai nos padrões genéricos listados na referência

## Próximos passos para o usuário

Sempre feche orientando:
1. Teste de 30 segundos: pesquisar no Google `site:seudominio.com.br`. Pouco ou nenhum resultado = problema do bloco 1, e conteúdo novo não resolve.
2. Cadastrar o site e enviar o sitemap no Google Search Console (https://search.google.com/search-console) e acompanhar a indexação nos dias seguintes.
3. Testar o compartilhamento colando o link no WhatsApp.
