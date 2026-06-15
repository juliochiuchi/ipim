import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseKey)

if (!hasSupabaseConfig) {
  console.warn(
    "Supabase não configurado. Preencha VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env."
  )
}

export const supabase = createClient(
  hasSupabaseConfig ? supabaseUrl : "https://placeholder.supabase.co",
  hasSupabaseConfig
    ? supabaseKey
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.temporary-signature",
  {
    auth: {
      autoRefreshToken: hasSupabaseConfig,
      persistSession: hasSupabaseConfig,
      detectSessionInUrl: hasSupabaseConfig,
    },
  }
)
