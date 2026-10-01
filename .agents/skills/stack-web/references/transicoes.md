# Transições: View Transitions API

Base: Next.js 16.3 com o `<ViewTransition>` do React. Fontes: nextjs.org/docs/app/guides/view-transitions, developer.mozilla.org (View Transition API).

## 1. Quando usar
- **Usar:** sites com várias páginas em que um elemento continua de uma página para a outra. A miniatura do portfólio que vira a imagem do case, o card do serviço que vira o topo da página do serviço, a troca de abas na mesma rota.
- **Não usar:** landing de página única (não há troca de rota), ou como enfeite em toda navegação. Transição sem continuidade é só atraso.

## 2. Configuração no App Router
**Nenhuma configuração e nenhum pacote.** O App Router usa a versão canary do React, que inclui o `ViewTransition`:
```tsx
import { ViewTransition } from "react";
```
- As animações disparam em Transitions, `<Suspense>` e `useDeferredValue`. Um `setState` comum não dispara. Toda navegação do Next é uma Transition, então elas rodam sozinhas ao navegar.
- Suporte: Chromium 125+ e versões recentes do Safari e do Firefox. Sem suporte, o site funciona normalmente, só sem animação. É melhoria progressiva por definição.
- Funciona em Server Components (o componente não exige `"use client"`).
- A regra CSS `@view-transition { navigation: auto; }`, para transições entre documentos, vale para sites HTML de várias páginas sem framework. No Next a navegação é client-side, então use o componente.

## 3. Snippet de referência: elemento compartilhado entre rotas
```tsx
// app/trabalhos/page.tsx (lista)
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";

export default async function Trabalhos() {
  const casos = await listarCasos();
  return casos.map((caso) => (
    <Link key={caso.slug} href={`/trabalhos/${caso.slug}`}>
      <ViewTransition name={`capa-${caso.slug}`} share="morph" default="none">
        <Image src={caso.capa} alt={caso.titulo} width={800} height={600} />
      </ViewTransition>
    </Link>
  ));
}
```
```tsx
// app/trabalhos/[slug]/page.tsx (detalhe): mesmo name, mesmas props
<ViewTransition name={`capa-${caso.slug}`} share="morph" default="none">
  <Image src={caso.capa} alt={caso.titulo} width={1600} height={1200} preload sizes="100vw" />
</ViewTransition>
```
```css
/* app/globals.css */
::view-transition-group(.morph) { animation-duration: 400ms; }

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```
- O mesmo `name` nas duas páginas cria a identidade, e o navegador anima posição e tamanho entre elas.
- `default="none"` impede que cada elemento nomeado rode um crossfade em toda transição que não tem a ver com ele. **Com `default="none"`, mantenha `share` explícito**: sem ele, o morph para de funcionar sem dar erro.
- A transformação só acontece quando o destino renderiza junto com a navegação (página pré-carregada). Se o destino mostrar fallback de `Suspense` antes, o conteúdo usa a animação de entrada.
- **Direção:** `<Link transitionTypes={["nav-forward"]}>` e `["nav-back"]`, com `enter`/`exit` mapeados por tipo num `ViewTransition` em cada `page.tsx` (**não no layout**: o layout persiste entre as rotas, então enter e exit nunca disparam nele). Receita completa no guia do Next citado acima.

## 4. Reduced motion e carregamento
- O bloco CSS acima zera todas as durações com `reduce`, e o conteúdo troca na hora. Deslizamentos laterais são o gatilho mais comum de enjoo; crossfades e morphs são mais leves, mas o bloco cobre todos.
- Transições curtas (150–400 ms). Durante a transição, elementos nomeados não recebem clique; não nomeie botões que o usuário clica em sequência.
- Não bloqueia o carregamento: sem suporte ou sem JS, a navegação é a normal.

## 5. Erros comuns
- Dois elementos visíveis com o mesmo `name` ao mesmo tempo (ex.: `name` fixo dentro de um `.map`): o nome precisa ser único na página. Inclua o id do item.
- Colocar `enter`/`exit` de rota no `layout.tsx`.
- Esperar animação num `setState` comum: envolva com `startTransition`.
- Misturar com transição de rota feita no Motion (`AnimatePresence` no layout): escolha uma. Para troca de rota no App Router, use View Transitions.
- Lenis ou ScrollTrigger não precisam de ajuste por causa das View Transitions. Os ScrollTriggers da página que sai são limpos pelo `useGSAP` ao desmontar.
