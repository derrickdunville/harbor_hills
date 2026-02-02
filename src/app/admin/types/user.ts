import { Home } from "@/app/admin/types/home"
import { Role } from "@/app/admin/types/role"

export interface User {
  id: number
  username: string
  email: string
  home_id: number | null
  createdAt: string
  updatedAt: string
  roles?: Role[]
  home?: Home | null
}
