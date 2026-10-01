# 3D / WebGL: React Three Fiber + drei, Spline, sequência de imagens em canvas

Versões de referência (setembro de 2026): `three` 0.186, `@react-three/fiber` 9.8 (par do React 19), `@react-three/drei` 10.7, `@splinetool/react-spline` 4.1 + `@splinetool/runtime` 2.0. Fontes: r3f.docs.pmnd.rs, github.com/splinetool/react-spline, gsap.com/docs.

**Pergunta de entrada:** o 3D é o conceito ou é enfeite? Se for enfeite, não entra. Se for narrativa sem interação livre, a sequência de imagens (seção 3) entrega o mesmo efeito com uma fração do custo.

## 1. React Three Fiber + drei
**Quando usar:** produto que o usuário gira ou configura, cena interativa que é a assinatura do site.
**Quando não usar:** fundo decorativo, público com celular de entrada, efeito que um vídeo ou uma sequência de imagens resolve.

```bash
npm i three @react-three/fiber @react-three/drei
```
- A documentação do R3F ainda cita `transpilePackages: ["three"]` no `next.config.ts`. Com Next 16.3 + Turbopack, o build passou sem essa opção; adicione-a só se aparecer erro de import do `three`.
- O `<Canvas>` só existe no cliente. Isole a cena num arquivo `"use client"` e carregue-o com `next/dynamic` e `ssr: false` **a partir de outro Client Component** (em Server Component, `ssr: false` dá erro).

```tsx
// components/movimento/Produto3D.tsx: carregador, o que a página importa
"use client";
import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

const poster = <Image src="/produto-poster.webp" alt="Garrafa térmica em aço escovado" fill sizes="100vw" className="object-contain" />;

const Cena = dynamic(() => import("./CenaProduto"), { ssr: false, loading: () => poster });

// Sem isto, um .glb que falha ao carregar derruba a PÁGINA INTEIRA ("This page couldn't load").
class LimiteDeErro extends Component<{ reserva: ReactNode; children: ReactNode }, { erro: boolean }> {
  state = { erro: false };
  static getDerivedStateFromError() {
    return { erro: true };
  }
  render() {
    return this.state.erro ? this.props.reserva : this.props.children;
  }
}

export function Produto3D() {
  const reduz = usePrefereMenosMovimento();
  return (
    <div className="relative aspect-square w-full">
      {/* null = preferência ainda desconhecida: mostra o pôster até saber */}
      {reduz === false ? (
        <LimiteDeErro reserva={poster}>
          <Cena />
        </LimiteDeErro>
      ) : (
        poster
      )}
    </div>
  );
}
```
```tsx
// components/movimento/CenaProduto.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

function Modelo() {
  const { scene } = useGLTF("/modelos/garrafa.glb");
  return <primitive object={scene} />;
}

export default function CenaProduto() {
  return (
    <Canvas frameloop="demand" dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 35 }}>
      <Environment preset="studio" />
      <Modelo />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
```
Performance:
- `frameloop="demand"` renderiza só quando algo muda. Se algo mudar fora do React, chame `invalidate()`.
- `dpr={[1, 2]}` limita a resolução em telas de alta densidade. Para ajustar a qualidade conforme o FPS, use `<PerformanceMonitor>` do drei.
- Modelos `.glb` comprimidos (Draco ou Meshopt; `npx gltfjsx --transform` gera tudo), abaixo de ~2 MB. Reaproveite geometrias e materiais; para muitos objetos iguais, use `InstancedMesh`.
- Nunca `setState` dentro de `useFrame`: mude a ref do objeto diretamente.
- Scroll ligado à cena: o ScrollTrigger atualiza uma ref (progresso de 0 a 1) e o `useFrame` lê essa ref. Não crie uma segunda lógica de scroll.

## 2. Spline
**Quando usar:** cena simples feita por designer no Spline, sem lógica própria.
**Quando não usar:** quando a cena precisa de controle fino, performance crítica no celular, ou quando o runtime (pesado) não se paga.

```bash
npm i @splinetool/react-spline @splinetool/runtime
```
- No Next, prefira `import Spline from "@splinetool/react-spline/next"`: o servidor renderiza um placeholder desfocado gerado automaticamente (exporte a cena como "Next.js" no editor do Spline). Para gerar esse placeholder, o build baixa a cena. Com URL inválida ou fora do ar, o `next build` registra um erro de JSON.
- Cena abaixo da dobra: carregue sob demanda (`next/dynamic` ou `React.lazy` + `Suspense`), com fallback de tamanho reservado.
- Com problema de CORS, baixe o `.splinecode` e hospede-o em `public/`.
```tsx
"use client";
import Spline from "@splinetool/react-spline/next";

export function CenaSpline() {
  // URL do painel Export → Code → React/Next.js do Spline
  return <Spline scene="https://prod.spline.design/SEU-ID/scene.splinecode" className="aspect-video w-full" />;
}
```
Com `reduce`, troque a cena por uma imagem estática (use `usePrefereMenosMovimento`).

## 3. Sequência de imagens em canvas ("estilo Apple")
**Quando usar:** produto girando, se abrindo ou montando conforme a rolagem, com frames renderizados antes (Blender, Cinema 4D, vídeo exportado em frames).
**Quando não usar:** quando o usuário precisa controlar a câmera (use R3F) ou quando um vídeo curto com `autoplay muted playsinline` basta.

Como funciona: o ScrollTrigger com scrub controla um índice de frame, e cada atualização desenha a imagem correspondente num `<canvas>`. Um pôster em `next/image` (primeiro frame) fica por baixo: é o LCP, aparece sem JS e fica como versão final com `reduce`.

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = { prefixo: string; total: number; alt: string }; // ex.: prefixo "/sequencia/frame-" → frame-0001.webp

export function SequenciaProduto({ prefixo, total, alt }: Props) {
  const secao = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = canvas.current!.getContext("2d")!;
        const src = (i: number) => `${prefixo}${String(i + 1).padStart(4, "0")}.webp`;
        const frames = Array.from({ length: total }, (_, i) => {
          const img = new window.Image();
          img.src = src(i);
          return img;
        });
        const estado = { frame: 0 };
        const desenhar = () => {
          const img = frames[estado.frame];
          if (!img.complete || !img.naturalWidth) return;
          if (canvas.current!.width !== img.naturalWidth) {
            canvas.current!.width = img.naturalWidth;
            canvas.current!.height = img.naturalHeight;
          }
          ctx.drawImage(img, 0, 0);
        };
        frames[0].onload = desenhar;
        gsap.to(estado, {
          frame: total - 1,
          snap: "frame",
          ease: "none",
          onUpdate: desenhar,
          scrollTrigger: { trigger: secao.current, start: "top top", end: "+=200%", pin: true, scrub: 0.5 },
        });
      });
    },
    { scope: secao }
  );

  return (
    <section ref={secao} className="relative h-svh">
      <Image src={`${prefixo}0001.webp`} alt={alt} fill sizes="100vw" className="object-contain" />
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 size-full object-contain" />
    </section>
  );
}
```
- Se a sequência estiver no hero, adicione `preload` no `<Image>` do pôster.
- Uma função não pode ir de Server Component para Client Component como prop. Por isso o componente recebe `prefixo` (string), e não uma função que monta o caminho.
- Orçamento: 60–120 frames em WebP ou AVIF, largura de ~1280 px no desktop. No celular, metade dos frames e resolução menor (use `matchMedia` com `(max-width: 767px)` para escolher o prefixo).
- Frames que não carregaram são pulados. O pôster por baixo garante que nunca aparece um vazio.

## 4. Reduced motion e carregamento (as três opções)
- Com `reduce`: o R3F e o Spline viram imagem estática; a sequência fica parada no pôster, sem pin.
- Nada de 3D no bundle inicial: import dinâmico sempre, com placeholder de tamanho reservado (sem CLS).
- O texto da seção (título, benefício, CTA) fica fora do canvas, em HTML renderizado no servidor. O canvas é ilustração (`aria-hidden`); a descrição vai no `alt` do pôster.

## 5. Erros comuns
- `<Canvas>` importado direto numa página Server Component, ou `dynamic(..., { ssr: false })` dentro de um Server Component (erro de build).
- Cena 3D sem error boundary: o `useGLTF` lança o erro quando o modelo não carrega (404, rede lenta, CDN fora do ar) e a página inteira cai. Sempre envolva a cena num limite de erro que mostra o pôster.
- `.glb` de 30 MB sem compressão. Luzes e sombras em tempo real quando um `Environment` resolve.
- `frameloop` padrão (`"always"`) numa cena parada: gasta bateria à toa.
- Sequência de imagens sem pôster: tela vazia até o primeiro frame chegar.
- Duas lógicas de scroll (ScrollTrigger + `useScroll` do drei) disputando a mesma cena.
