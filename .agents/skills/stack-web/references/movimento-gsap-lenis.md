# Movimento: GSAP + ScrollTrigger + SplitText + Lenis

Versões de referência (conferidas em 25/09/2026): `gsap` 3.15.0, `@gsap/react` 2.1.2, `lenis` 1.3.26. Detalhes de API: `references/gsap-oficial/`. Fontes: gsap.com/docs, gsap.com/resources/React, github.com/darkroomengineering/lenis.

**Licença:** o GSAP é 100% gratuito, inclusive para uso comercial, com todos os plugins (SplitText, ScrollSmoother, MorphSVG etc.). A única restrição da licença é usá-lo dentro de ferramentas no-code de animação visual que concorram com o Webflow. Sites e landing pages estão liberados.

## Índice
1. Instalação e registro
2. GSAP + ScrollTrigger
3. SplitText
4. Lenis
5. Reduced motion e carregamento
6. Erros comuns

## 1. Instalação e registro
```bash
npm i gsap @gsap/react        # + lenis, se a camada de rolagem suave foi ativada
```
Copie `assets/gsap-registro.ts` para `lib/gsap.ts` e importe **sempre** de `@/lib/gsap`, nunca direto de `gsap`. Assim os plugins são registrados uma vez só, e só no navegador.

Todo componente que usa GSAP:
- tem `"use client"` na primeira linha;
- usa `useGSAP` (nunca `useEffect` + `gsap.context`). O hook reverte tudo o que foi criado dentro dele ao desmontar, inclusive no Strict Mode, que roda os efeitos duas vezes em desenvolvimento;
- passa `scope` com a ref do container, para que seletores como `".passo"` só achem elementos dentro dele;
- envolve em `contextSafe` as animações disparadas depois, por eventos como clique.

## 2. GSAP + ScrollTrigger
**Quando usar:** pin, scrub, sequência de passos, scroll horizontal, parallax com propósito narrativo.
**Quando não usar:** "aparecer ao entrar na tela". Motion `whileInView` ou CSS `animation-timeline: view()` resolvem com menos código.

```tsx
"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ProcessoPinado({ children }: { children: React.ReactNode }) {
  const secao = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Só anima com movimento liberado e em telas médias ou maiores; senão os passos ficam empilhados e visíveis.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const passos = gsap.utils.toArray<HTMLElement>(".passo", secao.current);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: secao.current,
            start: "top top",
            end: () => `+=${window.innerHeight * passos.length}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        passos.slice(1).forEach((passo) => tl.from(passo, { yPercent: 100, autoAlpha: 0 }));
      });
    },
    { scope: secao }
  );

  return <section ref={secao} className="relative min-h-svh">{children}</section>;
}
```
Os passos (`.passo`) chegam como `children` renderizados no servidor. Sem JS ou com `reduce`, aparecem em sequência normal.

Pontos de configuração:
- `start: "top top"` para seções pinadas. `"top center"` faz o pin começar no meio da tela.
- Valores que dependem do tamanho da tela vão como função (`end: () => ...`) com `invalidateOnRefresh: true`.
- Crie os ScrollTriggers na ordem em que aparecem na página, ou use `refreshPriority`. Um pin criado fora de ordem desloca os seguintes.
- Conteúdo que muda o layout depois do carregamento (imagens sem dimensão, fontes, dados) pede `ScrollTrigger.refresh()` no callback de carregamento.
- `gsap-registro.ts` já aplica `ScrollTrigger.config({ ignoreMobileResize: true })`, o que evita recálculo quando a barra de endereço do celular aparece e some.

## 3. SplitText
**Quando usar:** títulos de seção ou um manifesto em que a tipografia animada é o elemento memorável.
**Quando não usar:** texto corrido, mais de 2–3 títulos por página, ou o H1 do hero quando ele é o LCP. Dividir o texto depois da hidratação faz o título aparecer, sumir e reaparecer, e atrasa o LCP. Se o conceito exigir o hero animado, que seja o único momento: meça o LCP antes e depois, e garanta que a imagem principal não dependa dele.

```tsx
"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function TituloAnimado({ children }: { children: React.ReactNode }) {
  const titulo = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(titulo.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true, // refaz o split quando as fontes carregam ou a largura muda
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 100,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: titulo.current, start: "top 80%", once: true },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: titulo }
  );

  return <h2 ref={titulo}>{children}</h2>;
}
```
- Com `autoSplit`, crie a animação **dentro de `onSplit` e retorne-a**. O SplitText guarda o progresso e refaz a animação a cada novo split. Sem isso, a animação continua apontando para linhas que já não existem.
- Acessibilidade: por padrão (`aria: "auto"`), o elemento pai ganha `aria-label` com o texto inteiro e os pedaços ficam com `aria-hidden`, então o leitor de tela lê a frase, não letra por letra. Não desligue.
- Prefira `type: "lines"` ou `"words"`. `"chars"` gera centenas de nós e pesa no celular.

## 4. Lenis
**Quando usar:** a página já tem ScrollTrigger com scrub ou pin e o conceito pede rolagem contínua.
**Quando não usar:** página curta, muitos formulários, modais e listas com scroll interno, interface com cara de app, ou sem GSAP (nesse caso a rolagem nativa já basta).

A integração vive em `assets/providers-movimento.tsx`: `ReactLenis` com `root` e `autoRaf: false`, o ticker do GSAP movendo o Lenis e `ScrollTrigger.update` a cada rolagem. É exatamente o padrão documentado pelo Lenis:
```ts
lenis.on("scroll", ScrollTrigger.update);        // no provider: useLenis(ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
- Importe `lenis/dist/lenis.css` (o provider já importa).
- Elementos com scroll próprio (modal, menu, lista) recebem `data-lenis-prevent` para rolar de forma nativa.
- `anchors: true` faz os links `#secao` rolarem suavemente.
- O Lenis respeita `prefers-reduced-motion` por padrão (`respectReducedMotion: true`): desliga a suavização e deixa os `scrollTo` instantâneos.
- Limitações conhecidas: sem suporte a CSS scroll-snap (existe o plugin `lenis/snap`), limitado a 60 fps no Safari e 30 fps em modo de economia de bateria, e sem suavização sobre iframes.

## 5. Reduced motion e carregamento
- Todo bloco com ScrollTrigger ou SplitText fica dentro de `gsap.matchMedia()` com `(prefers-reduced-motion: no-preference)`. Quando a preferência muda, o `matchMedia` reverte sozinho as animações e ScrollTriggers criados ali.
- Para versões mais leves em vez de "tudo ou nada", use condições nomeadas:
  ```ts
  mm.add({ reduz: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 768px)" }, (ctx) => {
    const { reduz, desktop } = ctx.conditions!;
    gsap.from(".cartao", { autoAlpha: 0, y: reduz ? 0 : desktop ? 60 : 24, duration: reduz ? 0.2 : 0.8 });
  });
  ```
- O estado inicial vem do JS (`gsap.from`), nunca do CSS. Sem JS, tudo fica visível.
- O GSAP não bloqueia o carregamento: as folhas client hidratam depois do HTML. Não importe `lib/gsap` em componentes que não animam.

## 6. Erros comuns
- `useEffect` sem cleanup, ou `gsap.context` esquecido: animações e pins duplicam ao voltar para a rota.
- ScrollTrigger dentro de um tween filho de timeline: coloque o ScrollTrigger na timeline, nunca nos filhos.
- Um único tween para vários elementos que deveriam animar cada um na sua vez: faça um loop criando um ScrollTrigger por elemento.
- `gsap.to` com ScrollTrigger que "pula" para o início: os valores iniciais são lidos na criação. Use `fromTo` ou `immediateRender: false`.
- `markers: true` esquecido em produção.
- `scroll-behavior: smooth` no `html` junto com ScrollTrigger: os marcadores ficam errados depois de redimensionar.
- `window.addEventListener("scroll", ...)` feito à mão: proibido. Use ScrollTrigger.
- Usar o Lenis como enfeite em página sem scroll narrativo: custa acessibilidade (rolagem "escorregadia") sem ganho.
