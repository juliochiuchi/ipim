import { supabase } from "@/utils/supabase";
import type { Event } from "@/types/events";

export const eventService = {
  async getAll(page: number, itemsPerPage: number) {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    return await supabase
      .from("events")
      .select(
        `
        *,
        event_categories (
          name,
          color
        )
      `,
        { count: "exact" }
      )
      .order("start_date", { ascending: false })
      .range(from, to);
  },

  async delete(id: string) {
    return await supabase.from("events").delete().eq("id", id);
  },

  async getEventsByMonth(year: number, month: number) {
    return await supabase.rpc("get_events_by_month", {
      p_year: year,
      p_month: month,
    });
  },

  async create(payload: Partial<Event>) {
    return await supabase.from("events").insert([payload]);
  },

  async update(id: string, payload: Partial<Event>) {
    return await supabase.from("events").update(payload).eq("id", id);
  },
};
