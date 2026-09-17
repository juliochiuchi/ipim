import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { CalendarRange, Plus, Users } from "lucide-react"

import { AttendanceBarLabelChart } from "@/components/charts/attendance-bar-label-chart"
import { ChurchAttendanceDetailDialog } from "@/components/private/church-attendance/church-attendance-detail-dialog"
import { ChurchAttendanceForm } from "@/components/private/church-attendance/church-attendance-form"
import { ChurchAttendanceList } from "@/components/private/church-attendance/church-attendance-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useChurchAttendanceController } from "@/controllers/use-church-attendance-controller"
import type { ChurchAttendance } from "@/types/church-attendance"

export const Route = createFileRoute("/_private/attendance-control")({
  component: AttendanceControlPage,
})

function AttendanceControlPage() {
  const [editingItem, setEditingItem] = useState<ChurchAttendance | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const {
    ageRanges,
    annualChartData,
    closeDetails,
    colorsByAgeRange,
    deleteAttendance,
    deletingId,
    donutChartData,
    groupedRecords,
    handleYearChange,
    isLoading,
    isSaving,
    openDetails,
    saveAttendance,
    selectedRecord,
    selectedRecordDate,
    selectedYear,
    yearOptions,
  } = useChurchAttendanceController()

  const totalEntries = groupedRecords.reduce((accumulator, group) => accumulator + group.items.length, 0)
  const totalPeople = groupedRecords.reduce((accumulator, group) => accumulator + group.totalQuantity, 0)

  async function handleFormSubmit(values: { date: Date; age_range: string; quantity: number }) {
    await saveAttendance({
      id: editingItem?.id,
      ageRangeId: values.age_range,
      date: values.date,
      quantity: values.quantity,
    })

    setIsFormOpen(false)
    setEditingItem(null)
  }

  const handleCreate = () => {
    setEditingItem(null)
    setIsFormOpen(true)
  }

  const handleEdit = (item: ChurchAttendance) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsFormOpen(isOpen)

    if (!isOpen) {
      setEditingItem(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm dark:border-white/10 dark:bg-[#111214]/70 laptop:flex-row laptop:items-center laptop:justify-between">
        <div className="space-y-1.5">
          <p className="text-sm font-medium">Registre, acompanhe e compare a presença por faixa etária.</p>
          <p className="text-sm text-muted-foreground">
            A listagem fica organizada por mês e ano, enquanto os gráficos apoiam a leitura rápida do histórico.
          </p>
        </div>

        <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center">
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="tablet:w-[160px] border-border/60 bg-background/60 dark:border-white/10 dark:bg-white/[0.03]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleCreate} className="bg-ipimGreen text-white hover:bg-ipimGreenHover">
            <Plus className="mr-2 h-4 w-4" />
            Novo Registro
          </Button>
        </div>
      </div>

      <div className="grid gap-4 tablet:grid-cols-3">
        <Card className="border-border/70 bg-card/70 dark:border-white/10 dark:bg-[#111214]/70">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ipimGreen/12 text-ipimGreen">
              <CalendarRange className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Datas registradas</p>
              <p className="text-2xl font-semibold">{isLoading ? "--" : groupedRecords.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 dark:border-white/10 dark:bg-[#111214]/70">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ipimGreen/12 text-ipimGreen">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lançamentos no ano</p>
              <p className="text-2xl font-semibold">{isLoading ? "--" : totalEntries}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 dark:border-white/10 dark:bg-[#111214]/70">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ipimGreen/12 text-ipimGreen">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total acumulado</p>
              <p className="text-2xl font-semibold">{isLoading ? "--" : totalPeople}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <AttendanceBarLabelChart
        ageRanges={ageRanges}
        colorsByAgeRange={colorsByAgeRange}
        data={annualChartData}
        selectedYear={selectedYear}
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-40 rounded-3xl" />
          <Skeleton className="h-40 rounded-3xl" />
        </div>
      ) : (
        <ChurchAttendanceList
          deletingId={deletingId}
          groups={groupedRecords}
          onDelete={deleteAttendance}
          onEdit={handleEdit}
          onViewDetails={openDetails}
          selectedRecordDate={selectedRecordDate}
        />
      )}

      <Dialog open={isFormOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto custom-scrollbar">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle>{editingItem ? "Editar presença" : "Novo registro de presença"}</DialogTitle>
            <DialogDescription>
              Selecione a data, a faixa etária e a quantidade. O ano e o mês serão derivados automaticamente da data informada.
            </DialogDescription>
          </DialogHeader>

          <ChurchAttendanceForm
            ageRanges={ageRanges}
            initialData={editingItem}
            isSaving={isSaving}
            onCancel={() => handleDialogOpenChange(false)}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>

      <ChurchAttendanceDetailDialog
        chartData={donutChartData}
        onOpenChange={(isOpen) => {
          if (!isOpen) closeDetails()
        }}
        open={Boolean(selectedRecord)}
        record={selectedRecord}
      />
    </div>
  )
}
