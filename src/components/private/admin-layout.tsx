import { useState } from "react"
import type { ReactNode } from "react"
import { useLocation } from "@tanstack/react-router"
import { AdminSidebar } from "./admin-sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Cog, Palette, LogOut, User } from "lucide-react"

type AdminLayoutProps = {
  title?: string
  userEmail?: string | null
  onLogout?: () => void
  children: ReactNode
}

export function AdminLayout({ title, userEmail, onLogout, children }: AdminLayoutProps) {
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

  const activeItem = items.find((item) => item.active)
  const pageTitle = title ?? activeItem?.label ?? "Dashboard"

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} items={items} />

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b bg-white/80 dark:bg-ipimBgDark/80 backdrop-blur">
            <div
              className={cn(
                "flex items-center justify-between phone:py-4 laptop:py-6",
                collapsed ? "phone:px-4 tablet:px-8" : "phone:px-2 tablet:px-10",
              )}
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Usuário conectado
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="h-4 w-4" />
                  <span>{userEmail ?? "Usuário não identificado"}</span>
                </div>
              </div>
              {onLogout && (
                <Button
                  variant="outline"
                  onClick={onLogout}
                  className="border-destructive text-destructive bg-transparent hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              )}
            </div>
          </header>

          <div
            className={cn(
              "phone:py-6 laptop:py-8",
              collapsed ? "phone:px-4 tablet:px-8" : "phone:px-2 tablet:px-10",
            )}
          >
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
              <p className="text-sm text-muted-foreground">Acesso Administrativo da IPIM</p>
            </div>
            <div className="phone:mt-6 laptop:mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
