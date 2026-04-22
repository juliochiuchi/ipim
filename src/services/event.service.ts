import { supabase } from "@/utils/supabase";
import type { Event } from "@/types/events";

type GetAllEventsParams = {
  page: number;
  itemsPerPage: number;
  month?: number;
  title?: string;
};

export const eventService = {
  async getAll({ page, itemsPerPage, month, title }: GetAllEventsParams) {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
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
      .order("start_date", { ascending: false });

    if (month) {
      const selectedYear = new Date().getFullYear();
      const monthAsTwoDigits = String(month).padStart(2, "0");
      const currentMonthStart = `${selectedYear}-${monthAsTwoDigits}-01`;

      const nextMonth = month === 12 ? 1 : month + 1;
      const nextMonthAsTwoDigits = String(nextMonth).padStart(2, "0");
      const nextMonthYear = month === 12 ? selectedYear + 1 : selectedYear;
      const nextMonthStart = `${nextMonthYear}-${nextMonthAsTwoDigits}-01`;

      query = query.gte("start_date", currentMonthStart).lt("start_date", nextMonthStart);
    }

    const trimmedTitle = title?.trim();
    if (trimmedTitle) {
      query = query.ilike("title", `%${trimmedTitle}%`);
    }

    return await query.range(from, to);
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
