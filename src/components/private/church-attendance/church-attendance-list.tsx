import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Edit2, Eye, Trash2 } from "lucide-react"

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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AttendanceDateGroup, ChurchAttendance } from "@/types/church-attendance"
import { getAttendanceMonthYearLabel, getSundayOrdinalLabel } from "@/utils/church-attendance"

type ChurchAttendanceListProps = {
  deletingId: string | null
  groups: AttendanceDateGroup[]
  onDelete: (id: string) => Promise<void>
  onEdit: (item: ChurchAttendance) => void
  onViewDetails: (date: string) => void
  selectedRecordDate: string | null
}

export function ChurchAttendanceList({
  deletingId,
  groups,
  onDelete,
  onEdit,
  onViewDetails,
  selectedRecordDate,
}: ChurchAttendanceListProps) {
  if (groups.length === 0) {
    return (
      <Card className="border-border/70 bg-card/70 dark:border-white/10 dark:bg-[#111214]/70">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Nenhum registro de presença encontrado para o ano selecionado.
        </CardContent>
      </Card>
    )
  }

  const groupedByMonth = groups.reduce<Record<string, AttendanceDateGroup[]>>((accumulator, group) => {
    const key = `${group.year}-${String(group.monthIndex).padStart(2, "0")}`

    if (!accumulator[key]) {
      accumulator[key] = []
    }

    accumulator[key].push(group)
    return accumulator
  }, {})

  const sortedMonthKeys = Object.keys(groupedByMonth).sort((left, right) => left.localeCompare(right))

  return (
    <div className="space-y-6">
      {sortedMonthKeys.map((monthKey) => {
        const monthGroups = groupedByMonth[monthKey]
        const sectionTitle = getAttendanceMonthYearLabel(monthGroups[0])

        return (
          <section key={monthKey} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{sectionTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {monthGroups.length} {monthGroups.length === 1 ? "data registrada" : "datas registradas"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {monthGroups.map((group) => {
                const sundayLabel = getSundayOrdinalLabel(group.sundayOrdinal)

                return (
                  <Card
                    key={group.date}
                    className={[
                      "border-border/70 bg-card/70 transition dark:border-white/10 dark:bg-[#111214]/70",
                      selectedRecordDate === group.date ? "border-ipimGreen/40 shadow-[0_0_0_1px_rgba(0,150,131,0.16)]" : "",
                    ].join(" ")}
                  >
                    <CardHeader className="flex flex-col gap-4 border-b border-border/60 pb-5 dark:border-white/10 tablet:flex-row tablet:items-start tablet:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-xl">
                            {format(parseISO(group.date), "dd 'de' MMMM", { locale: ptBR })}
                          </CardTitle>
                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground dark:bg-white/10">
                            {group.weekdayLabel}
                          </span>
                          {sundayLabel ? (
                            <span className="rounded-full bg-ipimGreen/12 px-2.5 py-1 text-xs font-medium text-ipimGreen dark:bg-ipimGreen/15">
                              {sundayLabel}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total registrado no dia: <span className="font-semibold text-foreground">{group.totalQuantity}</span>
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="tablet:self-start"
                        onClick={() => onViewDetails(group.date)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver gráfico
                      </Button>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-5">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/45 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03] tablet:flex-row tablet:items-center tablet:justify-between"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{item.age_range_item?.description ?? "Faixa etária"}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantidade: <span className="font-semibold text-foreground">{item.quantity}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button type="button" variant="ghost" size="icon" onClick={() => onEdit(item)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Excluir registro de presença</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Você está prestes a remover o lançamento de{" "}
                                    <strong>{item.age_range_item?.description ?? "faixa etária"}</strong> do dia{" "}
                                    <strong>{format(parseISO(item.date), "dd/MM/yyyy")}</strong>.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive text-white hover:bg-destructive/90"
                                    onClick={() => onDelete(item.id)}
                                    disabled={deletingId === item.id}
                                  >
                                    {deletingId === item.id ? "Excluindo..." : "Excluir"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
