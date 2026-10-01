---
name: seguranca-web
description: Cuidados de segurança para criar, revisar e publicar sites, apps web, APIs e chatbots — com foco nas falhas que mais aparecem em projetos feitos com IA (Lovable, Bolt, v0, Replit, Cursor, Claude). Use sempre que o usuário for construir ou alterar qualquer coisa com login, banco de dados, formulário, pagamento, upload, API, chave de API, Supabase/Firebase, deploy (Vercel, Netlify) ou recurso com LLM, e também quando ele pedir auditoria, revisão de código, "está seguro?", "posso publicar?", checklist antes do lançamento, LGPD ou proteção de dados. Aplique mesmo que o pedido fale só em funcionalidade e não mencione segurança.
---

# Segurança web por padrão

Código gerado por IA costuma funcionar e ainda assim vazar dados. Auditorias de 2025–2026 encontraram as mesmas poucas falhas se repetindo em milhares de apps: chave secreta no JavaScript do navegador, banco Supabase sem Row Level Security, autorização conferida só no frontend e endpoints que deixam qualquer um apagar registros. Esta skill existe para que essas falhas não saiam do modelo, em vez de serem achadas depois por quem ataca.

Dois modos de uso:
- **Construindo:** aplique as regras de ouro enquanto escreve o código, sem esperar o usuário pedir.
- **Auditando:** siga o fluxo de auditoria e entregue o relatório no formato abaixo.

## Regras de ouro (valem para todo código que você escrever)

1. **Segredo nunca vai para o navegador.** Tudo que está no bundle do frontend é público. Chaves de Stripe secret, OpenAI/Anthropic, `service_role` do Supabase, SMTP, tokens de admin ficam só no servidor (API route, edge function, backend) lidas de variável de ambiente. Prefixos como `NEXT_PUBLIC_`, `VITE_`, `EXPO_PUBLIC_` expõem o valor: use só para chaves feitas para serem públicas (ex.: `anon key` do Supabase, chave publicável do Stripe).
2. **O servidor decide quem pode o quê.** Esconder botão não é controle de acesso. Toda rota e toda consulta confere, no servidor ou no banco, se aquele usuário pode ler/alterar aquele registro específico (não só se está logado).
3. **Banco exposto ao cliente exige política por tabela.** Em Supabase/Firebase, RLS/regras ligadas em todas as tabelas e buckets, com políticas por operação (select, insert, update, delete) amarradas ao `auth.uid()`. Nunca `using (true)` para dados de usuário.
4. **Toda entrada é hostil.** Validar no servidor (tipo, tamanho, formato, lista permitida) com schema (Zod, Pydantic). Consultas sempre parametrizadas/ORM, nunca SQL montado com concatenação. Nada de `eval`, `exec` ou comando de shell com texto do usuário.
5. **Saída escapada.** Não inserir HTML vindo do usuário ou de um LLM com `innerHTML`/`dangerouslySetInnerHTML`/`v-html` sem sanitizar (DOMPurify).
6. **Falhar fechado.** Em erro ou exceção, negar acesso. Mensagem genérica para o usuário, detalhe só no log do servidor. Nunca expor stack trace, SQL ou chaves em resposta.
7. **Autenticação pronta, não caseira.** Use o provedor (Supabase Auth, Auth.js, Clerk, Firebase Auth). Se houver senha própria: Argon2id ou bcrypt, nunca MD5/SHA puro. Cookies de sessão `HttpOnly`, `Secure`, `SameSite=Lax`.
8. **Limitar abuso.** Rate limit em login, cadastro, recuperação de senha, envio de e-mail/SMS e qualquer chamada paga (LLM, pagamento).
9. **Dependências conscientes.** Pacotes conhecidos, versões travadas no lockfile, sem instalar nome parecido/inventado. Confira se o pacote realmente existe antes de sugerir.
10. **Pedir confirmação antes de ações destrutivas** em produção (migrations que apagam, `DROP`, deletes em massa, mudar políticas de acesso).

## Fluxo de auditoria

Trabalhe sobre o **código real** (repositório, arquivos, migrations, configs). Sem código, dá para verificar só o que é público (headers, bundle), e o relatório deve dizer essa limitação.

Siga esta ordem, porque as primeiras etapas são as que mais vazam dados na prática:

1. **Segredos expostos** — rode `scripts/scan_segredos.sh` na raiz do projeto e revise o bundle/`.env*`/histórico do git. Veja `references/segredos-e-deploy.md`.
2. **Controle de acesso e banco** — RLS/regras, IDOR, rotas de admin, APIs sem checagem de dono. Veja `references/supabase-firebase.md` se houver BaaS.
3. **Autenticação e sessão.**
4. **Injeção e XSS** — entradas, consultas, renderização de HTML, uploads.
5. **Configuração e deploy** — headers, CORS, HTTPS, modo debug, páginas de erro.
6. **Dependências e cadeia de suprimentos.**
7. **Recursos com LLM** (chatbot, agente, RAG) — veja `references/ia-llm.md`.
8. **Dados pessoais e LGPD** — veja `references/lgpd.md`.

O mapa completo por categoria (OWASP Top 10:2025) está em `references/owasp-2025.md`.

## Formato do relatório

Ordene por severidade. Para cada achado:

```
### [CRÍTICO | ALTO | MÉDIO | BAIXO] Título curto
Onde: caminho/do/arquivo.ts:linha (ou tabela/rota/config)
Risco: o que alguém consegue fazer, em uma frase simples
Correção: código ou SQL pronto para aplicar
Como verificar: teste que confirma que ficou fechado
```

Critérios: **Crítico** = qualquer pessoa sem login lê/altera/apaga dados ou gasta dinheiro do dono (chave secreta exposta, tabela sem RLS). **Alto** = usuário logado acessa dados de outro, ou bypass de autenticação. **Médio** = exige condição específica ou reduz defesa (headers ausentes, sem rate limit). **Baixo** = boa prática.

Se uma chave secreta foi exposta, a correção sempre inclui **revogar e gerar outra** no painel do serviço: tirar do código não basta, porque ela já pode ter sido copiada.

## Limites desta skill

Esta skill é defensiva. Audite apenas código e sistemas do próprio usuário ou que ele está autorizado a testar. Mostre como verificar se uma correção funcionou, não scripts de ataque contra terceiros.

## Checklist antes de publicar

- [ ] Nenhum segredo no frontend, no repositório ou no histórico do git; chaves vazadas foram revogadas
- [ ] RLS/regras ativas em todas as tabelas e buckets, com políticas por operação
- [ ] Toda rota de API confere autenticação **e** permissão sobre o recurso
- [ ] Entradas validadas no servidor; consultas parametrizadas; HTML sanitizado
- [ ] HTTPS forçado e headers de segurança configurados (`assets/headers-seguranca.md`; no template, a base já está em `next.config.ts`)
- [ ] CORS restrito aos domínios do próprio site
- [ ] Rate limit em login, formulários e chamadas pagas
- [ ] Erros não expõem detalhes; modo debug desligado em produção
- [ ] `npm audit` / `pip-audit` sem vulnerabilidades críticas
- [ ] Recursos de IA com limites de custo, sem segredos no prompt e sem ações perigosas sem confirmação
- [ ] Dados pessoais mínimos, com política de privacidade e base legal (LGPD)
- [ ] Backups ativos e logs/alertas para falhas de login e erros do servidor
