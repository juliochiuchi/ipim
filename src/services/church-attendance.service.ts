import { supabase } from "@/utils/supabase"

import type { ChurchAttendance } from "@/types/church-attendance"

type SaveChurchAttendancePayload = Pick<
  ChurchAttendance,
  "age_range" | "quantity" | "date" | "year" | "month"
>

export const churchAttendanceService = {
  async getAvailableYears() {
    return await supabase
      .from("church_attendance")
      .select("year")
      .order("year", { ascending: true })
  },

  async getByYear(year: string) {
    return await supabase
      .from("church_attendance")
      .select(
        `
          *,
          age_range_item:age_range (
            id,
            description,
            created_at
          )
        `,
      )
      .eq("year", year)
      .order("date", { ascending: true })
      .order("created_at", { ascending: true })
  },

  async create(payload: SaveChurchAttendancePayload) {
    return await supabase.from("church_attendance").insert([payload])
  },

  async update(id: string, payload: SaveChurchAttendancePayload) {
    return await supabase.from("church_attendance").update(payload).eq("id", id)
  },

  async delete(id: string) {
    return await supabase.from("church_attendance").delete().eq("id", id)
  },
}
