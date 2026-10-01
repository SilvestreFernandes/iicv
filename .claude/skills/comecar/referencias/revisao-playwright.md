# Conferência visual e testes com o Playwright MCP

Usado na fase 2 (pranchas) e fase 4 (construção e revisão). Adaptado para o MCP `playwright` do template. Não precisa de Python.

## Antes de tudo

- O servidor `playwright` precisa aparecer em `/mcp`. Se não aparecer: `npm install` feito? Claude Code reaberto depois disso? Chromium instalado (`npx playwright install chromium`)? Ver fase 0.
- Suba o site com `npm run dev` em segundo plano e espere a linha "Ready". A URL padrão é `http://localhost:3000`.

## Reconhecer antes de agir

1. Navegue até a página e espere a rede ficar ociosa antes de inspecionar (página com JS ainda carregando dá seletor errado).
2. Tire um snapshot de acessibilidade para descobrir os elementos pelo papel e pelo nome ("button Agendar horário"), não por classe CSS.
3. Só então clique, preencha ou role.

## Screenshots de conferência (marcos da fase 4)

No fim do hero e no fim da construção:
1. Redimensione para **375×812** e tire screenshot da seção (ou da página inteira, se curta).
2. Redimensione para **1440×900** e repita.
3. Compare com `projeto/DIRECAO.md`, a prancha e a copy aprovada: hierarquia, espaço, cor, fonte, corte de texto, CTA visível.
4. Corrija e tire de novo.

Salve os screenshots que valem registro em `projeto/referencias/` (os temporários ficam em `.playwright-mcp/`, fora do git).

## Checagens automáticas (fase 4)

Rode no navegador (avaliar JavaScript na página) e registre o resultado em `projeto/REVISAO.md`:

- **Imagens quebradas:** `[...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)` deve voltar vazio.
- **Scroll horizontal:** `document.documentElement.scrollWidth > window.innerWidth` deve ser `false` em 375px.
- **Um H1:** `document.querySelectorAll('h1').length === 1`.
- **Imagem sem alt:** `[...document.images].filter(i => !i.hasAttribute('alt')).length === 0`.
- **Campo sem label:** para cada `input`, `select` e `textarea` visível, existe `label[for]`, `aria-label` ou `aria-labelledby`.
- **Console:** leia as mensagens do console; erro vermelho é defeito a corrigir.
- **Alvos de toque:** em 375px, botões e links principais com pelo menos 44×44px (`getBoundingClientRect`).
- **Teclado:** pressione Tab da primeira à última parada e confirme ordem lógica e foco visível (screenshot de 2 ou 3 paradas).
- **Movimento reduzido:** emule `prefers-reduced-motion: reduce` (se a ferramenta não oferecer, rode a checagem manual em DevTools → Rendering e marque como pendente humano) e confira que nada pina, desliza ou fica em loop.
- **Sem JavaScript:** desative JS (ou busque o HTML com `curl http://localhost:3000`) e confirme que H1, texto e CTA do hero estão no HTML servido.

## Lighthouse medido de verdade (só na fase 4)

Com o build de produção (`npm run build && npm run start`):
```
npx lighthouse http://localhost:3000 --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=projeto/lighthouse-desktop.json --chrome-flags="--headless"
npx lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=projeto/lighthouse-mobile.json --chrome-flags="--headless"
```
O `npx lighthouse` baixa o pacote na primeira vez (já liberado no `.claude/settings.json`). Registre as quatro notas de cada perfil em `projeto/REVISAO.md`. SEO local pode marcar “is crawlable” como esperado por causa do noindex. Alternativa: PageSpeed Insights na URL do preview da fase 6.
