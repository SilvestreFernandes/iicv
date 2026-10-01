# Base: Next.js (App Router) + TypeScript + Tailwind CSS + Vercel

Versões de referência (conferidas em 25/09/2026): `next` 16.3.6, `react` 19.2.8 (a versão que o `create-next-app` fixa; não troque manualmente), `tailwindcss` 4.3. Node.js 20.9 ou mais novo. Fontes: nextjs.org/docs, tailwindcss.com/docs.

## Índice
1. Quando usar
2. Scaffold
3. Estrutura de pastas
4. Fronteira Server/Client
5. Tailwind v4
6. Fontes e imagens
7. Vercel
8. Reduced motion e carregamento
9. Erros comuns

## 1. Quando usar
- **Usar:** todo site ou landing novo. O servidor entrega HTML completo (bom para o Google e para IAs), `next/image` e `next/font` resolvem as duas maiores causas de LCP e CLS ruins, a Metadata API casa com a `site-moderno-seo`, e o deploy na Vercel não pede configuração.
- **Não usar:** projeto existente em outra stack que funciona (redesign). Não migre sem pedido; aplique as regras obrigatórias do `SKILL.md` na stack que já existe.

## 2. Scaffold
**No template, o scaffold já existe** (gerado com `create-next-app@16.3.6 --yes` e enxugado): TypeScript, Tailwind v4, ESLint, App Router, Turbopack, alias `@/*`, `lang="pt-BR"`, metadata, `sitemap.ts`, `robots.ts`, JSON-LD, headers de segurança e a rede de `prefers-reduced-motion`. Não rode `create-next-app` de novo.

Fora do template (projeto novo do zero): `npx create-next-app@latest nome-do-projeto --yes` e troque `lang="en"` por `lang="pt-BR"`.

- Desde o Next 16, `next build` não roda o linter. Use `npm run verificar` (lint + build) antes de publicar.
- O `AGENTS.md` é escrito pelo próprio `next dev` e aponta para a documentação da versão instalada em `node_modules/next/dist/docs/`. Mantenha-o commitado.

## 3. Estrutura de pastas
```
app/
  layout.tsx          Server: <html>, fontes, <ProvidersMovimento> se houver camada de movimento
  page.tsx            Server: monta as seções
  sitemap.ts, robots.ts        já existem; leem lib/site.ts
  opengraph-image.tsx          criado na fase 4 (ver site-moderno-seo)
components/
  secoes/             Server Components: Hero, Processo, Depoimentos...
  animacoes/          wrappers client sem estilos: revelação e sequência por rolagem
  movimento/          folhas "use client": provider lazy do Lenis e configuração opcional do Motion
  midia/              vídeo com poster e fontes carregadas sob demanda
  contato/            ações e controles funcionais, sem estilo de marca
  seo/JsonLd.tsx      já existe
lib/
  site.ts             já existe: dados do negócio (fonte única de NAP, URL, páginas)
  gsap.ts             registro único dos plugins (assets/gsap-registro.ts), só se a camada GSAP entrar
```

## 4. Fronteira Server/Client
A seção é Server Component; só o pedaço que anima é client. O texto entra como `children` e continua renderizado no servidor, no HTML.

```tsx
// components/secoes/Diferenciais.tsx (Server Component, sem diretiva)
import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";

export function Diferenciais() {
  return (
    <section>
      <h2>Por que escolher a clínica</h2>
      <RevelarAoEntrar className="revelacao">
        <p>Atendimento em Pinheiros, com horário no mesmo dia.</p>
      </RevelarAoEntrar>
    </section>
  );
}
```
`RevelarAoEntrar` emite `data-revelado` depois de observar o viewport. O HTML começa visível e sem estilo; a página pode animar o atributo com CSS. Não oculte conteúdo como estilo inicial, para manter a seção acessível sem JavaScript.

## 5. Tailwind v4
Já vem configurado pelo `create-next-app`: `postcss.config.mjs` com `"@tailwindcss/postcss": {}` e `@import "tailwindcss";` no `app/globals.css`. **Não existe `tailwind.config.js`**: os tokens ficam no CSS.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-marca: #1f4d3a;
  --color-tinta: #14120f;
  --color-papel: #f6f3ee;
  --ease-saida: cubic-bezier(0.32, 0.72, 0, 1);
}

/* variáveis criadas pelo next/font: use @theme inline para referenciá-las */
@theme inline {
  --font-display: var(--font-display-next);
  --font-sans: var(--font-texto-next);
}
```
Isso gera `bg-marca`, `text-tinta`, `font-display`, `ease-saida`. Os variants `motion-safe:` e `motion-reduce:` condicionam animações CSS à preferência de movimento.

## 6. Fontes e imagens
**Fontes:** sempre `next/font`. O arquivo é hospedado no próprio domínio, sem requisição ao Google no navegador do visitante e sem salto de layout. Nunca `<link>` para o Google Fonts.
```tsx
// app/layout.tsx
import { Fraunces, Instrument_Sans } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display-next" });
const texto = Instrument_Sans({ subsets: ["latin"], variable: "--font-texto-next" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${texto.variable}`}>
      <body className="font-sans bg-papel text-tinta">{children}</body>
    </html>
  );
}
```
As fontes acima são só exemplo: a escolha vem do plano de design.

**Imagens:** sempre `next/image`.
- Imagem do hero (candidata a LCP): `preload` + `sizes`. **No Next 16, `priority` foi depreciado em favor de `preload`.**
- As outras já são lazy por padrão. Não adicione `preload` nelas.
- Imagem externa exige `images.remotePatterns` no `next.config.ts`.
```tsx
<Image src="/hero.webp" alt="Consultório com luz natural" width={1600} height={1067} preload sizes="(min-width: 1024px) 50vw, 100vw" />
```

## 7. Vercel
- Conecte o repositório no painel da Vercel (ou rode `npx vercel`). Cada branch gera um preview; a produção sai da branch principal.
- Variáveis de ambiente ficam no painel, separadas por ambiente. Prefixo `NEXT_PUBLIC_` só para valores feitos para serem públicos (ver `seguranca-web`).
- Previews ficam públicos e podem ser indexados: proteja-os ou use dados fictícios (ver `seguranca-web/references/segredos-e-deploy.md`).
- Para Core Web Vitals de usuários reais, ative o Speed Insights no painel do projeto.

## 8. Reduced motion e carregamento
Rede de segurança global para animações e transições **CSS** (já está no `app/globals.css` do template; não afeta GSAP nem Motion, que têm tratamento próprio em cada referência):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Não coloque `scroll-behavior: smooth` no `html`. Ele quebra o cálculo do ScrollTrigger ao redimensionar, e o Lenis já cuida da rolagem suave quando ativado.

## 9. Erros comuns
- `"use client"` no `layout.tsx` ou no `page.tsx` para usar um hook: tudo abaixo vira bundle de cliente. Extraia uma folha.
- Importar biblioteca de animação num Server Component: erro de build ou `window is not defined`.
- Copiar config do Tailwind v3 de tutorial antigo (`tailwind.config.js`, `@tailwind base;`). Na v4 é `@import "tailwindcss"` + `@theme`.
- `priority` no `next/image` (depreciado) ou imagem do hero sem `sizes`, que acaba baixando a versão maior no celular.
- Google Fonts por `<link>`: bloqueia a renderização e manda o IP do visitante ao Google.
