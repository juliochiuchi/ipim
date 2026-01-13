import { useEffect, useState } from 'react';
import { Filter, CalendarDays, Clock, MapPin, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { supabase } from '@/utils/supabase';
import dayjs from 'dayjs';
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
}

interface Event {
  id: string;
  type: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
}

interface DaySchedule {
  day: string;
  weekday: string;
  fullDate: string; // YYYY-MM-DD
  monthLabel: string; // Para exibição se necessário
  events: Event[];
}

const currentYear = new Date().getFullYear()

const MONTHS = [
  { value: `${currentYear}-1`, label: `Janeiro/${currentYear}` },
  { value: `${currentYear}-2`, label: `Fevereiro/${currentYear}` },
  { value: `${currentYear}-3`, label: `Março/${currentYear}` },
  { value: `${currentYear}-4`, label: `Abril/${currentYear}` },
  { value: `${currentYear}-5`, label: `Maio/${currentYear}` },
  { value: `${currentYear}-6`, label: `Junho/${currentYear}` },
  { value: `${currentYear}-7`, label: `Julho/${currentYear}` },
  { value: `${currentYear}-8`, label: `Agosto/${currentYear}` },
  { value: `${currentYear}-9`, label: `Setembro/${currentYear}` },
  { value: `${currentYear}-10`, label: `Outubro/${currentYear}` },
  { value: `${currentYear}-11`, label: `Novembro/${currentYear}` },
  { value: `${currentYear}-12`, label: `Dezembro/${currentYear}` },
];

export default function Plan() {
  const [selectedMonth, setSelectedMonth] = useState(`${currentYear}-1`)
  const [events, setEvents] = useState<DaySchedule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getEventsByMonth(selectedMonth)
  }, [selectedMonth])

  const getEventsByMonth = async (selectedMonth: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .rpc('get_events_by_month', {
          p_year: Number(selectedMonth.split('-')[0]),
          p_month: Number(selectedMonth.split('-')[1]),
        })

      if (error) {
        throw error
      }

      if (data) {
        console.log(data)
        const groupedEvents = groupEventsByDay(data as ApiEvent[]);
        setEvents(groupedEvents)
      }
    } catch (error) {
      console.log(error)
      toast.error("Erro ao carregar eventos.", {
        description: <span className="text-black dark:text-white">Tente novamente mais tarde.</span>,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const groupEventsByDay = (apiEvents: ApiEvent[]): DaySchedule[] => {
    const groups: { [key: string]: ApiEvent[] } = {};

    apiEvents.forEach(event => {
      const dateKey = event.start_date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });

    // Sort days
    const sortedDates = Object.keys(groups).sort((a, b) => dayjs(a).diff(dayjs(b)));

    return sortedDates.map(date => {
      const dayEvents = groups[date];

      // Sort events by time within the day
      dayEvents.sort((a, b) => {
        const timeA = a.start_time || '00:00';
        const timeB = b.start_time || '00:00';
        return timeA.localeCompare(timeB);
      });

      const dateObj = dayjs(date);

      return {
        day: dateObj.format('DD'),
        weekday: dateObj.format('dddd'),
        fullDate: date,
        monthLabel: dateObj.format('MMM'),
        events: dayEvents.map(event => ({
          id: event.id,
          type: inferType(event), // Helper to determine type
          title: event.title,
          time: formatTime(event.start_time),
          location: event.location || undefined,
          description: event.description || undefined
        }))
      };
    });
  };

  const inferType = (event: ApiEvent): string => {
    // Logic to infer type from title or category_id if needed
    // For now, simple inference or default
    const titleLower = event.title.toLowerCase();
    if (titleLower.includes('culto')) return 'Culto';
    if (titleLower.includes('jovem') || titleLower.includes('jovens')) return 'Jovens';
    if (titleLower.includes('ensino') || titleLower.includes('estudo')) return 'Ensino';
    return 'Evento';
  };

  const formatTime = (timeStr: string): string => {
    if (!timeStr) return '';
    // Assume timeStr is HH:mm:ss or HH:mm
    return timeStr.slice(0, 5);
  };


  return (
    <div className="min-h-auto w-screen relative left-1/2 -translate-x-1/2 tablet:static tablet:w-full tablet:translate-x-0 tablet:left-auto bg-ipimBgSectionNextStep/30 dark:bg-[#1f1f25] py-6 shadow-lg tablet:rounded-lg px-4 phone:px-6  tablet:p-6">
      <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-end gap-6 mb-16 animate-in slide-in-from-top-4 duration-700 fade-in">
        <div className="relative group w-full tablet:w-auto tablet:min-w-[240px]">
          <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 uppercase tracking-wider ml-1">
            Filtrar por mês
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
              <Calendar className="h-4 w-4 text-ipimGreen" />
            </div>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none w-full bg-white dark:bg-ipimBorderDark border border-gray-200 dark:border-ipimBorderDark hover:border-ipimGreen/50 text-ipimBlack dark:text-white font-medium py-3 pl-10 pr-10 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ipimGreen/20 focus:border-ipimGreen cursor-pointer"
            >
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-hover:text-ipimGreen transition-colors">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative space-y-12 tablet:space-y-5 px-0 tablet:px-6">

        {isLoading ? (
          <div className="space-y-6">
            <LoadingComponent />
            <LoadingComponent />
            <LoadingComponent />
          </div>
        ) : (
          <>
            {events.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "relative tablet:pl-[107px] animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards",
                  // Stagger animation based on index
                  index === 0 ? "delay-0" : index === 1 ? "delay-100" : "delay-200"
                )}
              >

                {/* Indicador de Data (Mobile: Topo / Desktop: Lateral Esquerda) */}
                <div className="flex tablet:absolute tablet:left-0 tablet:top-0 tablet:flex-col tablet:items-end tablet:text-right items-center gap-3 tablet:gap-0 mb-6 tablet:mb-0 px-2 tablet:px-0">

                  {/* Desktop Dot Indicator */}
                  <div className="hidden tablet:block absolute -right-[45px] top-5 w-3 h-3 rounded-full border-2 border-ipimGreen bg-white dark:bg-ipimBorderDark z-10 shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#09090b]" />

                  <span className="text-5xl font-bold text-ipimBlack dark:text-white tracking-tighter leading-none">
                    {day.day}
                  </span>
                  <div className="flex flex-col tablet:items-end">
                    <span className="text-sm font-bold uppercase text-ipimGreen tracking-wide">
                      {day.monthLabel}
                    </span>
                    <span className="text-base text-gray-500 dark:text-gray-400 font-medium capitalize">
                      {day.weekday}
                    </span>
                  </div>
                </div>

                {/* Lista de Eventos do Dia */}
                <div className="grid gap-5">
                  {day.events.map((event) => (
                    <Card
                      key={event.id}
                      className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-ipimBorderDark ring-1 ring-gray-100 dark:ring-gray-800"
                    >

                      <CardContent className="p-0">
                        <div className="flex flex-col tablet:flex-row">

                          {/* Time Column within Card */}
                          <div className="tablet:w-32 bg-ipimBgSectionNextStep/50 dark:bg-black/20 p-4 tablet:p-6 flex tablet:flex-col items-center tablet:justify-center gap-2 border-b tablet:border-b-0 tablet:border-r border-gray-100 dark:border-gray-800">
                            <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm text-ipimGreen">
                              <Clock className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-ipimBlack dark:text-white text-lg">
                              {event.time}
                            </span>
                          </div>

                          {/* Event Details */}
                          <div className="flex-1 p-3 tablet:p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                event.type === 'Culto' ? "bg-ipimGreen/10 text-ipimGreen dark:bg-ipimGreen/20" :
                                  event.type === 'Jovens' ? "bg-ipimIndigoLight/10 text-ipimIndigoLight dark:bg-ipimIndigoLight/20" :
                                    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                              )}>
                                {event.type}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-ipimBlack dark:text-white group-hover:text-ipimGreen transition-colors duration-200 mb-2">
                              {event.title}
                            </h3>

                            {event.description && (
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                {event.description}
                              </p>
                            )}

                            {event.location && (
                              <div className="flex items-center text-xs font-medium text-gray-400 dark:text-gray-500 mt-auto pt-2">
                                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                {event.location}
                              </div>
                            )}
                          </div>

                          {/* Action Icon (Visual affordance) */}
                          <div className="hidden tablet:flex w-16 items-center justify-center text-gray-300 dark:text-gray-600 group-hover:text-ipimGreen group-hover:translate-x-1 transition-all duration-300">
                            <ChevronRight className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-24 bg-white dark:bg-ipimBorderDark rounded-3xl shadow-sm border border-dashed border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-500">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 mb-4">
                  <CalendarDays className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhuma programação encontrada</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-2">
                  Não há eventos agendados para o mês selecionado. Tente escolher outro período.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
