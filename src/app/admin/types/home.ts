import {User} from "@/app/admin/types/user";
import {BoatSlip} from "@/app/admin/types/boatSlip";

export interface Home {
  id: number
  address_line_1: string
  address_line_2: string | null
  city: string
  state: string
  zip_code: string
  createdAt: string
  updatedAt: string
  residents?: User[]
  boat_slips?: BoatSlip[]
}
