# Supabase e Firebase (BaaS) — a falha número 1 de apps feitos com IA

A `anon key` do Supabase e a config do Firebase ficam no navegador por design. Isso só é seguro se o banco tiver regras. Sem RLS, qualquer pessoa com a chave pública lê, altera e apaga tabelas inteiras pela API REST. Foi a causa do CVE-2025-48757 (Lovable, 170+ apps) e do vazamento do Moltbook (1,5 milhão de tokens).

## Supabase — checklist
1. RLS ligado em **todas** as tabelas do schema `public`:
   ```sql
   select tablename, rowsecurity from pg_tables where schemaname = 'public';
   ```
   Qualquer `rowsecurity = false` com dado de usuário é crítico.
2. Políticas separadas para select/insert/update/delete. Evite `using (true)` e `with check (true)` fora de dados realmente públicos. Modelo pronto em `assets/rls-modelo.sql`.
3. Política de update/insert com `with check` para impedir que o usuário troque `user_id` para o de outro.
4. `service_role` **somente** no servidor/edge functions. Se estiver em qualquer arquivo do frontend ou variável `NEXT_PUBLIC_`/`VITE_`, é crítico: remover e **rotacionar** no painel.
5. Colunas sensíveis (papel/role, plano, saldo, `is_admin`) não podem ser atualizáveis pelo próprio usuário. Use tabela separada ou política que bloqueie essas colunas.
6. Storage: buckets privados por padrão; políticas em `storage.objects` limitando ao dono (`(storage.foldername(name))[1] = auth.uid()::text`); URLs assinadas com expiração.
7. Funções `security definer` e RPCs: revisar a lógica (já houve caso de lógica invertida liberando anônimos); definir `search_path`; revogar `execute` de `anon` quando não precisar.
8. Views: criar com `security_invoker = true` para respeitar RLS.
9. Rodar o **Security Advisor** do painel do Supabase e resolver os alertas.
10. Testar como anônimo e como outro usuário: tentar ler/alterar dados que não são seus deve falhar.

## Firebase — checklist
1. Nada de `allow read, write: if true;` nem regras de "modo de teste" com data de expiração.
2. Regras amarradas ao dono: `allow read, write: if request.auth != null && request.auth.uid == userId;`
3. Validar formato e campos nas regras (`request.resource.data`), incluindo impedir alteração de campos de papel/permissão.
4. Storage com as mesmas regras de dono.
5. App Check ativado para reduzir abuso da API.
6. Testar no Emulator/Rules Playground antes de publicar.
