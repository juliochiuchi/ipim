import { supabase } from "@/utils/supabase";

export const userService = {
  async checkEmail(email: string) {
    return await supabase
      .from("users_mails")
      .select("email")
      .eq("email", email)
      .single();
  },
};
