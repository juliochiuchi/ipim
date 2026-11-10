import { supabase } from "@/utils/supabase";
import type { Tag } from "@/types/events";

type GetPaginatedTagsParams = {
  page: number;
  itemsPerPage: number;
  name?: string;
};

export const tagService = {
  async getAll() {
    return await supabase.from("tags").select("*").order("tag_name");
  },

  async getPaginated({ page, itemsPerPage, name }: GetPaginatedTagsParams) {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("tags")
      .select("*", { count: "exact" })
      .order("tag_name", { ascending: true });

    const trimmedName = name?.trim();
    if (trimmedName) {
      query = query.ilike("tag_name", `%${trimmedName}%`);
    }

    return await query.range(from, to);
  },

  async create(payload: Partial<Tag>) {
    return await supabase.from("tags").insert([payload]);
  },

  async update(id: string, payload: Partial<Tag>) {
    return await supabase.from("tags").update(payload).eq("id", id);
  },

  async delete(id: string) {
    return await supabase.from("tags").delete().eq("id", id);
  },
};
