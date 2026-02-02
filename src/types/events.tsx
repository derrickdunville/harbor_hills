export interface Event {
  id: number
  title: string
  description?: string | null
  start_time?: string | null
  end_time?: string | null
  location?: string | null
  createdAt?: string
  updatedAt?: string
}
