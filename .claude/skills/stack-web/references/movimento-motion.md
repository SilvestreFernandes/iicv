# Movimento: Motion (antigo Framer Motion)

Versão de referência (conferida em 25/09/2026): `motion` 13.4.4. Fonte: motion.dev/docs.

## 1. Quando usar
- **Usar:** microinterações de componente React. Hover e toque com física (`whileHover`, `whileTap`), abrir e fechar (menu, acordeão, modal) com `AnimatePresence`, mudança de layout (`layout`, `layoutId`), entrada simples ao aparecer na tela (`whileInView`), valores contínuos (`useMotionValue`, `useScroll`) sem re-render.
- **Não usar:** scroll narrativo com pin ou scrub (é do GSAP), hover simples de cor ou sombra (CSS basta), troca de rota com continuidade de elemento (é das View Transitions).

## 2. Instalação e configuração
```bash
npm i motion
```
- Import em Client Components: `import { motion } from "motion/react"`. O pacote `framer-motion` ainda funciona como alias legado; em código novo use `motion/react`.
- Num Server Component que só precisa de um `motion.div` sem hooks, `import * as motion from "motion/react-client"` evita criar um arquivo client separado.
- **`MotionConfig reducedMotion="user"`** no provider global (`assets/providers-movimento.tsx`): com a preferência de reduzir movimento ativa, desliga as animações de `transform` e `layout` e mantém `opacity` e cor. É a base; casos específicos usam `useReducedMotion()`.
- **Bundle:** o componente `motion` completo pesa cerca de 34 kB. Numa landing de conversão, use `LazyMotion` + `m` (cerca de 4,6 kB iniciais), com `strict` para impedir que um `motion.div` escape e traga o pacote inteiro de volta:
```tsx
"use client";
import { LazyMotion, domAnimation } from "motion/react";
import * as m from "motion/react-m";

export function CartaoPlano({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.article whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
        {children}
      </m.article>
    </LazyMotion>
  );
}
```
`domAnimation` cobre animações, variants, exit e gestos de hover, tap e foco. Se precisar de `drag` ou `layout`, troque por `domMax`.

## 3. Snippet de referência: menu com AnimatePresence
```tsx
"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function MenuMobile({ aberto, children }: { aberto: boolean; children: React.ReactNode }) {
  const reduz = useReducedMotion();
  return (
    <AnimatePresence>
      {aberto && (
        <motion.nav
          key="menu"
          initial={{ opacity: 0, y: reduz ? 0 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduz ? 0 : -12 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
```

## 4. Convivência com o GSAP
A `design-taste-frontend` proíbe misturar GSAP e Motion "na mesma árvore". Aqui a regra prática é mais precisa: **nunca os dois no mesmo elemento ou na mesma propriedade**. O GSAP é dono das seções de scroll (componentes próprios); o Motion é dono de botões, cartões, menus e modais. Um botão com `whileHover` dentro de uma seção pinada pelo GSAP não tem problema, porque cada biblioteca mexe num elemento diferente.

Com Lenis ativo, `useScroll` do Motion continua funcionando: o Lenis rola o documento nativo.

## 5. Reduced motion e carregamento
- `MotionConfig reducedMotion="user"` no topo, e `useReducedMotion()` onde a versão reduzida precisa ser diferente (trocar deslocamento por só opacidade, parar loops, desligar parallax).
- `initial` é aplicado no HTML renderizado no servidor. Por isso **nunca** coloque `initial={{ opacity: 0 }}` em conteúdo acima da dobra: o hero ficaria invisível até a hidratação. No hero, anime só elementos secundários ou comece de um estado visível.
- Loops infinitos (pulso, flutuação) só com propósito, e sempre parados com `reduce`.

## 6. Erros comuns
- `useState` para posição do mouse ou progresso do scroll: re-renderiza a cada frame. Use `useMotionValue` e `useTransform`.
- `"use client"` numa seção inteira só para um botão com hover: extraia o botão.
- `layout` em tudo "por garantia": cada `layout` mede o DOM. Use só onde o layout muda de verdade.
- `staggerChildren` com pai e filhos em componentes client diferentes: as variants precisam estar na mesma árvore client.
- Importar de `framer-motion` e de `motion/react` no mesmo projeto: duas cópias no bundle.
