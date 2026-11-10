import { supabase } from "@/utils/supabase";
import type { EventCategory } from "@/types/events";

type GetPaginatedCategoriesParams = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

export const categoryService = {
  async getAll() {
    return await supabase.from("event_categories").select("*").order("name");
  },

  async getPaginated({ page, itemsPerPage, name }: GetPaginatedCategoriesParams) {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("event_categories")
      .select("*", { count: "exact" })
      .order("name", { ascending: true });

    const trimmedName = name?.trim();
    if (trimmedName) {
      query = query.ilike("name", `%${trimmedName}%`);
    }

    return await query.range(from, to);
  },

  async create(payload: Partial<EventCategory>) {
    return await supabase.from("event_categories").insert([payload]);
  },

  async update(id: string, payload: Partial<EventCategory>) {
    return await supabase.from("event_categories").update(payload).eq("id", id);
  },

  async delete(id: string) {
    return await supabase.from("event_categories").delete().eq("id", id);
  },
};
