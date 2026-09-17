export interface AgeRange {
  id: string
  description: string
  created_at: string
}

export interface ChurchAttendance {
  id: string
  age_range: string
  quantity: number
  date: string
  year: string
  month: string
  created_at: string
  age_range_item?: AgeRange | null
}

export interface AttendanceDateGroup {
  date: string
  year: string
  month: string
  monthIndex: number
  monthLabel: string
  weekdayLabel: string
  totalQuantity: number
  isSunday: boolean
  sundayOrdinal: number | null
  items: ChurchAttendance[]
}
