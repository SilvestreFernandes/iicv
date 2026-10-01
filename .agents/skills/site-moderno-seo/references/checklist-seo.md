# Checklist de SEO e visibilidade em IA

Aplique um bloco por vez. Para cada item, reporte: status (ok / corrigido / pendente do usuário), arquivo e linha, e o código pronto quando houver correção.

## Bloco 1 — Deixar entrar (binário: ou entra, ou não)

1. **Procurar `noindex`.** Busque no código: `noindex`, `nofollow`, `X-Robots-Tag` e configs do framework/gerador (ex.: `robots: { index: false }` no metadata do Next.js, opções de "esconder dos buscadores" em builders). Muitos geradores deixam isso ligado por padrão; é o erro mais comum e mais silencioso.
   - Comando útil: `grep -rniE "noindex|x-robots-tag|index:\s*false" .`
2. **`sitemap.xml`** na raiz, listando só páginas reais e indexáveis, com URLs absolutas em HTTPS. Modelo: `assets/sitemap.xml`. Em Next.js, prefira `app/sitemap.ts`.
3. **`robots.txt`** na raiz. Procure `Disallow: /` acidental. Deve apontar o sitemap. Modelo: `assets/robots.txt`.
4. **HTTPS forçado**, com redirecionamento 301 de HTTP para HTTPS e uma única versão do domínio (com ou sem www). Tag `<link rel="canonical">` em cada página.

## Bloco 2 — Deixar entender

1. **Um H1 por página**, dizendo o que ela é. H2/H3 sem pular níveis.
2. **Title** (até ~60 caracteres) e **description** (até ~155) únicos por página, escritos para a pessoa que vai clicar. Formato útil: `Serviço em Cidade | Marca`.
3. **URLs limpas**: minúsculas, com hífen, sem IDs nem parâmetros (`/servicos/limpeza-de-pele`).
4. **Links internos** com texto descritivo ligando as páginas entre si (nada de "clique aqui").
5. **Dados estruturados (JSON-LD)** dizendo o que é a página: `Organization`/`LocalBusiness` na home, `Product`, `Service`, `Article`, `FAQPage` quando fizer sentido. Modelos: `assets/jsonld-exemplos.md`. Valide em https://validator.schema.org.

## Bloco 3 — Deixar rápido e apresentável

1. **Imagens**: WebP/AVIF, redimensionadas para o tamanho exibido, `width`/`height` definidos, `loading="lazy"` abaixo da dobra, `fetchpriority="high"` na imagem do hero.
2. **Mobile**: viewport correto, sem rolagem horizontal, fontes legíveis, teste em rede lenta (DevTools → Slow 4G) e no PageSpeed Insights.
3. **Imagem de compartilhamento (Open Graph + Twitter Card)**: imagem 1200×630, título e descrição. É o que aparece quando alguém cola o link no WhatsApp; sem ela o link parece quebrado. Melhor retorno por esforço da lista. Tags em `assets/head-modelo.html`.
4. **Favicon** e `apple-touch-icon`.

## Bloco 4 — Aparecer nas respostas de IA

1. Abra o `robots.txt` e procure regras `User-agent` para rastreadores de modelos. Muitos templates bloqueiam por padrão.
2. Principais agentes: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI); `ClaudeBot`, `Claude-SearchBot`, `Claude-User` (Anthropic); `PerplexityBot`; `Google-Extended`; `Applebot-Extended`; `CCBot`. A lista muda com o tempo; se houver busca na web disponível, confira a documentação atual.
3. **Decida conscientemente com o usuário**: liberar (quem vende para um público que pergunta à IA antes de pesquisar quase sempre quer liberar) ou bloquear (conteúdo proprietário). Explique a troca e registre a decisão no próprio robots.txt com um comentário.
4. Texto claro, com seções bem tituladas, respostas diretas a perguntas comuns (uma seção de FAQ ajuda) e conteúdo principal presente no HTML sem depender de JavaScript.
5. Opcional: um `llms.txt` na raiz resumindo o site e linkando as páginas principais.

## Como verificar depois
- `site:seudominio.com.br` no Google.
- Google Search Console: enviar sitemap, "Inspeção de URL", relatório de páginas indexadas.
- Colar o link no WhatsApp para ver a prévia.
- Documentação: https://developers.google.com/search/docs/crawling-indexing/robots/intro e https://schema.org
