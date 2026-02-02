import { Home } from "@/app/admin/types/home"

export interface BoatSlip {
  id: number
  home_id: number | null
  stall_number: number
  lat: string | null
  lng: string | null
  createdAt: string
  updatedAt: string
  home?: Home | null
}
