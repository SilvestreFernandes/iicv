# Design moderno sem cara de template

## Índice
1. Ponto de partida
2. Hero
3. Tipografia
4. Cor e superfície
5. Movimento
6. Texto da interface
7. Padrões genéricos a evitar
8. Piso de qualidade

## 1. Ponto de partida
O visual nasce do assunto. Uma clínica, uma oficina, uma confeitaria e um estúdio de software têm materiais, vocabulário e clima diferentes; use isso como fonte das escolhas. Pergunte: qual é a coisa mais característica deste negócio e como ela vira forma, cor ou tipo?

## 2. Hero
É a primeira coisa vista. Abra com o que é mais próprio do negócio: uma frase forte, uma foto real, uma demonstração, um número que importa. O combo "número grande + legenda pequena + gradiente" é o padrão de sempre; use só se for realmente o melhor para aquele caso. A ação principal (CTA) fica visível sem rolar no celular.

## 3. Tipografia
Carrega a personalidade da página. Uma família ou duas bem distintas. Escolha fontes de propósito, não as de sempre. Defina escala clara (ex.: 1.25 ou 1.333), linhas de até ~75 caracteres, entrelinha maior em texto serifado. Em Next.js, carregue com `next/font` (hospeda a fonte no próprio domínio, sem salto de layout); fora dele, hospede os arquivos no próprio domínio com `@font-face` e `font-display: swap`.

## 4. Cor e superfície
4–6 cores nomeadas em tokens CSS no `:root`, com versão escura via `prefers-color-scheme`. Hierarquia vem de tamanho, peso e espaço antes de vir de cor. Raio de borda e sombra variam conforme a importância do elemento, não um valor único para tudo.

## 5. Movimento
Um único momento orquestrado (a entrada do hero, por exemplo) vale mais que efeitos espalhados. Evite fade-in em toda seção e hover animado em todo card. Movimento que responde a uma ação do usuário (abrir, confirmar) é bem-vindo. Sempre respeite `prefers-reduced-motion`. Esta seção decide *o que* se move; *com qual biblioteca e como* está na skill `stack-web`.

## 6. Texto da interface
Escreva do ponto de vista de quem usa, em linguagem simples, voz ativa, frase normal (sem caixa alta em rótulos). O botão diz exatamente o que acontece: "Agendar consulta", não "Enviar". O rótulo nunca sugere algo grátis ou informal quando não é: se a consulta é paga, "Agendar consulta" está certo, "Conversar" ou "Bater um papo" induz o visitante a erro. O mesmo texto serve ao Google e às IAs: frases claras e específicas sobre o que o negócio faz, onde e para quem.

## 7. Padrões genéricos a evitar (a menos que o usuário peça)
- Fundo creme (#F4F1EA) + serifa de alto contraste + acento terracota.
- Fundo quase preto com um único acento verde-ácido ou vermelhão.
- Layout de jornal com filetes finos e cantos retos em tudo.
- Kit SaaS: tudo em cards arredondados idênticos com a mesma sombra cinza e gradientes decorativos.
- Rótulo em caixa alta espaçada acima de cada título; destaque de uma única palavra no título em outra cor/itálico; "→" no fim de todo botão; marcadores 01/02/03 em conteúdo que não é sequência.

Se o usuário pedir explicitamente um desses estilos, siga o pedido.

## 8. Piso de qualidade (sem anunciar)
Responsivo desde 360px, foco visível, contraste AA, alvos de toque ≥ 44px, `reduced-motion`, imagens com dimensões para evitar salto de layout. Antes de entregar, remova um enfeite que não serve ao objetivo.
