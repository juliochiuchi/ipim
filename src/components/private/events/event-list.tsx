import { useCallback, useEffect, useState } from "react"
import { format } from "date-fns"
import { Edit2, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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

export function EventList({ onEdit, keyRefresh }: EventListProps) {
  const [programations, setProgramations] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchProgramations = useCallback(async () => {
    setIsLoading(true)

    try {
      // Get data and count
      const { data, error, count } = await eventService.getAll(page, ITEMS_PER_PAGE)

      if (error) throw error

      setProgramations(data || [])
      setTotalCount(count || 0)
    } catch (error) {
      console.error("Erro ao buscar programações:", error)
      toast.error("Erro ao carregar lista de programações")
    } finally {
      setIsLoading(false)
    }
  }, [page])

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
      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.event_categories?.name || "-"}
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.start_date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {item.start_time ? item.start_time.slice(0, 5) : "-"}
                  </TableCell>
                  <TableCell>{item.location || "-"}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.is_active
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
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
                        <AlertDialogContent className="rounded-lg">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Programação</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir "{item.title}"? Esta ação não pode ser desfeita.
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
        <div className="flex items-center justify-end space-x-2 py-4">
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
