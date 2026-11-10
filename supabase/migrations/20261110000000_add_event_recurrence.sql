-- ============================================================================
-- Eventos recorrentes
-- ----------------------------------------------------------------------------
-- Adiciona suporte a eventos recorrentes na tabela public.events.
--
--   recurrent       -> indica se o evento se repete dentro do intervalo
--                      definido por start_date/end_date.
--   recurrence_type -> forma da recorrência:
--                        'day_of_month' -> sempre no mesmo número do dia (ex: dia 15)
--                        'day_of_week'  -> sempre no mesmo dia da semana (ex: quarta-feira)
--
-- Executar no SQL Editor do Supabase (ou aplicar via migrations).
-- ============================================================================

alter table public.events
  add column if not exists recurrent boolean not null default false;

alter table public.events
  add column if not exists recurrence_type text;

-- Garante que recurrence_type só aceite os valores suportados
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_recurrence_type_check'
  ) then
    alter table public.events
      add constraint events_recurrence_type_check
      check (recurrence_type is null or recurrence_type in ('day_of_month', 'day_of_week'));
  end if;
end
$$;

-- ----------------------------------------------------------------------------
-- Atualiza get_events_by_month para retornar eventos que ATRAVESSAM o mês
-- (multi-dia e recorrentes), em vez de filtrar apenas pela data de início.
-- Sem isso, um evento que começa em janeiro e termina em dezembro não
-- apareceria nos meses seguintes.
--
-- É necessário remover a função antes de recriá-la: "create or replace" não
-- permite alterar o tipo de retorno de uma função existente (erro 42P13).
-- ----------------------------------------------------------------------------
drop function if exists public.get_events_by_month(int, int);

create function public.get_events_by_month(p_year int, p_month int)
returns setof public.events
language sql
stable
as $$
  with bounds as (
    select
      make_date(p_year, p_month, 1) as month_start,
      (make_date(p_year, p_month, 1) + interval '1 month' - interval '1 day')::date as month_end
  )
  select e.*
  from public.events e
  cross join bounds b
  where e.is_active = true
    and e.start_date <= b.month_end
    and coalesce(e.end_date, e.start_date) >= b.month_start
  order by e.start_date asc, e.start_time asc nulls last;
$$;

-- Restaura os privilégios de execução (perdidos ao remover a função)
grant execute on function public.get_events_by_month(int, int) to anon, authenticated;
