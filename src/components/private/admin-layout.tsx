import { useState } from "react"
import type { ReactNode } from "react"
import { useLocation } from "@tanstack/react-router"
import { AdminSidebar } from "./admin-sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Cog, Palette } from "lucide-react"

type AdminLayoutProps = {
  title?: string
  userEmail?: string | null
  onLogout?: () => void
  children: ReactNode
}

export function AdminLayout({ title = "Dashboard", userEmail, onLogout, children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const items = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: location.pathname === "/dashboard",
    },
    {
      label: "Eventos",
      to: "/events",
      icon: <Calendar className="h-5 w-5" />,
      active: location.pathname === "/events",
    },
    { label: "Configurações", icon: <Cog className="h-5 w-5" />, disabled: true },
    { label: "Estilo do Site", icon: <Palette className="h-5 w-5" />, disabled: true },
    { label: "Conteúdos", disabled: true },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex">
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          items={items}
        />

        <main className={cn("flex-1", collapsed ? "phone:px-4 tablet:px-8" : "phone:px-2 tablet:px-10")}>
          <div className="phone:py-6 laptop:py-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-sm text-muted-foreground">
                  {userEmail ? `Bem-vindo, ${userEmail}` : "Acesso Administrativo da IPIM"}
                </p>
              </div>
              {onLogout && (
                <Button variant="destructive" onClick={onLogout}>
                  Sair
                </Button>
              )}
            </div>
            <div className="phone:mt-6 laptop:mt-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
