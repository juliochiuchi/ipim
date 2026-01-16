export interface EventCategory {
  id: string
  name: string
  description?: string | null
  color?: string | null
  created_at: string
}

export interface Event {
  id: string
  title: string
  description?: string | null
  category_id?: string | null
  start_date: string
  end_date?: string | null
  start_time?: string | null
  end_time?: string | null
  location?: string | null
  is_active: boolean
  created_at: string
  updated_at: string

  // Relations
  event_categories?: EventCategory | null
}
