---
name: stack-web
description: Define a stack técnica de sites e landing pages e como usar cada biblioteca do jeito certo. A base é Next.js (App Router) + TypeScript + Tailwind CSS com deploy na Vercel, e há camadas opcionais ativadas por critério — movimento (GSAP + ScrollTrigger + SplitText, Lenis, Motion), 3D/WebGL (React Three Fiber + drei, Spline, sequência de imagens em canvas estilo Apple), transições (View Transitions) e microanimações (Rive, Lottie). Use sempre que for começar, estruturar ou montar o scaffold de um site, landing page, portfólio, página institucional ou de produto, e também quando o usuário pedir animação no scroll, rolagem suave, efeito "estilo Apple", 3D, transição entre páginas, ícone ou ilustração animada, ou perguntar "que tecnologia usar". Use mesmo que o pedido só fale em visual ou design, porque a escolha da stack decide performance, SEO e acessibilidade.
---

# Stack técnica para sites

Sites feitos com IA costumam errar a stack de dois jeitos: instalam tudo (GSAP, Three.js e Lottie numa landing de três seções) ou improvisam tudo (listener de scroll na mão, `useEffect` sem limpeza). Em geral o resultado é um hero invisível até o JavaScript rodar, animações que duplicam ao trocar de rota e 3D travando no celular. Esta skill fixa uma base única e trata cada camada extra como uma decisão com critério: animação custa kilobytes, bateria e acessibilidade, então só entra quando o conceito pede.

**Onde entra no fluxo:** no portão do `/comecar` (fase 3), a stack é decidida automaticamente a partir da direção escolhida e só informada ao dev; no início da construção (fase 4) os pacotes são ajustados. A base já vem pronta no template (Next.js + TS + Tailwind + GSAP/Lenis/Motion instalados sem uso); esta skill decide quais camadas ficam e remove o resto.

## Precedência entre skills

Esta é a tabela única de precedência do template. Quando duas skills discordam, vale a coluna "quem decide".

| Assunto | Quem decide | Exemplos de conflito resolvidos |
|---|---|---|
| Processo, ordem das fases, pontos de aprovação | `comecar` (orquestrador) | Nenhuma skill pula o portão de planejamento nem pede aprovação durante a execução autônoma |
| Estética (cor, fonte, layout, assinatura) | `projeto/DIRECAO.md` aprovado | Regras de estética das skills de design viram sugestão, nunca obrigação contra a direção aprovada |
| Stack, bibliotecas, código de animação, carregamento | **esta skill** | `gsap.context` + `useEffect` → `useGSAP`; `next/image priority` → `preload`; "nunca GSAP e Motion na mesma árvore" → "nunca no mesmo elemento"; hero nunca começa invisível, mesmo que outra skill peça que "nenhum elemento apareça estático"; Bootstrap, Astro ou outra base → Next.js do template |
| Segurança e dados pessoais | `seguranca-web` | — |
| SEO técnico | `site-moderno-seo` | — |

Conflitos específicos da `design-taste-frontend` (vendorizada, sem modificação):
- **Imagens:** `picsum.photos` e geração de imagem só como rascunho declarado, listado em `projeto/ESTADO.md` como pendência. O site publicado usa fotos reais do cliente ou banco de imagens com licença, baixadas para `public/`.
- **Dark mode:** só se a direção aprovada pedir. A regra "obrigatório para página de consumidor" não vale aqui.
- **Travessão (em-dash) proibido:** vale para a copy do site se a direção aprovar esse tom; em português o travessão é pontuação legítima, então a decisão é da copy (fase 2).
- **Design systems oficiais (Fluent, Material, Carbon…):** fora do escopo de sites deste template.

## Regras obrigatórias (valem para todas as camadas)

1. **O conteúdo principal vem no HTML servido.** Server Components por padrão. H1, texto do hero, CTA e imagem principal (LCP) são renderizados no servidor e ficam visíveis sem JavaScript. Nunca use `opacity: 0` ou `visibility: hidden` no CSS em conteúdo acima da dobra esperando a animação revelar. Rastreadores de IA não executam JS, e o LCP só conta quando o elemento aparece.
2. **`prefers-reduced-motion` é respeitado em toda camada** e testado de verdade (DevTools → Rendering → *Emulate CSS prefers-reduced-motion*). Com `reduce`: sem pin com scrub, sem parallax, sem rolagem suavizada, sem loops. O 3D vira pôster, e Rive e Lottie ficam parados num frame representativo. Fades curtos de opacidade continuam aceitáveis.
3. **O que é pesado carrega depois e falha sem quebrar.** 3D, Spline, Rive, Lottie e sequências de imagem entram por `next/dynamic` ou `import()`, sempre com pôster ou placeholder de tamanho reservado (sem CLS). A cena 3D fica dentro de um limite de erro: se o asset falhar, aparece o pôster, não uma página quebrada.
4. **`"use client"` só nas folhas.** O componente animado é uma folha pequena. `page.tsx`, `layout.tsx` e as seções continuam Server Components, e o texto entra na folha como `children`.
5. **Uma biblioteca por responsabilidade.** GSAP cuida de scroll e timelines, Motion de estado e interação de componente, CSS de hover e transições simples, View Transitions da troca de rota. Duas bibliotecas nunca animam o mesmo elemento.
6. **Limpeza sempre.** Toda animação, ScrollTrigger, instância de Lenis, cena 3D e player é destruída ao desmontar. O `useGSAP` faz isso sozinho; o resto vai no cleanup do efeito.
7. **Anime só `transform` e `opacity`** (e `filter` com parcimônia). Nunca `top`, `left`, `width` ou `height`.
8. **Confira a versão antes de instalar** (`npm view <pacote> version`). Versões conferidas em 25/09/2026: `next` 16.3.6, `react` 19.2.8 (a que o `create-next-app` fixa; a 19.3 existe, não troque à mão), `tailwindcss` 4.3.3, `gsap` 3.15.0, `@gsap/react` 2.1.2, `lenis` 1.3.26, `motion` 13.4.4. Se a API mudou, vale a documentação oficial; para o Next, a documentação da versão instalada está em `node_modules/next/dist/docs/` (ver `AGENTS.md`).

## Fluxo de trabalho

1. **Ler o conceito aprovado:** tipo de projeto, o elemento memorável do design, `MOTION_INTENSITY` (se a `design-taste-frontend` definiu), público e dispositivo principal.
2. **Escolher as camadas** pelas tabelas abaixo e registrar a decisão em `projeto/ESTADO.md` (seção "Stack"), uma linha por camada, com o motivo. Exemplo: "Movimento: GSAP, porque a seção de processo fica pinada com 4 passos; Lenis: não, página curta." Não peça aprovação: a decisão aparece no resumo do portão.
3. **Ajustar o scaffold do template:** remova os pacotes das camadas não escolhidas (`npm uninstall lenis`, por exemplo) e instale as camadas extras aprovadas (3D, Rive, Lottie). Detalhes da base em `references/base-next-tailwind.md`.
4. **Ativar cada camada pela referência dela**, copiando os modelos de `assets/`. O hero sai completo primeiro, já com a assinatura e as animações dele; as demais animações entram no fim da construção (fase 4), depois das seções prontas.
5. **Rodar a checagem final** antes de dizer que está pronto.

## Peças invisíveis do scaffold

Use a lógica pronta; cor, tipografia, dimensões e composição vêm do projeto. A página inicial permanece vazia até a fase de construção.

| Peça | Use quando | Comportamento |
|---|---|---|
| `VideoComPoster` | A direção aprovada pede vídeo ambiente em loop | Poster aparece no HTML; fontes MP4/WebM só entram perto do viewport e com movimento permitido. Passe dimensões, `alt` e classes do projeto. |
| `RolagemSequencia` | Um produto ou objeto precisa avançar por quadros com a rolagem | Primeiro quadro é o poster; GSAP e quadros restantes carregam perto do viewport. Com `reduce`, fica no poster. |
| `ProvidersMovimento` + Lenis | Lenis foi escolhido porque há pin/scrub que se beneficia de rolagem suave | Ative só com `rolagemSuave`; o código de Lenis e GSAP carrega dinamicamente. `configurarMotion` é opcional. |
| `lib/gsap.ts` / `useGSAP` | A direção usa GSAP ou ScrollTrigger | Registro único; importe só em folhas Client Components e use `useGSAP` com `scope`. |
| `RevelarAoEntrar` | Seções abaixo da dobra precisam sinalizar entrada no viewport | Emite `data-revelado`; conteúdo já começa visível. A página escolhe a animação sem ocultá-lo quando não há JS. |
| `LinkWhatsApp` | O briefing contém WhatsApp real | Normaliza o número de `lib/site.ts`; não renderiza sem número. |
| `FormularioContato` | O briefing aprovou coleta de contato | Server Action valida os campos; conecte um provedor de envio antes de publicar. |
| `JsonLdNegocio` | Há dados aprovados em `lib/site.ts` | Gera JSON-LD sem preencher campos ausentes. |

Os wrappers recebem classes do projeto, mas não trazem paleta, fonte ou estilos de layout. Mídia pesada e código de movimento só carregam quando a peça é usada; sequência e vídeo também esperam o viewport e não ativam movimento com `prefers-reduced-motion: reduce`.

## Camadas: quando ativar

| Camada | Ativar quando | Não ativar quando |
|---|---|---|
| **Base:** Next.js + TS + Tailwind v4 + Vercel | Sempre em projeto novo | Projeto existente em outra stack que funciona: não migre sem pedido, aplique as regras acima na stack que existe |
| **GSAP + ScrollTrigger** | Narrativa ligada à rolagem: pin, scrub, sequência, scroll horizontal | O efeito é só "aparecer ao entrar na tela" (Motion `whileInView` ou CSS resolvem) |
| **SplitText** | Tipografia animada é o elemento memorável (títulos de seção, manifesto) | Texto corrido; mais de 2–3 títulos animados por página |
| **Lenis** | Já existe ScrollTrigger com scrub ou pin e o conceito pede rolagem contínua | Página curta, muito formulário, scroll interno (modais, listas), interface com cara de app |
| **Motion** | Microinterações de componente: hover físico, abrir e fechar, `layout`, `AnimatePresence`, entrada simples | Scroll narrativo complexo (GSAP) ou hover que o CSS resolve |
| **R3F + drei** | O 3D é o conceito: produto manipulável, cena interativa | 3D decorativo; público com celular de entrada |
| **Spline** | Cena simples feita por designer, sem lógica própria | Cena que exige controle fino ou performance crítica |
| **Sequência em canvas** | "Estilo Apple": produto girando ou se abrindo conforme a rolagem, com frames renderizados antes | O usuário precisa controlar a câmera livremente |
| **View Transitions** | Várias páginas com continuidade visual (lista → detalhe, portfólio → case) | Landing de página única |
| **Rive** | Ícone ou ilustração interativa, com estados (hover, clique, progresso) | Animação linear simples |
| **Lottie** | Animação linear vinda do After Effects (sucesso do formulário, ilustração, loader) | Precisa reagir a input com estados (use Rive) |

## Decisão rápida por tipo de projeto

A base entra sempre. As colunas mostram só as camadas extras.

| Tipo de projeto | Movimento | 3D / WebGL | Transições | Microanimações |
|---|---|---|---|---|
| Landing de conversão (trilha A) | Motion; GSAP + ScrollTrigger em 1–2 momentos (hero, processo); Lenis só se houver scrub | Não (sequência em canvas só se o produto físico for o herói) | Não | Lottie ou Rive pontual (confirmação do formulário) |
| Landing de lançamento / premium | GSAP + ScrollTrigger + SplitText + Lenis + Motion | Sequência em canvas ou Spline, se o conceito pedir | Não | Rive |
| Portfólio / estúdio | GSAP + SplitText + Lenis + Motion | Opcional: R3F, se for a assinatura do estúdio | Sim (lista → case) | Opcional |
| Site institucional (trilha B) | Motion leve + CSS | Não | Sim, se houver várias páginas com continuidade | Lottie pontual, se houver |
| Página de produto com 3D | GSAP + ScrollTrigger + Lenis + Motion | R3F + drei (interativo) ou sequência em canvas (só narrativa) | Opcional | Opcional |
| Redesign (trilha C) | Mantenha a stack existente se ela funciona; aplique a linha do tipo de site correspondente | Idem | Idem | Idem |
| App-like / dashboard (trilha D) | Só Motion. Sem Lenis nem pin | Não | Opcional | Rive pontual |


## Referências

- `references/base-next-tailwind.md`: scaffold, fronteira Server/Client, `next/font`, `next/image`, Tailwind v4, Vercel.
- `references/movimento-gsap-lenis.md`: GSAP, ScrollTrigger, SplitText, `useGSAP`, `matchMedia`, integração com Lenis.
- `references/gsap-oficial/`: skills oficiais da GreenSock (`gsap-react`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-performance`) para detalhes de API. Leia só com a camada GSAP aprovada. Onde elas dizem "recomende GSAP para qualquer animação", vale a tabela de camadas desta skill.
- `references/react-vercel/`: recorte das regras de performance React/Next da Vercel que importam para sites. Use na fase 5 (revisão).
- `references/movimento-motion.md`: Motion para microinterações, `MotionConfig`, `LazyMotion`, convivência com o GSAP.
- `references/3d-webgl.md`: React Three Fiber + drei, Spline, sequência de imagens em canvas.
- `references/transicoes.md`: View Transitions com o `<ViewTransition>` do React no App Router.
- `references/assets-animados.md`: Rive × Lottie.
- `assets/gsap-registro.ts`: registro único dos plugins (vira `lib/gsap.ts`).
- `assets/providers-movimento.tsx`: folha do Lenis, carregada dinamicamente por `app/providers-movimento.tsx`.
- `assets/usar-menos-movimento.ts`: hook de `prefers-reduced-motion` sem depender de biblioteca.

## Checagem final (antes de dizer que está pronto)

- [ ] Com JavaScript desativado, o hero (H1, texto, CTA, imagem) aparece inteiro
- [ ] Com `prefers-reduced-motion: reduce` emulado: nada pinado com scrub, nenhum parallax nem loop, todo o conteúdo acessível
- [ ] As camadas instaladas batem com a decisão registrada; nenhum pacote instalado sem uso
- [ ] Nenhum `"use client"` em `page.tsx` ou `layout.tsx` só por causa de animação
- [ ] 3D, Spline, Rive e Lottie carregados via import dinâmico, com placeholder de tamanho reservado
- [ ] Ir para outra rota e voltar não duplica animações nem deixa pin quebrado; nenhum `markers: true` esquecido
- [ ] Rolagem testada em celular real ou com CPU 4× mais lenta no DevTools, sem travar
- [ ] LCP, CLS e INP medidos (Lighthouse ou PageSpeed Insights), não estimados

## Limites desta skill

Não escolhe estética (isso é da direção visual) nem garante nota de Lighthouse sozinha. Meça antes de afirmar. SEO técnico (metadata, sitemap, JSON-LD) fica com a `site-moderno-seo`; segredos, variáveis de ambiente e headers ficam com a `seguranca-web`.
