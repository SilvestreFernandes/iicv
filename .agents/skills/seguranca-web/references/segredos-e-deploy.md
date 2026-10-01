# Segredos, configuração e deploy

## Segredos
- Onde procurar: arquivos do frontend, `.env*` commitados, `next.config`, `vite.config`, histórico do git, logs, capturas de tela, prompts de sistema.
- Rodar `scripts/scan_segredos.sh`. Para histórico do git: `gitleaks detect` ou `trufflehog git file://.` se disponíveis.
- `.gitignore` deve incluir `.env`, `.env.local`, `.env.*.local`. Commitar só um `.env.example` sem valores.
- Chave que já foi commitada ou publicada: **revogar e gerar nova**. Apagar do histórico é opcional; revogar é obrigatório.
- Chamadas a APIs pagas (OpenAI, Anthropic, Stripe, Resend, Twilio) só pelo servidor; o frontend chama a sua rota, que tem autenticação e rate limit.
- Build de produção sem source maps públicos (ou com acesso restrito).

## HTTPS e headers
- HTTPS forçado com redirecionamento 301 e HSTS.
- Headers recomendados e exemplos para Vercel, Netlify, Next.js e Express em `assets/headers-seguranca.md`.
- Conferir com https://securityheaders.com e https://observatory.mozilla.org.

## CORS
- Nunca `Access-Control-Allow-Origin: *` em API com cookies ou dados privados.
- Lista explícita de origens (produção e, se preciso, localhost em desenvolvimento).

## Ambiente de produção
- `NODE_ENV=production`, debug desligado (Django `DEBUG=False`, Flask sem `debug=True`).
- Páginas de erro genéricas.
- Previews/staging protegidos por senha ou com dados fictícios, porque ficam públicos e indexáveis.
- Rotas de teste, seed e admin removidas ou protegidas.
- Variáveis de ambiente separadas por ambiente (dev ≠ produção), com chaves diferentes.

## Uploads
- Validar tipo real do arquivo (magic bytes), não só a extensão; limite de tamanho.
- Renomear o arquivo no servidor; armazenar fora da pasta pública ou em bucket privado.
- Não servir SVG/HTML enviado pelo usuário no mesmo domínio sem sanitizar (XSS).

## Formulários e e-mail
- Rate limit e CAPTCHA/Turnstile em contato, cadastro e recuperação de senha.
- Validar e-mail e cabeçalhos para evitar injeção de headers de e-mail.
- Respostas iguais para "e-mail existe" e "não existe" na recuperação de senha.

## Webhooks
- Verificar assinatura (Stripe `constructEvent`, Mercado Pago `x-signature`, Meta/WhatsApp `X-Hub-Signature-256`) antes de processar.
- Idempotência: não processar o mesmo evento duas vezes.
