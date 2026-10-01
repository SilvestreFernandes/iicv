# Trilha E: pitch para negócio local

Demonstração especulativa para um negócio que ainda não é cliente. Aplique o pacote de regras de `referencias/modo-demonstracao.md` (aviso fixo, `noindex`, formulário só no navegador, e-mail `example.com`, sem schema de negócio) além dos ajustes abaixo; a trava de lançamento permanece até converter para cliente real. Mesmas fases do `/comecar`. Ideias aproveitadas da skill `local-business-rebuild` (lotfb86), reescritas para a stack e o fluxo deste template.

## O que muda em cada fase

**Fase 1 (briefing e nicho), sem entrevista com o dono.** A fonte são dados públicos, fornecidos por você ou lidos com sua autorização: site atual, perfil no Google (endereço, horário, fotos, avaliações), Instagram, cardápio ou lista de serviços. Registre em `projeto/BRIEF.md` a origem de cada dado. O que não for público fica em branco.

- **Extração de marca:** logo, cores e tom de voz que o negócio já usa. Diga se o site novo vai respeitar a marca (evolução) ou propor outra (virada). É uma decisão sua.
- **Auditoria do site atual (se houver):** o que está quebrado (mobile, velocidade, indexação com `site:dominio`, falta de CTA, imagem de compartilhamento). Vira o argumento do pitch.

A checagem de nicho continua obrigatória: um pitch para dentista com preço na página já nasce ilegal.

**Fase 2 (pacote criativo).** Nas direções, pense no que faria o dono dizer "isso é a gente": uma direção que ignora a identidade atual precisa de motivo forte. Na copy: Proibido inventar: depoimento, número de clientes, ano de fundação, nome de funcionário, prêmio. Use texto que o negócio já publicou ou deixe espaço marcado como "a preencher com o cliente". Avaliações públicas do Google podem ser citadas com nome abreviado e link, se o nicho permitir depoimento.

**Fase 4 (construção).**
- **Imagens, em ordem de prioridade:** (1) fotos do próprio negócio, só se você tiver direito de usar na demonstração; (2) banco de imagens com licença, baixadas para `public/`, nunca linkadas de fora; (3) espaço reservado com descrição da foto que falta.
- **Protocolo de escolha de imagem:** leia a copy da seção antes de escolher; confira temperatura de cor, contexto geográfico e cultural (nada de skyline estrangeiro para barbearia de Brasília) e público real. Uma textura bem escolhida é melhor que a foto errada.
- **Texto sobre foto:** sempre com camada de contraste (escurecer ou clarear a área do texto) e contraste AA medido.
- **Imagens quebradas:** na conferência com Playwright, liste toda `<img>` que não carregou (`!img.complete || img.naturalWidth === 0`) e corrija antes do preview.

**Fase 6 (preview).** O site sai com noindex (padrão do template para previews). Na mensagem ao prospect, deixe claro que é uma demonstração, sem compromisso, e que fotos e textos serão trocados pelos reais.

**Fechou negócio?** Atualize a trilha para A ou B em `projeto/ESTADO.md`, volte à fase 1 para completar o brief com o cliente e revise tudo que era provisório.

## Nunca

- Usar logo, fotos ou textos do negócio num lugar público e indexável antes de fechar.
- Criar formulário que coleta dados reais de clientes do prospect.
- Apresentar o site como oficial do negócio.
