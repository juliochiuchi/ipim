import { format, getMonth, isSunday, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

import type { AgeRange, AttendanceDateGroup, ChurchAttendance } from "@/types/church-attendance"

const CHART_COLORS = [
  "#009683",
  "#22c55e",
  "#f59e0b",
  "#3b82f6",
  "#a855f7",
  "#ef4444",
  "#14b8a6",
  "#f97316",
]

export function getMonthLabel(date: Date) {
  return format(date, "MMMM", { locale: ptBR })
}

export function getWeekdayLabel(date: Date) {
  const label = format(date, "EEEE", { locale: ptBR })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function getSundayOrdinal(date: Date) {
  if (!isSunday(date)) return null

  return Math.floor((date.getDate() - 1) / 7) + 1
}

export function getSundayOrdinalLabel(ordinal: number | null) {
  if (!ordinal) return null

  const labels: Record<number, string> = {
    1: "Primeiro domingo",
    2: "Segundo domingo",
    3: "Terceiro domingo",
    4: "Quarto domingo",
    5: "Quinto domingo",
  }

  return labels[ordinal] ?? `${ordinal}º domingo`
}

export function buildAttendanceGroups(records: ChurchAttendance[]) {
  const groupedMap = new Map<string, AttendanceDateGroup>()

  const sortedRecords = [...records].sort((left, right) => {
    return parseISO(left.date).getTime() - parseISO(right.date).getTime()
  })

  sortedRecords.forEach((record) => {
    const date = parseISO(record.date)
    const key = record.date

    if (!groupedMap.has(key)) {
      const sundayOrdinal = getSundayOrdinal(date)

      groupedMap.set(key, {
        date: record.date,
        year: record.year,
        month: record.month,
        monthIndex: getMonth(date),
        monthLabel: getMonthLabel(date),
        weekdayLabel: getWeekdayLabel(date),
        totalQuantity: 0,
        isSunday: isSunday(date),
        sundayOrdinal,
        items: [],
      })
    }

    const group = groupedMap.get(key)

    if (!group) return

    group.items.push(record)
    group.totalQuantity += Number(record.quantity) || 0
    group.items.sort((left, right) => {
      const leftLabel = left.age_range_item?.description ?? ""
      const rightLabel = right.age_range_item?.description ?? ""

      return leftLabel.localeCompare(rightLabel, "pt-BR")
    })
  })

  return Array.from(groupedMap.values())
}

export function getYearOptions(availableYears: string[]) {
  const currentYear = new Date().getFullYear()
  const years = new Set<string>([
    String(currentYear - 1),
    String(currentYear),
    String(currentYear + 1),
    ...availableYears,
  ])

  return Array.from(years).sort((left, right) => Number(left) - Number(right))
}

export function buildAgeRangeColorMap(ageRanges: AgeRange[]) {
  return ageRanges.reduce<Record<string, string>>((accumulator, ageRange, index) => {
    accumulator[ageRange.id] = CHART_COLORS[index % CHART_COLORS.length]
    return accumulator
  }, {})
}

export function buildDonutChartData(record: AttendanceDateGroup, colorsByAgeRange: Record<string, string>) {
  return record.items.map((item) => ({
    id: item.id,
    name: item.age_range_item?.description ?? "Faixa etária",
    value: Number(item.quantity) || 0,
    fill: colorsByAgeRange[item.age_range] ?? CHART_COLORS[0],
  }))
}

export function buildAnnualBarChartData(
  records: ChurchAttendance[],
  ageRanges: AgeRange[],
  selectedYear: string,
) {
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Number(selectedYear), index, 1)
    return {
      monthKey: String(index),
      monthLabel: format(date, "MMM", { locale: ptBR }),
    }
  })

  return months.map(({ monthLabel }, index) => {
    const record = ageRanges.reduce<Record<string, string | number>>(
      (accumulator, ageRange) => {
        accumulator[ageRange.id] = 0
        return accumulator
      },
      { month: monthLabel },
    )

    records.forEach((item) => {
      const itemDate = parseISO(item.date)
      const itemMonthIndex = getMonth(itemDate)

      if (itemMonthIndex !== index) return

      record[item.age_range] = Number(record[item.age_range] ?? 0) + (Number(item.quantity) || 0)
    })

    return record
  })
}

export function getAttendanceMonthYearLabel(record: AttendanceDateGroup) {
  const label = `${record.monthLabel} de ${record.year}`
  return label.charAt(0).toUpperCase() + label.slice(1)
}
