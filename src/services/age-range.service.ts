import { supabase } from "@/utils/supabase"

export const ageRangeService = {
  async getAll() {
    return await supabase.from("age_range").select("*").order("description")
  },
}
