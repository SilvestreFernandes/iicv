# Dados pessoais e LGPD (Lei 13.709/2018)

Não é aconselhamento jurídico; é o mínimo técnico que o site deve ter.

- **Minimização:** coletar só o que a funcionalidade precisa. Cada campo do formulário deve ter motivo.
- **Base legal e transparência:** política de privacidade acessível dizendo quais dados, para quê, com quem são compartilhados, por quanto tempo e como pedir exclusão. Consentimento específico quando essa for a base (ex.: marketing).
- **Dados sensíveis** (saúde, biometria, religião, origem racial etc.) exigem cuidado reforçado: criptografia, acesso restrito, log de acesso. Apps de clínica/saúde caem aqui.
- **Cookies e rastreadores:** analytics e pixels de anúncio só com aviso/consentimento; cookies essenciais separados.
- **Direitos do titular:** caminho para o usuário acessar, corrigir e excluir os próprios dados (e a exclusão precisa funcionar de verdade, inclusive em backups dentro de prazo razoável).
- **Segurança:** criptografia em trânsito (HTTPS) e em repouso para dados sensíveis; controle de acesso; logs.
- **Incidentes:** plano simples do que fazer em vazamento; a ANPD e os titulares devem ser comunicados quando houver risco relevante.
- **Fornecedores:** saber onde os dados ficam (Supabase, Vercel, provedores de LLM) e se o provedor usa os dados para treino; preferir opções sem retenção quando houver dados sensíveis.
