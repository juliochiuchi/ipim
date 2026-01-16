import { supabase } from "@/utils/supabase";

export const categoryService = {
  async getAll() {
    return await supabase.from("event_categories").select("*").order("name");
  },
};
