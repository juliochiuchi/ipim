import { supabase } from "@/utils/supabase";

export const authService = {
  async getUser() {
    return await supabase.auth.getUser();
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async signInWithOtp(email: string, redirectTo: string) {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
  },
};
