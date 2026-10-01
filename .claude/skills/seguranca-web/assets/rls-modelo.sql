-- Modelo de RLS para uma tabela com dono (Supabase / Postgres)
-- Troque "pedidos" pelo nome da tabela e "user_id" pela coluna do dono.

alter table public.pedidos enable row level security;

-- Leitura: só os próprios registros
create policy "pedidos_select_dono" on public.pedidos
  for select to authenticated
  using ( (select auth.uid()) = user_id );

-- Inserção: só pode criar registro em nome de si mesmo
create policy "pedidos_insert_dono" on public.pedidos
  for insert to authenticated
  with check ( (select auth.uid()) = user_id );

-- Atualização: só os próprios, e não pode transferir para outro dono
create policy "pedidos_update_dono" on public.pedidos
  for update to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

-- Exclusão: só os próprios (remova esta política se o usuário não deve apagar)
create policy "pedidos_delete_dono" on public.pedidos
  for delete to authenticated
  using ( (select auth.uid()) = user_id );

-- Conferência: nenhuma tabela pública sem RLS
-- select tablename from pg_tables where schemaname = 'public' and rowsecurity = false;
