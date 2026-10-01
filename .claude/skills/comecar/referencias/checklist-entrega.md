# Checklist de entrega

Percorrido na fase 4 (execução autônoma), item a item. Para cada item, registre em `projeto/REVISAO.md` um destes status:

- **ok** — verificado agora, com a evidência (comando e saída, screenshot, arquivo:linha)
- **corrigido** — estava errado, foi corrigido e verificado de novo
- **pendente humano** — não dá para checar daqui (precisa do cliente, de um celular real, de um painel externo). Diga quem resolve.

Nada é marcado ok sem verificação feita nesta revisão (skill `verification-before-completion`).

## Visual
- [ ] Hierarquia clara (título, subtítulo, corpo)
- [ ] Tipografia e paleta iguais às de `projeto/DIRECAO.md`
- [ ] Espaçamento uniforme, na escala definida
- [ ] A interação-assinatura aprovada existe e funciona
- [ ] CTA principal visível acima da dobra, em desktop e mobile

## Responsividade
- [ ] Screenshots em 375px, 768px e 1920px sem quebra
- [ ] Sem scroll horizontal
- [ ] Alvos de toque com no mínimo 44–48px
- [ ] Imagens responsivas (`sizes` corretos)

## Performance
- [ ] Imagens otimizadas; lazy abaixo da dobra; `preload` só no hero
- [ ] Lighthouse (ou PageSpeed Insights) medido de verdade, com os números registrados — não estimado
- [ ] Nenhum pacote instalado sem uso (camadas não escolhidas foram removidas no início da construção)
- [ ] Com JavaScript desativado, o hero (H1, texto, CTA, imagem) aparece inteiro
- [ ] 3D, Spline, Rive e Lottie carregados sob demanda, com placeholder de tamanho reservado; um asset que falha não derruba a página
- [ ] Navegar para outra rota e voltar não duplica animações nem quebra seções pinadas

## Acessibilidade
- [ ] Contraste WCAG AA, inclusive texto sobre foto
- [ ] Alt text em toda imagem de conteúdo
- [ ] Label em todo campo de formulário
- [ ] Tab percorre a página em ordem lógica, com foco visível
- [ ] HTML semântico, um H1 por página
- [ ] Testado com `prefers-reduced-motion: reduce` emulado: sem rolagem sequestrada, parallax nem loop

## SEO
- [ ] `lib/site.ts` preenchido só com dados reais
- [ ] Title e description em cada página
- [ ] H1 único por página; URLs legíveis
- [ ] Negócio com endereço: NAP idêntico no site, no Google Business Profile e nas redes; JSON-LD com o subtipo certo
- [ ] `/sitemap.xml` lista as páginas reais; `/robots.txt` bloqueado antes do lançamento e liberado depois (`SITE_INDEXAVEL=true` só em produção)
- [ ] Imagem Open Graph 1200×630 criada
- [ ] Decisão consciente sobre rastreadores de IA registrada em `app/robots.ts`
- [ ] (fase 6) Link colado no WhatsApp mostra imagem e título
- [ ] (fase 6) `site:dominio.com.br` testado e sitemap enviado no Google Search Console

## Segurança (se houver formulário, login, banco ou pagamento)
- [ ] Nenhum segredo no frontend, no repositório ou no histórico do git (`bash .claude/skills/seguranca-web/scripts/scan_segredos.sh`)
- [ ] RLS/regras ativas em todas as tabelas e buckets (Supabase/Firebase)
- [ ] Toda rota de API confere autenticação **e** permissão sobre o recurso
- [ ] Entradas validadas no servidor; consultas parametrizadas; HTML sanitizado
- [ ] Headers de segurança ativos e CSP completada para o que o site carrega
- [ ] Rate limit e proteção anti-spam em formulário
- [ ] `npm audit` sem vulnerabilidade crítica
- [ ] Dados pessoais mínimos, com política de privacidade e base legal (LGPD)

## Conformidade de nicho regulado
- [ ] Copy revisada contra as regras de `projeto/BRIEF.md`, seção 2 (preço, promessa, depoimento, antes/depois)
- [ ] Registro profissional exibido, se o conselho exigir
- [ ] Cliente confirmou a copy final — confirmação do cliente, nunca assumida

## Conteúdo e dados
- [ ] Nenhuma imagem provisória (banco, gerada, `picsum`) sem licença ou sem aprovação
- [ ] Nenhum dado inventado (nome, número, depoimento, avaliação)
- [ ] Todos os dados da seção 3 do `projeto/BRIEF.md` recebidos, ou a ausência resolvida com o cliente

## Código
- [ ] `npm run verificar` (lint + build) passa sem erro
- [ ] Sem placeholder, TODO ou `markers: true` esquecido
- [ ] Componentes com nomes descritivos; sem lógica duplicada óbvia

## Entrega (fase 6)
- [ ] Domínio e HTTPS configurados; uma única versão do domínio (com ou sem www)
- [ ] Acessos entregues ao cliente (Vercel ou hospedagem, DNS, Google Business Profile, redes)
