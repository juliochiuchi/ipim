import { useCallback, useEffect, useState } from "react"
import { format, parse } from "date-fns"
import { Edit2, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { eventService } from "@/services/event.service"
import { toast } from "sonner"
import type { Event } from "@/types/events"

interface EventListProps {
  onEdit: (programation: Event) => void
  keyRefresh: number
}

const ITEMS_PER_PAGE = 10

function useDebouncedValue<T>(value: T, delayMilliseconds: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delayMilliseconds)
    return () => clearTimeout(timeoutId)
  }, [value, delayMilliseconds])

  return debouncedValue
}

export function EventList({ onEdit, keyRefresh }: EventListProps) {
  const [programations, setProgramations] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [titleSearch, setTitleSearch] = useState("")

  const debouncedTitleSearch = useDebouncedValue(titleSearch, 350)

  const selectedMonthNumber = (() => {
    if (selectedMonth === "all") return undefined
    const monthNumber = Number(selectedMonth)
    if (!Number.isFinite(monthNumber)) return undefined
    if (monthNumber < 1 || monthNumber > 12) return undefined
    return monthNumber
  })()

  useEffect(() => {
    setPage(1)
  }, [selectedMonth, debouncedTitleSearch])

  const fetchProgramations = useCallback(async () => {
    setIsLoading(true)

    try {
      // Get data and count
      const { data, error, count } = await eventService.getAll({
        page,
        itemsPerPage: ITEMS_PER_PAGE,
        month: selectedMonthNumber,
        title: debouncedTitleSearch,
      })

      if (error) throw error

      setProgramations(data || [])
      setTotalCount(count || 0)
    } catch (error) {
      console.error("Erro ao buscar programações:", error)
      toast.error("Erro ao carregar lista de programações")
    } finally {
      setIsLoading(false)
    }
  }, [debouncedTitleSearch, page, selectedMonthNumber])

  useEffect(() => {
    fetchProgramations()
  }, [fetchProgramations, keyRefresh])

  async function handleDelete(id: string) {
    try {
      setDeletingId(id)
      const { error } = await eventService.delete(id)

      if (error) throw error

      toast.success("Programação excluída com sucesso")
      fetchProgramations()
    } catch (error) {
      console.error("Erro ao excluir:", error)
      toast.error("Erro ao excluir programação")
    } finally {
      setDeletingId(null)
    }
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/70 bg-card/70 text-card-foreground shadow-sm overflow-hidden dark:border-white/10 dark:bg-[#111214]/70">
        <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/20 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04] tablet:flex-row tablet:items-end tablet:justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold tracking-tight">Eventos cadastrados</p>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "Carregando registros..." : `${totalCount} ${totalCount === 1 ? "registro" : "registros"}`}
            </p>
          </div>
          <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="tablet:w-[180px] border-border/60 bg-background/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="1">Janeiro</SelectItem>
                <SelectItem value="2">Fevereiro</SelectItem>
                <SelectItem value="3">Março</SelectItem>
                <SelectItem value="4">Abril</SelectItem>
                <SelectItem value="5">Maio</SelectItem>
                <SelectItem value="6">Junho</SelectItem>
                <SelectItem value="7">Julho</SelectItem>
                <SelectItem value="8">Agosto</SelectItem>
                <SelectItem value="9">Setembro</SelectItem>
                <SelectItem value="10">Outubro</SelectItem>
                <SelectItem value="11">Novembro</SelectItem>
                <SelectItem value="12">Dezembro</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={titleSearch}
              placeholder="Buscar por título"
              onChange={(event) => setTitleSearch(event.target.value)}
              className="tablet:w-[260px] border-border/60 bg-background/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]"
            />
            {(selectedMonth !== "all" || titleSearch) && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedMonth("all")
                  setTitleSearch("")
                }}
              >
                Limpar
              </Button>
            )}
          </div>
        </div>
        <Table className="bg-background/30 dark:bg-white/[0.02]">
          <TableHeader className="bg-transparent">
            <TableRow className="bg-muted/30 hover:bg-muted/30 dark:bg-white/[0.04] dark:hover:bg-white/[0.04]">
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Carregando...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : programations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  Nenhuma programação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              programations.map((item) => (
                <TableRow
                  key={item.id}
                  className="odd:bg-muted/10 hover:bg-muted/25 dark:odd:bg-white/[0.02] dark:hover:bg-white/[0.06]"
                >
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.event_categories?.name || "-"}
                  </TableCell>
                  <TableCell>
                    {format(parse(item.start_date, "yyyy-MM-dd", new Date()), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {item.start_time ? item.start_time.slice(0, 5) : "-"}
                  </TableCell>
                  <TableCell>{item.location || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        item.is_active
                          ? "bg-ipimGreen/10 text-ipimGreen dark:bg-ipimGreen/15"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Programação</AlertDialogTitle>
                            <AlertDialogDescription>
                              <p>Tem certeza que deseja excluir "{item.title}"?</p>

                              <p className="font-bold mt-6">Esta ação não pode ser desfeita.</p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="text-white bg-destructive hover:bg-destructive/90"
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                            >
                              {deletingId === item.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Excluir"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && totalCount > 0 && (
        <div className="flex items-center justify-end space-x-2 py-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Página {page} de {totalPages} ({totalCount} registros)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Próxima
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
