import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

import { AttendanceDonutActiveChart } from "@/components/charts/attendance-donut-active-chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { AttendanceDateGroup } from "@/types/church-attendance"
import { getSundayOrdinalLabel } from "@/utils/church-attendance"

type DonutChartDatum = {
  id: string
  name: string
  value: number
  fill: string
}

type ChurchAttendanceDetailDialogProps = {
  chartData: DonutChartDatum[]
  onOpenChange: (isOpen: boolean) => void
  open: boolean
  record: AttendanceDateGroup | null
}

export function ChurchAttendanceDetailDialog({
  chartData,
  onOpenChange,
  open,
  record,
}: ChurchAttendanceDetailDialogProps) {
  const sundayLabel = getSundayOrdinalLabel(record?.sundayOrdinal ?? null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto custom-scrollbar">
        {record ? (
          <>
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle>Detalhes da presença</DialogTitle>
              <DialogDescription>
                {format(parseISO(record.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                {sundayLabel ? ` • ${sundayLabel}` : ""}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 tablet:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-background/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Total do dia
                </p>
                <p className="mt-3 text-3xl font-semibold">{record.totalQuantity}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Faixas cadastradas
                </p>
                <p className="mt-3 text-3xl font-semibold">{record.items.length}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Dia da semana
                </p>
                <p className="mt-3 text-xl font-semibold">{record.weekdayLabel}</p>
              </div>
            </div>

            <AttendanceDonutActiveChart
              data={chartData}
              description="Distribuição das quantidades registradas na data selecionada."
            />
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
