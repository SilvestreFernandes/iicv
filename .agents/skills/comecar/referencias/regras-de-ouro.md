# Regras de ouro

Valem para qualquer site feito com este template. Carregadas na fase 4 (execução autônoma). A estrutura de seções de cada trilha está em `trilhas.md`.

## Qualidade visual
- Hierarquia clara: título > subtítulo > corpo
- Espaçamento consistente, numa escala fixa definida em `projeto/DIRECAO.md`
- No máximo 3 fontes (display, corpo, destaque); o normal é 1 ou 2
- Paleta de 3–4 cores principais mais neutros
- Uma única interação-assinatura; o resto fica quieto
- Antes de entregar, tire um enfeite que não serve ao objetivo

## Responsividade
- Mobile-first
- Conferir em 375px e 1440px nos marcos da construção (hero e fim) e em 375, 768 e 1920px na revisão
- Alvos de toque com no mínimo 44–48px
- Sem scroll horizontal
- Imagens responsivas (`next/image` com `sizes`)

## Conversão e CTA
- CTA principal visível acima da dobra, inclusive no celular
- Copy direta: uma frase, uma ideia; o botão diz o que acontece ("Agendar horário", não "Enviar")
- Uma intenção, um rótulo: não misturar "Fale conosco" e "Entre em contato" na mesma página
- Prova social quando houver, respeitando as restrições de nicho regulado
- Formulários curtos, no máximo 5 campos

## Performance
- Imagens otimizadas (`next/image`, WebP/AVIF), lazy abaixo da dobra, `preload` só no hero
- JS só o necessário; o pesado (3D, mapas, players) carrega sob demanda
- Animação nunca esconde o conteúdo principal: hero visível sem JavaScript, `prefers-reduced-motion` respeitado (skill `stack-web`)
- Lighthouse 85+ é meta, não promessa: meça de verdade antes de declarar

## Acessibilidade
- Contraste mínimo WCAG AA (4,5:1 texto, 3:1 elementos gráficos e texto grande), inclusive texto sobre foto
- Alt text em toda imagem de conteúdo
- Label em todo campo de formulário
- Navegação completa por teclado, com foco visível
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`), um H1 por página

## Conteúdo
- Nada inventado: nome, número, depoimento, avaliação, prêmio e foto de equipe vêm do cliente ou ficam como pendência
- Imagem provisória (banco de imagens, gerada ou `picsum`) é rascunho declarado, listado em `projeto/ESTADO.md`, e sai antes da publicação ou é substituída por imagem com licença baixada para `public/`
- Nada de promessa que o site não controla ("vai dobrar seus clientes")

## Código
- Nomes descritivos, componentes por seção em `components/secoes/`
- Server Components por padrão; `"use client"` só nas folhas animadas
- Dados do negócio só em `lib/site.ts`
- Stack e animação: skill `stack-web`

## Segurança (sempre que houver formulário, login, banco ou pagamento)
- Segredo nunca vai para o navegador: variável de ambiente lida no servidor
- Servidor confere autorização por registro, não só se o usuário está logado
- Banco exposto ao cliente (Supabase/Firebase) com política por tabela
- Aplique as regras de ouro da skill `seguranca-web` enquanto escreve o código

## Notas por trilha
- **C (redesign):** preserve URLs, rótulos de navegação, nomes de campos de formulário e IDs usados por analytics. Não prometa que tráfego ou conversão vão melhorar: isso só se sabe medindo depois.
- **D (app-like):** tipografia base 16px ou maior, alvos de toque de 48px, nada que dependa de hover.
- **E (pitch):** ver `pitch-local.md`.
