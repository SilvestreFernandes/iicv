# Fase 6 — Entrega

**Objetivo:** preview e feedback, lançamento autorizado e registro no portfólio. **Modelo:** Sonnet.

## Preview e feedback

1. Mantenha `SITE_INDEXAVEL` desligado. Modo 1: peça ao dev o push pelo GitHub Desktop; modos 2 e 3: siga o modo salvo, com autorização na permissão de push.
2. Na primeira publicação, guie a conexão do repositório à Vercel. Confira preview em 375 e 1440, `noindex` e PageSpeed Insights; registre URLs e resultados no ESTADO/REVISAO.
3. Prepare a mensagem ao cliente usando `modelos/mensagem-cliente.md`; o dev envia.
4. Ao receber feedback, guarde o original em `projeto/referencias/feedback-<rodada>.md`; crie `projeto/FEEDBACK.md` a partir de `modelos/FEEDBACK.md` na primeira rodada (nas seguintes, acrescente a seção da rodada) e reúna numa lista o que aplicar, discutir ou recusar. Peça decisão de uma vez para dúvidas e escopo novo; aplique o restante em lote, confira as áreas em 375/1440 e rode `npm run verificar`.
5. Só avance após o ok do cliente para publicar. Registre no ESTADO.

## Lançamento

Trava teste/pitch: não publique nem habilite indexação enquanto o ESTADO indicar dados fictícios. Só avance após confirmação dos dados reais, remover os rótulos de demonstração, revisar o site e atualizar o modo para `cliente real`.

1. Confirme domínio principal e titularidade do cliente; configure domínios e DNS na Vercel. Verifique HTTPS.
2. Configure `NEXT_PUBLIC_SITE_URL` e `SITE_INDEXAVEL=true` somente em produção; confira robots, sitemap, canonical, JSON-LD e tags Open Graph no domínio final.
3. Oriente Search Console e Google Business Profile; cliente fica como proprietário. Registre pendências que exigem acesso humano.
4. Prepare mensagem curta com domínio, acessos, repositório combinado e instruções. Atualize o README do site para remover instruções do template.

## Portfólio

1. Preencha `modelos/portfolio-entrada.md` em `projeto/portfolio-<slug>.md`, a partir de DIRECAO, stack, feedback e URL. Peça confirmação numa única mensagem para “o que funcionou” e “o que não repetir”.
2. Modo 1: gere link com `link-portfolio.mjs`; o dev publica pela conta `brandforgecontato-oss`. Modos 2 e 3: use worktree separado para adicionar a entrada em `portfolio/sites/<slug>.md`; confirme push pelas permissões. Se indisponível, deixe instruções e pendência.
3. Atualize ESTADO para encerrado e versione conforme o modo.

Mensagem final em até 5 linhas: datas, URL, rodadas de feedback e pendências do cliente.
