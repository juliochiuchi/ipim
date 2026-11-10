-- ============================================================================
-- Tags
-- ----------------------------------------------------------------------------
-- Cria a tabela public.tags e o vínculo com public.events:
--
--   tags     -> cadastro de tags (id + tag_name), usada como etiqueta do evento.
--   events   -> tag_id (FK) referencia tags(id); ao excluir a tag, o evento
--               fica sem tag (on delete set null).
--
-- Executar no SQL Editor do Supabase (ou aplicar via migrations).
-- ============================================================================

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  tag_name varchar(60) not null
);

-- Coluna de vínculo na tabela de eventos
alter table public.events
  add column if not exists tag_id uuid;

-- Cria a foreign key apenas se ainda não existir
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_tag_id_fkey'
  ) then
    alter table public.events
      add constraint events_tag_id_fkey
      foreign key (tag_id) references public.tags(id) on delete set null;
  end if;
end
$$;
