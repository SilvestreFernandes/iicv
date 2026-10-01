# OWASP Top 10:2025 — o que checar e como corrigir

Lista oficial: https://owasp.org/Top10/2025/ (versão final publicada em jan/2026).

## A01 Quebra de controle de acesso (inclui SSRF, BOLA/IDOR)
- Checar: rotas `/api/x/[id]` que buscam pelo id sem filtrar pelo dono; rotas de admin protegidas só no frontend; `userId` vindo do corpo da requisição em vez da sessão; CORS `*` com credenciais; servidor que busca URLs enviadas pelo usuário (SSRF).
- Corrigir: pegar o usuário da sessão no servidor; consultar `where id = ? and owner_id = session.user.id`; negar por padrão; IDs não sequenciais (UUID) como camada extra, nunca como única defesa; para buscar URLs externas, lista de domínios permitidos e bloqueio de IPs internos (127.0.0.1, 169.254.169.254, 10/8, 192.168/16).

## A02 Configuração de segurança incorreta
- Checar: modo debug/dev em produção, listagem de diretórios, painéis de admin abertos, bucket público, headers ausentes, contas/senhas padrão, CORS permissivo, `.env` ou `.git` acessível pela web.
- Corrigir: headers de `assets/headers-seguranca.md`; CORS com lista explícita; buckets privados + URLs assinadas; revisar configurações padrão do provedor.

## A03 Falhas na cadeia de suprimentos de software (nova)
- Checar: pacotes desconhecidos ou com nome parecido a um famoso (typosquatting), pacotes "alucinados" pelo modelo, versões sem lockfile, scripts de CDN sem integridade, extensões e ações de CI de origem duvidosa.
- Corrigir: conferir se o pacote existe e é mantido antes de instalar; lockfile commitado; `npm audit`/`pip-audit`; Dependabot/Renovate; `integrity` (SRI) em scripts de CDN; menor número possível de dependências.

## A04 Falhas criptográficas
- Checar: HTTP sem TLS, senhas com MD5/SHA1/sem sal, tokens previsíveis (`Math.random`), chaves de criptografia no código, dados sensíveis sem criptografia em repouso.
- Corrigir: HTTPS + HSTS; Argon2id/bcrypt; `crypto.randomUUID()`/`crypto.getRandomValues`/`secrets` em Python; chaves em variável de ambiente ou cofre.

## A05 Injeção (SQL, NoSQL, comando, XSS)
- Checar: template string montando SQL, `$where`/operadores Mongo vindos do usuário, `child_process.exec` com entrada, `innerHTML`/`dangerouslySetInnerHTML`, filtros do PostgREST montados com texto livre.
- Corrigir: consultas parametrizadas/ORM; validação com schema; escapar saída; DOMPurify; Content-Security-Policy.

## A06 Design inseguro
- Checar: fluxos sem limite (cupom reutilizável, transferência sem confirmação), recuperação de senha que revela se o e-mail existe, lógica de preço calculada no cliente, falta de modelagem de ameaças.
- Corrigir: preço/total sempre recalculado no servidor; limites de negócio; perguntar "o que um usuário malicioso faria aqui?" em cada funcionalidade nova.

## A07 Falhas de autenticação
- Checar: sem rate limit/bloqueio em login, senhas fracas aceitas, sessão que não expira, token JWT validado só no frontend, `alg: none`, lógica invertida (bloqueia logado e libera anônimo), link mágico sem expiração.
- Corrigir: usar provedor de auth; validar JWT no servidor em toda rota; MFA para admin; expiração de sessão e revogação no logout; mensagem genérica "e-mail ou senha incorretos".

## A08 Falhas de integridade de software ou dados
- Checar: desserialização de dados não confiáveis, webhooks aceitos sem verificar assinatura (Stripe, Mercado Pago, WhatsApp), atualizações sem verificação, deploy direto de branch sem revisão.
- Corrigir: validar assinatura de todo webhook; proteger branch principal; secrets de CI com escopo mínimo.

## A09 Falhas de log e alerta
- Checar: sem registro de logins falhos, mudanças de permissão e erros 5xx; logs com senhas/tokens/dados pessoais; ninguém recebe alerta.
- Corrigir: log estruturado dos eventos de segurança, sem dados sensíveis; alertas (e-mail/Slack) para picos de falha de login e erros; retenção definida.

## A10 Tratamento incorreto de condições excepcionais (nova)
- Checar: `try/catch` que engole erro e segue liberando acesso, verificação de permissão que retorna `true` quando o serviço falha, timeouts sem tratamento, erro devolvendo stack trace.
- Corrigir: falhar fechado; tratar cada erro explicitamente; resposta genérica ao cliente e detalhe no log; testes para os caminhos de erro.
