# Recursos com LLM (chatbots, agentes, RAG)

Baseado no OWASP Top 10 for LLM Applications 2025 (https://genai.owasp.org). Instruções e dados chegam ao modelo pelo mesmo canal, então nenhuma defesa isolada elimina a injeção de prompt: o objetivo é limitar o que o modelo pode fazer e o estrago possível.

1. **Injeção de prompt (direta e indireta)** — trate como hostil a mensagem do usuário e todo conteúdo que o modelo lê (páginas, PDFs, e-mails, documentos de RAG). Separe claramente instruções de dados; não dê ao modelo ferramentas que um texto malicioso não deveria poder acionar.
2. **Vazamento de informação sensível** — não colocar no contexto dados que aquele usuário não pode ver. Filtrar o RAG pelas permissões do usuário antes de montar o prompt.
3. **Cadeia de suprimentos** — modelos, SDKs e servidores MCP de origem confiável; versões travadas.
4. **Envenenamento de dados** — controlar quem pode inserir documentos na base de conhecimento.
5. **Saída tratada como entrada não confiável** — nunca executar, renderizar como HTML ou usar em SQL o que o modelo gerou sem validar/sanitizar. Quando esperar JSON, validar com schema.
6. **Agência excessiva** — ferramentas com o mínimo de permissão; ações com efeito real (enviar mensagem, pagar, apagar, agendar para outra pessoa) exigem confirmação do usuário ou regra de negócio no servidor, não decisão do modelo.
7. **Vazamento do prompt de sistema** — assuma que o prompt de sistema pode ser revelado. Nada de chaves, senhas ou regras de autorização nele; a autorização fica no código.
8. **Vetores e embeddings** — isolar dados por cliente/usuário no banco vetorial (filtro por tenant em toda busca).
9. **Desinformação** — em áreas sensíveis (saúde, jurídico, financeiro), respostas com fonte, aviso de limite e encaminhamento para humano.
10. **Consumo sem limite** — rate limit por usuário/IP, `max_tokens`, limite de tamanho da entrada, orçamento/alerta de gasto na conta do provedor.

## Bots de WhatsApp / mensageria
- Verificar a assinatura do webhook da Meta em toda requisição.
- Identificar o usuário pelo número verificado, nunca por algo que ele digita.
- Não confirmar dados pessoais (CPF, endereço, histórico) sem verificação de identidade.
- Registrar conversas com retenção definida e sem guardar mais dados que o necessário.
