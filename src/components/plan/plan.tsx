import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, CalendarDays } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { eventService } from '@/services/event.service';
import { tagService } from '@/services/tag.service';
import type { EventRecurrenceType } from '@/types/events';
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { LoadingComponent } from '@/components/loading/global-loading';
import { toast } from 'sonner';

dayjs.locale('pt-br');

// Types for our data
interface ApiEvent {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  start_time: string;
  end_time: string | null;
  location: string | null;
  category_id: string;
  tag_id: string | null;
  recurrent: boolean;
  recurrence_type: EventRecurrenceType | null;
}

interface ScheduleEvent {
  id: string;
  type: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
}

type EventsByDate = Record<string, ScheduleEvent[]>;

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const MONTHS = [
  { value: `${currentYear}-1`, label: `Janeiro de ${currentYear}` },
  { value: `${currentYear}-2`, label: `Fevereiro de ${currentYear}` },
  { value: `${currentYear}-3`, label: `Março de ${currentYear}` },
  { value: `${currentYear}-4`, label: `Abril de ${currentYear}` },
  { value: `${currentYear}-5`, label: `Maio de ${currentYear}` },
  { value: `${currentYear}-6`, label: `Junho de ${currentYear}` },
  { value: `${currentYear}-7`, label: `Julho de ${currentYear}` },
  { value: `${currentYear}-8`, label: `Agosto de ${currentYear}` },
  { value: `${currentYear}-9`, label: `Setembro de ${currentYear}` },
  { value: `${currentYear}-10`, label: `Outubro de ${currentYear}` },
  { value: `${currentYear}-11`, label: `Novembro de ${currentYear}` },
  { value: `${currentYear}-12`, label: `Dezembro de ${currentYear}` },
];

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/**
 * Retorna as datas de ocorrência de um evento recorrente dentro do intervalo.
 * - 'day_of_month': sempre no mesmo número do dia (ex: dia 15).
 * - 'day_of_week': sempre no mesmo dia da semana (ex: quarta-feira).
 */
function getRecurrenceDates(start: Dayjs, end: Dayjs, type: EventRecurrenceType): Dayjs[] {
  const dates: Dayjs[] = [];

  if (type === 'day_of_week') {
    for (let cursor = start; !cursor.isAfter(end); cursor = cursor.add(1, 'week')) {
      dates.push(cursor);
    }
    return dates;
  }

  const targetDayOfMonth = start.date();
  const lastMonth = end.startOf('month');

  for (let month = start.startOf('month'); !month.isAfter(lastMonth); month = month.add(1, 'month')) {
    // Meses sem o dia alvo (ex: dia 31 em fevereiro) são ignorados
    if (targetDayOfMonth > month.daysInMonth()) continue;

    const occurrence = month.date(targetDayOfMonth);
    if (!occurrence.isBefore(start) && !occurrence.isAfter(end)) {
      dates.push(occurrence);
    }
  }

  return dates;
}

type TagNames = Record<string, string>;

/** Tag padrão exibida quando o evento não possui uma tag cadastrada. */
const DEFAULT_TAG_NAME = 'IPIM';

function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
}

function toScheduleEvent(event: ApiEvent, tagNames: TagNames): ScheduleEvent {
  const tagName = event.tag_id ? tagNames[event.tag_id] : undefined;

  return {
    id: event.id,
    type: tagName || DEFAULT_TAG_NAME,
    title: event.title,
    time: formatTime(event.start_time),
    location: event.location || undefined,
    description: event.description || undefined,
  };
}

const typeBadgeClass = (type: string) =>
  type === 'Culto'
    ? 'bg-ipimGreen/10 text-ipimGreen dark:bg-ipimGreen/20'
    : type === 'Jovens'
      ? 'bg-ipimIndigoLight/10 text-ipimIndigoLight dark:bg-ipimIndigoLight/20'
      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';

export default function Plan() {
  const [selectedMonth, setSelectedMonth] = useState(`${currentYear}-${currentMonth}`);
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>({});
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [isLoading, setIsLoading] = useState(true);
  // Cache das tags (id -> nome), carregado uma única vez
  const tagNamesRef = useRef<TagNames>({});
  const tagsLoadedRef = useRef(false);

  const monthStart = useMemo(() => dayjs(`${selectedMonth}-01`).startOf('month'), [selectedMonth]);

  // Grade do calendário: da primeira semana (domingo) até a última (sábado)
  const calendarDays = useMemo(() => {
    const lastDay = monthStart.date(monthStart.daysInMonth());
    const gridStart = monthStart.subtract(monthStart.day(), 'day');
    const gridEnd = lastDay.add(6 - lastDay.day(), 'day');

    const days: Dayjs[] = [];
    for (let day = gridStart; !day.isAfter(gridEnd); day = day.add(1, 'day')) {
      days.push(day);
    }
    return days;
  }, [monthStart]);

  const fetchMonth = useCallback(
    async (month: string) => {
      setIsLoading(true);
      try {
        // Carrega as tags uma única vez para resolver o nome exibido acima do título
        if (!tagsLoadedRef.current) {
          const { data: tagsData, error: tagsError } = await tagService.getAll();

          if (tagsError) throw tagsError;

          tagNamesRef.current = Object.fromEntries(
            (tagsData ?? []).map((tag) => [tag.id, tag.tag_name])
          );
          tagsLoadedRef.current = true;
        }

        const [year, monthNumber] = month.split('-');
        const { data, error } = await eventService.getEventsByMonth(Number(year), Number(monthNumber));

        if (error) throw error;

        const start = dayjs(`${month}-01`).startOf('month');
        const end = start.endOf('month');
        const map = buildEventsByDate((data as ApiEvent[]) ?? [], start, end, tagNamesRef.current);

        setEventsByDate(map);

        // Escolhe o dia em destaque: hoje (se houver evento) ou o primeiro dia com evento
        const isCurrentMonthView = dayjs().format('YYYY-MM') === start.format('YYYY-MM');
        const todayKey = dayjs().format('YYYY-MM-DD');
        const firstWithEvents = Object.keys(map).sort()[0];

        let initialDate = start.format('YYYY-MM-DD');
        if (isCurrentMonthView && (map[todayKey]?.length ?? 0) > 0) {
          initialDate = todayKey;
        } else if (firstWithEvents) {
          initialDate = firstWithEvents;
        } else if (isCurrentMonthView) {
          initialDate = todayKey;
        }
        setSelectedDate(initialDate);
      } catch (error) {
        console.log(error);
        toast.error('Erro ao carregar eventos.', {
          description: <span className="text-black dark:text-white">Tente novamente mais tarde.</span>,
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchMonth(selectedMonth);
  }, [selectedMonth, fetchMonth]);

  const selectedEvents = eventsByDate[selectedDate] ?? [];
  const monthEventCount = useMemo(
    () => Object.values(eventsByDate).reduce((total, day) => total + day.length, 0),
    [eventsByDate]
  );
  const isCurrentMonthView = dayjs().format('YYYY-MM') === monthStart.format('YYYY-MM');
  const todayKey = dayjs().format('YYYY-MM-DD');
  const isFirstMonth = selectedMonth === MONTHS[0].value;
  const isLastMonth = selectedMonth === MONTHS[MONTHS.length - 1].value;

  const goToPreviousMonth = () => {
    if (isFirstMonth) return;
    setSelectedMonth(dayjs(`${selectedMonth}-01`).subtract(1, 'month').format('YYYY-M'));
  };

  const goToNextMonth = () => {
    if (isLastMonth) return;
    setSelectedMonth(dayjs(`${selectedMonth}-01`).add(1, 'month').format('YYYY-M'));
  };

  const selectedDayObj = dayjs(selectedDate);

  return (
    <div className="min-h-auto w-full bg-[#f6f6f6] dark:bg-[#1f1f25] py-6 px-4 tablet:p-6 shadow-lg rounded-lg">
      <div className="mb-6 animate-in slide-in-from-top-4 duration-700 fade-in">
        <h1 className="text-2xl tablet:text-3xl font-bold text-ipimBlack dark:text-white tracking-tight">
          Programação
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isLoading
            ? 'Carregando programação do mês...'
            : monthEventCount > 0
              ? `${monthEventCount} ${monthEventCount === 1 ? 'evento' : 'eventos'} neste mês`
              : 'Nenhum evento neste mês'}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-[minmax(0,1fr)_minmax(0,340px)] tablet:gap-6 laptop:grid-cols-[minmax(0,1fr)_380px]">
          <LoadingComponent />
          <LoadingComponent />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-[minmax(0,1fr)_minmax(0,340px)] tablet:gap-6 laptop:grid-cols-[minmax(0,1fr)_380px]">
          {/* Calendário do mês */}
          <section className="rounded-2xl bg-white dark:bg-ipimBorderDark border border-gray-100 dark:border-gray-800 shadow-sm p-4 tablet:p-5 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-5">
              <button
                type="button"
                onClick={goToPreviousMonth}
                disabled={isFirstMonth}
                aria-label="Mês anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ipimNavy dark:text-gray-300 hover:bg-ipimGreen/10 hover:text-ipimGreen disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="h-9 w-auto gap-1 border-0 bg-transparent px-3 text-base font-bold capitalize text-ipimBlack dark:text-white shadow-none focus:ring-0 hover:bg-ipimGreen/5 dark:hover:bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button
                type="button"
                onClick={goToNextMonth}
                disabled={isLastMonth}
                aria-label="Próximo mês"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ipimNavy dark:text-gray-300 hover:bg-ipimGreen/10 hover:text-ipimGreen disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
              {WEEKDAYS.map((weekday) => (
                <div
                  key={weekday}
                  className="py-1 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500"
                >
                  {weekday}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 tablet:gap-1.5">
              {calendarDays.map((day) => {
                const key = day.format('YYYY-MM-DD');
                const inMonth = day.format('YYYY-MM') === monthStart.format('YYYY-MM');
                const count = eventsByDate[key]?.length ?? 0;
                const isToday = isCurrentMonthView && key === todayKey;
                const isSelected = key === selectedDate;

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!inMonth}
                    onClick={() => setSelectedDate(key)}
                    className={cn(
                      'relative flex aspect-square flex-col items-center justify-center rounded-xl text-[13px] font-semibold transition-all duration-200 tablet:text-sm',
                      !inMonth && 'cursor-default text-gray-300 dark:text-gray-600',
                      inMonth && !isSelected && 'cursor-pointer text-ipimBlack dark:text-white hover:bg-ipimGreen/10',
                      isSelected && 'bg-ipimGreen text-white shadow-md shadow-ipimGreen/25',
                      !isSelected && isToday && 'ring-1 ring-inset ring-ipimGreen/60'
                    )}
                  >
                    <span>{day.format('D')}</span>
                    {count > 0 && (
                      <span className="mt-0.5 flex items-center gap-[3px]">
                        {Array.from({ length: Math.min(count, 3) }).map((_, index) => (
                          <span
                            key={index}
                            className={cn(
                              'h-1 w-1 rounded-full',
                              isSelected ? 'bg-white' : 'bg-ipimGreen'
                            )}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Eventos do dia selecionado */}
          <section className="flex flex-col rounded-2xl bg-white dark:bg-ipimBorderDark border border-gray-100 dark:border-gray-800 shadow-sm p-4 tablet:p-5 animate-in fade-in duration-500">
            <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ipimGreen">
                  {selectedDayObj.format('dddd')}
                </p>
                <h2 className="text-xl tablet:text-2xl font-bold capitalize text-ipimBlack dark:text-white">
                  {selectedDayObj.format('D [de] MMMM')}
                </h2>
              </div>
              {selectedEvents.length > 0 && (
                <span className="shrink-0 rounded-full bg-ipimGreen/10 px-2.5 py-1 text-xs font-bold text-ipimGreen dark:bg-ipimGreen/20">
                  {selectedEvents.length} {selectedEvents.length === 1 ? 'evento' : 'eventos'}
                </span>
              )}
            </div>

            {selectedEvents.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                  <CalendarDays className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Nenhuma programação neste dia
                </h3>
                <p className="mt-1 max-w-[220px] text-xs text-gray-500 dark:text-gray-400">
                  Selecione um dia marcado no calendário para ver os eventos.
                </p>
              </div>
            ) : (
              <ul className="space-y-2.5">
                {selectedEvents.map((event) => (
                  <li
                    key={event.id}
                    className="flex gap-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-white/[0.02] p-3 transition-all duration-200 hover:border-ipimGreen/40 hover:shadow-sm"
                  >
                    <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-ipimGreen/10 py-2 text-ipimGreen">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="mt-0.5 text-xs font-bold">{event.time || '--:--'}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                          typeBadgeClass(event.type)
                        )}
                      >
                        {event.type}
                      </span>
                      <h3 className="text-sm font-bold leading-snug text-ipimBlack dark:text-white">
                        {event.title}
                      </h3>
                      {event.location && (
                        <div className="mt-1 flex items-center text-[11px] font-medium text-gray-400 dark:text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                      {event.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function buildEventsByDate(
  apiEvents: ApiEvent[],
  rangeStart: Dayjs,
  rangeEnd: Dayjs,
  tagNames: TagNames
): EventsByDate {
  const map: EventsByDate = {};

  const addEventToDay = (date: Dayjs, event: ApiEvent) => {
    // Exibe apenas os dias pertencentes ao mês selecionado
    if (date.isBefore(rangeStart) || date.isAfter(rangeEnd)) return;

    const dateKey = date.format('YYYY-MM-DD');
    if (!map[dateKey]) {
      map[dateKey] = [];
    }
    map[dateKey].push(toScheduleEvent(event, tagNames));
  };

  apiEvents.forEach((event) => {
    const startDay = dayjs(event.start_date);
    const endDay = event.end_date ? dayjs(event.end_date) : startDay;
    // Garante que eventos com data final anterior à inicial não quebrem o range
    const lastDay = endDay.isBefore(startDay) ? startDay : endDay;

    // Evento recorrente: aparece apenas nos dias de ocorrência dentro do intervalo
    if (event.recurrent && event.recurrence_type) {
      getRecurrenceDates(startDay, lastDay, event.recurrence_type).forEach((occurrence) => {
        addEventToDay(occurrence, event);
      });
      return;
    }

    // Eventos com data de início e fim devem aparecer em todos os dias do período
    for (let cursor = startDay; !cursor.isAfter(lastDay); cursor = cursor.add(1, 'day')) {
      addEventToDay(cursor, event);
    }
  });

  Object.values(map).forEach((dayEvents) => {
    dayEvents.sort((a, b) => (a.time || '00:00').localeCompare(b.time || '00:00'));
  });

  return map;
}
