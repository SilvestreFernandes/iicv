# Microanimações de assets: Rive e Lottie

Versões de referência (setembro de 2026): `@rive-app/react-webgl2` 4.35, `@lottiefiles/dotlottie-react` 0.19. Fontes: rive.app/docs/runtimes/react, npmjs.com/package/@lottiefiles/dotlottie-react.

## 1. Rive × Lottie: qual escolher
| | Rive | Lottie (formato dotLottie) |
|---|---|---|
| Natureza | Máquina de estados interativa: reage a hover, clique e valores (progresso, checkbox) | Animação linear: toca, pausa, repete |
| Origem | Editor do Rive (`.riv`) | After Effects + Bodymovin, ou LottieFiles (`.lottie` ou `.json`) |
| Bons usos | Botão ou ícone com estados, mascote que reage, indicador de progresso | Confirmação de envio do formulário, ilustração em loop, loader |
| Não usar | Animação simples que um SVG com CSS resolve | Quando precisa reagir a input com estados |

Nas duas: **uma ou duas por página, no máximo**, sempre abaixo da dobra ou disparadas por ação do usuário. Um ícone animado no hero raramente vale o peso do runtime.

## 2. Rive
```bash
npm i @rive-app/react-webgl2
```
A documentação do Rive recomenda o `@rive-app/react-webgl2` para React. Existem outros renderizadores (`@rive-app/react-canvas`), mas escolha um só por projeto.
```tsx
"use client";
import { useEffect } from "react";
import { useRive } from "@rive-app/react-webgl2";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

export function IconeInterativo() {
  const reduz = usePrefereMenosMovimento();
  const { rive, RiveComponent } = useRive({
    src: "/rive/icone.riv",
    stateMachine: "Principal", // singular; `stateMachines` foi depreciado
    autoplay: false, // quem decide é o efeito abaixo, depois de saber a preferência
  });

  useEffect(() => {
    if (rive && reduz === false) rive.play(); // null = preferência ainda desconhecida (hidratação)
  }, [rive, reduz]);

  return (
    <div className="size-24">
      <RiveComponent aria-hidden="true" />
    </div>
  );
}
```
- O canvas precisa de um container com dimensões definidas, senão não aparece.
- Estados controlados pelo site (data binding): `autoBind: true` + `rive.viewModelInstance` com os hooks `useViewModelInstance*`. Para definir valores antes do primeiro frame, use `onRiveReady`.
- Com a API imperativa (`@rive-app/webgl2` dentro de um `useEffect`), chame `rive.cleanup()` no retorno do efeito.
- Carregue com `next/dynamic` se o componente estiver abaixo da dobra, com placeholder do mesmo tamanho.

## 3. Lottie (dotLottie)
```bash
npm i @lottiefiles/dotlottie-react
```
Prefira o formato `.lottie` (ZIP comprimido com a animação e seus recursos) ao `.json`: arquivo bem menor.
```tsx
"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

export function EnvioConfirmado() {
  const reduz = usePrefereMenosMovimento();
  // autoplay é lido na montagem: só monta o player quando a preferência já é conhecida
  if (reduz === null) return <div className="size-32" />;
  return (
    <DotLottieReact
      src="/lottie/enviado.lottie"
      autoplay={!reduz}
      loop={false}
      aria-hidden="true"
      className="size-32"
    />
  );
}
```
- `dotLottieRefCallback` dá acesso ao player (`play`, `pause`, `setFrame`) para controle manual. Com `reduce`, uma boa escolha é `setFrame` no último frame, que é o estado final e legível.
- `playOnHover` resolve a animação que toca só no hover, sem código extra.
- Para Lottie simples sem interação, avalie antes um SVG animado com CSS: zero runtime.

## 4. Reduced motion e carregamento
- Com `reduce`: Rive sem `play()` e Lottie sem `autoplay`, parados num frame que comunica o estado.
- O significado nunca depende só da animação: o texto "Mensagem enviada" existe em HTML ao lado do ícone, e a animação fica com `aria-hidden`.
- O runtime do Rive e o player do dotLottie usam WASM e pesam. Import dinâmico quando o componente não aparece logo, e nada disso no hero de uma landing de conversão.

## 5. Erros comuns
- Lottie exportado com imagens raster embutidas: o arquivo explode de tamanho. Use camadas vetoriais.
- Rive com `autoplay: true` fixo: ignora a preferência de movimento reduzido.
- Loop infinito em ícone decorativo espalhado pela página: distrai e gasta bateria.
- Dois players (Lottie web e dotLottie) ou dois renderizadores do Rive no mesmo projeto.
