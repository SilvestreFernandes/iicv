# PLANO V2: template_sites

Salvo no bloco 0. Fonte: prompts-v2.md.

## Resultado do teste real (site-teste, advocacia fictícia)

- O site saiu correto, mas simples e sem graça. As 3 direções da fase 3 vieram todas contidas (a OAB foi lida como "visual contido"), e a prancha estática não mostrou como o site seria navegando.

- Perguntas demais, uma por vez; aprovação a cada seção; o Claude explicava cada mínima coisa.

- Fricções: PowerShell bloqueando npm (ExecutionPolicy), projeto dentro do OneDrive, ECONNRESET no npm install, trabalho feito no notebook sem push antes de trocar para o PC, sessão rodando no Haiku sem aviso.

## PLANO V2

Princípio geral: terminar cada site o mais rápido possível, mantendo qualidade alta. Não existe prazo fixo.

### Fluxo

- 22. Duas metades. PLANEJAMENTO com o dev presente (ambiente, briefing, nicho, pacote criativo, stack) → PORTÃO: checklist do pacote de planejamento; se faltar algo, pergunta tudo de uma vez; um único "pode construir" → EXECUÇÃO AUTÔNOMA (construção + revisão) sem perguntas: dúvidas viram decisões registradas em projeto/DECISOES.md; dev server sobe no início e o Claude informa o localhost e o endereço na rede local (para abrir no celular); ESTADO.md mostra o progresso; relatório final → REFINAMENTO LIVRE com prompts do dev → ENTREGA (preview, feedback do cliente, lançamento, portfólio).

- 23. Menos perguntas e portões: o Claude PROPÕE e o dev confirma ou corrige; perguntas que faltam vão todas de uma vez (sai "uma pergunta por vez"). Briefing + nicho numa etapa só (o nicho só pergunta se for regulado). Direção + copy + plano de mídia \= um "pacote criativo" aprovado de uma vez. Stack decidida automaticamente, só informada. Fase de ambiente silenciosa (só fala se houver problema). Verificações só nos marcos (fim do hero e fim da construção); Lighthouse só na revisão final. Skills mais enxutas.

- 20. Sai a pergunta de prazo (urgente/normal/tranquilo). Velocidade é o padrão.

- 19. Na primeira execução do projeto, perguntar como versionar: (1) dev pelo GitHub Desktop: o Claude nunca faz commit/push e, no fim de cada etapa, avisa "hora de commitar" com resumo e descrição prontos; (2) Claude faz commit local, push só com ok; (3) Claude faz commit e push. A escolha fica salva no ESTADO.md. No modo 1, a execução autônoma usa os pontos de restauração do Claude Code em vez de commits.

- 26. Comunicação enxuta: não narrar antes de agir; progresso só nos marcos, em uma linha; fim de etapa em no máximo 5 linhas; explicar só quando precisa de decisão ou quando fugiu do plano; não resumir arquivos; perguntas diretas com opções. Output style do projeto ligado por padrão. Remover das skills as instruções que incentivam explicações longas.

### Design

- 1. Pergunta de ambição visual no briefing (discreto / marcante / uau), com exemplos da lista de referências.

- 2. Regra explícita: nicho regulado limita o que se DIZ, não o visual.

- 3. As 3 direções variam em ousadia, e pelo menos uma é realmente "uau".

- 4. A prancha de cada direção mostra a composição do hero em alta fidelidade (com quadro de referência da mídia), não paleta + wireframe.

- 5. Na construção, o hero completo (com assinatura e animações) é feito primeiro; o Claude avisa "hero pronto no localhost" e segue sem esperar aprovação.

- 6. Autocrítica obrigatória: comparar o construído com a direção e a prancha e corrigir o que ficou tímido (feita pelo subagente revisor).

- 25. Única fonte de referência visual: referencias/sites.md (já existe, curada pelos sócios), mais as referências que o cliente mandar e o portfólio. Proibido buscar inspiração em blogs, artigos, galerias ou sites fora da lista. Seguir as regras de uso do topo do arquivo (referência principal por nicho é obrigatória numa direção; análise com Playwright; preencher "Técnica: a analisar" na primeira vez; nunca copiar).

### Mídia

- 21. Plano de mídia no pacote criativo: cada direção traz ideias de vídeo/imagem (hero em loop, vídeo guiado por rolagem, macros de produto, texturas, transições). O dev escolhe; o Claude escreve projeto/MIDIA.md com, para cada mídia: prompt pronto para o Google Flow (vídeo ou imagem), especificações (proporção 16:9 e 9:16, duração, loop, movimento de câmera, sem texto), caminho exato onde salvar (ex.: public/media/hero/hero-desktop.mp4) e status (pendente/recebida/processada). Todos os prompts de um site compartilham um "bloco de estilo" para manter consistência. Mídia do cliente entra no mesmo arquivo (o que aproveitar, como tratar, onde usar). Enquanto o dev gera as mídias, a construção segue com espaços reservados do tamanho certo. Em nicho regulado, IA não pode gerar algo que pareça resultado real, equipe real ou espaço real (só textura, atmosfera, objetos). Substitui a antiga "estratégia de imagem".

### Subagentes (.claude/agents/)

- 24. Quatro subagentes com território definido, acionados na execução autônoma:

  - processador-de-midia: só public/media/ e MIDIA.md. Comprime, gera mp4 + webm, poster, sequência de quadros para scroll, atualiza o status.

  - seo-e-dados: só lib/site.ts e os arquivos de SEO. Preenche metadata, JSON-LD, sitemap e OG a partir do BRIEF.

  - revisor (só leitura): screenshots 375/1440, acessibilidade, fidelidade à direção e à prancha; devolve lista de problemas.

  - seguranca (só leitura): usa a skill seguranca-web; roda no fim e sempre que surgir formulário, API, login ou script de terceiros; verifica segredos, headers/CSP, formulários (validação no servidor, LGPD), scripts de terceiros, npm audit e indexação; peso proporcional ao site; relatório com gravidade.

  - Nunca dois agentes no mesmo arquivo. Seções do site continuam com o agente principal, em sequência.

### Código

- 23b. Peças prontas invisíveis no scaffold (lógica sem visual, estilizada por projeto): vídeo com poster e formatos, animação por rolagem com sequência de imagens, provider do Lenis, setup do GSAP (useGSAP), revelação ao entrar na tela, link de WhatsApp, formulário com validação no servidor, JsonLd. Tudo respeitando prefers-reduced-motion.

### Ambiente

- 8. Detectar bloqueio de scripts do PowerShell (ExecutionPolicy) e orientar.

- 9. Detectar projeto dentro do OneDrive e alertar.

- 10. .npmrc no projeto com mais tentativas e timeouts de rede.

- 11. Ao retomar ("vamos continuar"), checar commits sem push/pull e avisar antes de seguir (adaptado ao modo de versionamento).

- 12. Avisar se o modelo da sessão não é o recomendado para a etapa (ex.: Haiku no planejamento).

- 13. Oferecer o Remote Control para acompanhar e responder pelo celular.

### Codex

- 14. .claude/skills é a fonte única; script npm run skills:sync copia para .agents/skills (versionado); npm run verificar falha se estiverem diferentes. Sem link simbólico.

- 15. AGENTS.md espelha o fluxo para o Codex ($comecar, mesmas regras); nas skills, alternativa neutra onde houver recurso só do Claude Code (pergunta em texto com opções numeradas).

- 16. Tabela no README: planejamento no Claude Code; entrega, ambiente e ajustes pontuais podem ir no Codex.

### Cliente

- 17. Questionário do cliente pronto para WhatsApp em modelos/ (objetivo, público, diferenciais com exemplo concreto, ação principal, visual e referências, fotos, produtos/preços, avaliações, dados de contato, domínio, conselho de classe). A etapa de briefing oferece enviar antes e aceita as respostas coladas.

- 18. Modo teste/pitch: dados fictícios marcados como fictícios e lançamento bloqueado.

### Travas (não saem nunca)

Checagem de nicho regulado · portão de planejamento · npm run verificar final · relatório de segurança sem item crítico.
