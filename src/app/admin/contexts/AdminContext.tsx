"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface AdminContextType {
  isMobileOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev)
  const closeMobileMenu = () => setIsMobileOpen(false)

  return (
    <AdminContext.Provider value={{ isMobileOpen, toggleMobileMenu, closeMobileMenu }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) throw new Error("useAdmin must be used within AdminProvider")
  return context
}