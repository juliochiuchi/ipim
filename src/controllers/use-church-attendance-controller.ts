import { useCallback, useEffect, useMemo, useState } from "react"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

import { ageRangeService } from "@/services/age-range.service"
import { churchAttendanceService } from "@/services/church-attendance.service"
import type { AgeRange, ChurchAttendance } from "@/types/church-attendance"
import {
  buildAgeRangeColorMap,
  buildAnnualBarChartData,
  buildAttendanceGroups,
  buildDonutChartData,
  getYearOptions,
} from "@/utils/church-attendance"

type SaveAttendanceInput = {
  id?: string
  ageRangeId: string
  quantity: number
  date: Date
}

export function useChurchAttendanceController() {
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([])
  const [availableYears, setAvailableYears] = useState<string[]>([])
  const [records, setRecords] = useState<ChurchAttendance[]>([])
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()))
  const [selectedRecordDate, setSelectedRecordDate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadRecords = useCallback(async (year: string) => {
    const { data, error } = await churchAttendanceService.getByYear(year)

    if (error) throw error

    setRecords((data ?? []) as ChurchAttendance[])
  }, [])

  const loadInitialData = useCallback(async () => {
    setIsLoading(true)

    try {
      const [
        { data: ageRangesData, error: ageRangeError },
        { data: availableYearsData, error: availableYearsError },
      ] = await Promise.all([
        ageRangeService.getAll(),
        churchAttendanceService.getAvailableYears(),
        loadRecords(selectedYear),
      ])

      if (ageRangeError) throw ageRangeError
      if (availableYearsError) throw availableYearsError

      setAgeRanges(ageRangesData ?? [])
      setAvailableYears(
        Array.from(new Set((availableYearsData ?? []).map((item) => item.year).filter(Boolean))),
      )
    } catch (error) {
      console.error("Erro ao carregar dados de presença:", error)
      toast.error("Erro ao carregar os dados de presença")
    } finally {
      setIsLoading(false)
    }
  }, [loadRecords, selectedYear])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  const groupedRecords = useMemo(() => buildAttendanceGroups(records), [records])
  const selectedRecord = useMemo(
    () => groupedRecords.find((group) => group.date === selectedRecordDate) ?? null,
    [groupedRecords, selectedRecordDate],
  )
  const colorsByAgeRange = useMemo(() => buildAgeRangeColorMap(ageRanges), [ageRanges])
  const donutChartData = useMemo(
    () => (selectedRecord ? buildDonutChartData(selectedRecord, colorsByAgeRange) : []),
    [colorsByAgeRange, selectedRecord],
  )
  const annualChartData = useMemo(
    () => buildAnnualBarChartData(records, ageRanges, selectedYear),
    [ageRanges, records, selectedYear],
  )
  const yearOptions = useMemo(() => getYearOptions(availableYears), [availableYears])

  const refreshByYear = useCallback(
    async (year: string) => {
      setIsLoading(true)
      try {
        await loadRecords(year)
      } catch (error) {
        console.error("Erro ao carregar presenças:", error)
        toast.error("Erro ao atualizar a listagem de presença")
      } finally {
        setIsLoading(false)
      }
    },
    [loadRecords],
  )

  const handleYearChange = useCallback(
    async (year: string) => {
      setSelectedYear(year)
      setSelectedRecordDate(null)
      await refreshByYear(year)
    },
    [refreshByYear],
  )

  const saveAttendance = useCallback(
    async ({ id, ageRangeId, quantity, date }: SaveAttendanceInput) => {
      setIsSaving(true)

      const derivedYear = format(date, "yyyy")
      const monthLabel = format(date, "MMMM", { locale: ptBR })
      const payload = {
        age_range: ageRangeId,
        quantity,
        date: format(date, "yyyy-MM-dd"),
        year: derivedYear,
        month: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
      }

      try {
        if (id) {
          const { error } = await churchAttendanceService.update(id, payload)

          if (error) throw error

          toast.success("Registro de presença atualizado com sucesso")
        } else {
          const { error } = await churchAttendanceService.create(payload)

          if (error) throw error

          toast.success("Registro de presença cadastrado com sucesso")
        }

        setSelectedYear(derivedYear)
        setAvailableYears((current) => (current.includes(derivedYear) ? current : [...current, derivedYear]))
        await refreshByYear(derivedYear)
      } catch (error) {
        console.error("Erro ao salvar presença:", error)
        toast.error("Erro ao salvar registro de presença")
        throw error
      } finally {
        setIsSaving(false)
      }
    },
    [refreshByYear],
  )

  const deleteAttendance = useCallback(
    async (id: string) => {
      setDeletingId(id)

      try {
        const { error } = await churchAttendanceService.delete(id)

        if (error) throw error

        toast.success("Registro de presença excluído com sucesso")
        await refreshByYear(selectedYear)
      } catch (error) {
        console.error("Erro ao excluir presença:", error)
        toast.error("Erro ao excluir registro de presença")
      } finally {
        setDeletingId(null)
      }
    },
    [refreshByYear, selectedYear],
  )

  const openDetails = useCallback((date: string) => {
    setSelectedRecordDate(date)
  }, [])

  const closeDetails = useCallback(() => {
    setSelectedRecordDate(null)
  }, [])

  const selectedRecordLabel = selectedRecord
    ? format(parseISO(selectedRecord.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : null

  return {
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
    selectedRecordLabel,
    selectedYear,
    yearOptions,
  }
}
