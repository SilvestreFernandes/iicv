# Fase 4 — Execução autônoma

**Objetivo:** construir, revisar e entregar um relatório verificável sem interromper o dev. **Modelo:** Sonnet. Inicia apenas após o portão “pode construir” registrado na fase 3.

Leia `projeto/DIRECAO.md`, `projeto/COPY.md`, `projeto/MIDIA.md`, a stack e o modo de versionamento em `projeto/ESTADO.md`, `referencias/regras-de-ouro.md`, `referencias/revisao-playwright.md` e `referencias/checklist-entrega.md`. Carregue `stack-web` (camadas escolhidas), `site-moderno-seo`, `responsive-design`, `web-design-guidelines` e `verification-before-completion`; carregue `seguranca-web` quando houver dados ou integrações. Decisões autônomas e instruções para retomada ficam em `projeto/DECISOES.md`.

## Construção

1. Crie `projeto/DECISOES.md` a partir de `modelos/DECISOES.md`; registre cada decisão autônoma, motivo e como reverter.
2. No modo 1, crie marco `inicio-construcao`. Ajuste dependências às camadas aprovadas e use `npm view` antes de instalar extras.
3. **No início da construção**, suba `npm run dev` em segundo plano, aguarde ficar pronto e rode `node .claude/skills/comecar/scripts/enderecos.mjs`. Informe em uma linha a URL localhost e a URL de rede local. Mantenha o servidor ativo.
4. No início da fase, acione `seo-e-dados` com BRIEF/COPY aprovados e páginas/slugs planejados. Ele preenche apenas o próprio território. Confira cada valor contra o briefing e aplique a devolutiva antes de fechar metadados ou páginas. Acione de novo somente se mudarem dados aprovados ou páginas.
5. Construa primeiro o hero completo (layout, mídia ou espaço reservado conforme `MIDIA.md`, assinatura e animações). Confira em 375×812 e 1440×900 contra a prancha; respeite movimento reduzido e conteúdo sem JS. Avise que o hero está pronto com as duas URLs e continue sem esperar resposta ou aprovação.
6. Construa as demais seções na ordem de `COPY.md`, com texto exato. Preencha `lib/site.ts` só com dados reais; deixe ausências em branco e registre pendências. Integre metadata por página, favicon/ícones, motion e o scaffold selecionado.
7. Quando mídia nova chegar, rode `node .claude/skills/comecar/scripts/receber-midia.mjs` para copiar de Downloads e gerar a folha de contato; confira contra o checklist de mídia IA (`fases/02-pacote-criativo.md`) antes de processar. Quando um item pendente puder ser processado, acione `processador-de-midia` com arquivo, uso aprovado, item do `MIDIA.md` e requisitos de saída. Ele atua só em `public/media/**` e `projeto/MIDIA.md`, usando o wrapper Node com `ffmpeg-static` para que FFmpeg funcione no Windows sem instalação manual. Confira formatos/tamanhos e a devolutiva; faça você a integração no site. Não substitua placeholder enquanto o arquivo não estiver aprovado e pronto.
8. Atualize ESTADO nos marcos. Modo 1: marcos `hero` e `construcao`; modos 2 e 3: commits nos marcos conforme ESTADO. Push segue as autorizações/permissões do modo; nunca force push.

## Revisão autônoma

Crie `projeto/REVISAO.md` a partir de `modelos/REVISAO.md`. Registre evidências por item (`ok`, `corrigido`, `pendente humano`), corrija defeitos reais no escopo principal e anote decisões em `DECISOES.md`.

1. Com o servidor ativo, acione `revisor` (só leitura) com DIRECAO, COPY, MIDIA, prancha, URLs e páginas. O relatório usa gravidade fixa; trate cada achado e registre sua resolução. Se alterar interface, capture novamente os viewports afetados e peça nova revisão.
2. Rode `npm run verificar` (trava) e revise componentes com Web Interface Guidelines.
3. Faça revisão Playwright das imagens, overflow, H1, alt, labels, console, teclado, alvos de toque, movimento reduzido e hero sem JS; capture 375, 768 e 1920.
4. Confira práticas React/Next em `stack-web/references/react-vercel/` e o checklist de entrega.
5. Rode Lighthouse na revisão final; investigue performance abaixo de 85 antes de alterar.
6. Acione `seguranca` (só leitura) no fim para todo site e imediatamente após adicionar ou mudar formulário, API route, login, pagamento ou script externo. Informe rotas, integrações e configurações; leia o relatório fixo e registre em REVISAO/RELATORIO. Corrija no agente principal e solicite novo relatório após mudanças de segurança.
7. **Trava de segurança:** qualquer item `crítica` no relatório impede declarar o site pronto, concluir a fase 4 ou entregar. Corrija e rode a auditoria de novo; só prossiga quando o relatório atualizado não tiver item crítico. Mantenha achados não críticos e verificações não feitas como pendências explícitas.
8. Marque o que não pôde ser verificado como pendência humana com responsável; não converta ausência de evidência em aprovação.

## Fechar

Crie `projeto/RELATORIO.md` a partir de `modelos/RELATORIO.md`, incluindo URLs local/rede local, páginas/seções, assinatura, stack, resultados e evidências, decisões autônomas, relatórios do revisor e de segurança, pendências e provisórios. Confira que não há trava crítica de segurança. Atualize ESTADO e versione conforme o modo. Mensagem final em até 5 linhas com URLs e caminho do relatório; convide o dev ao refinamento. Mantenha o servidor ativo.
