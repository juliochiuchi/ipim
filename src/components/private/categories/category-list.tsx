import { useCallback, useEffect, useState } from "react"
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
import { Input } from "@/components/ui/input"
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
import { categoryService } from "@/services/category.service"
import { toast } from "sonner"
import type { EventCategory } from "@/types/events"

interface CategoryListProps {
  onEdit: (category: EventCategory) => void
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

export function CategoryList({ onEdit, keyRefresh }: CategoryListProps) {
  const [categories, setCategories] = useState<EventCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [nameSearch, setNameSearch] = useState("")

  const debouncedNameSearch = useDebouncedValue(nameSearch, 350)

  useEffect(() => {
    setPage(1)
  }, [debouncedNameSearch])

  const fetchCategories = useCallback(async () => {
    setIsLoading(true)

    try {
      const { data, error, count } = await categoryService.getPaginated({
        page,
        itemsPerPage: ITEMS_PER_PAGE,
        name: debouncedNameSearch,
      })

      if (error) throw error

      setCategories(data || [])
      setTotalCount(count || 0)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      toast.error("Erro ao carregar lista de categorias")
    } finally {
      setIsLoading(false)
    }
  }, [debouncedNameSearch, page])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories, keyRefresh])

  async function handleDelete(id: string) {
    try {
      setDeletingId(id)
      const { error } = await categoryService.delete(id)

      if (error) throw error

      toast.success("Categoria excluída com sucesso")
      fetchCategories()
    } catch (error) {
      console.error("Erro ao excluir:", error)
      toast.error("Erro ao excluir categoria")
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
            <p className="text-sm font-semibold tracking-tight">Categorias cadastradas</p>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "Carregando registros..." : `${totalCount} ${totalCount === 1 ? "registro" : "registros"}`}
            </p>
          </div>
          <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center">
            <Input
              type="text"
              value={nameSearch}
              placeholder="Buscar por nome"
              onChange={(event) => setNameSearch(event.target.value)}
              className="tablet:w-[260px] border-border/60 bg-background/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]"
            />
            {nameSearch && (
              <Button type="button" variant="outline" size="sm" onClick={() => setNameSearch("")}>
                Limpar
              </Button>
            )}
          </div>
        </div>
        <Table className="bg-background/30 dark:bg-white/[0.02]">
          <TableHeader className="bg-transparent">
            <TableRow className="bg-muted/30 hover:bg-muted/30 dark:bg-white/[0.04] dark:hover:bg-white/[0.04]">
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Carregando...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((item) => (
                <TableRow
                  key={item.id}
                  className="odd:bg-muted/10 hover:bg-muted/25 dark:odd:bg-white/[0.02] dark:hover:bg-white/[0.06]"
                >
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.description || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full border border-border/70 dark:border-white/10"
                        style={{ backgroundColor: item.color || "#d4d4d8" }}
                      />
                      <span className="text-xs uppercase text-muted-foreground">{item.color || "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
                            <AlertDialogDescription>
                              <p>Tem certeza que deseja excluir "{item.name}"?</p>

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
