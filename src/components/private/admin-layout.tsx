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
  const pageIcon = activeItem?.icon ?? <LayoutDashboard className="h-5 w-5" />

  return (
    <div className="min-h-screen bg-gradient-to-b from-ipimWhiteSnow via-background to-background dark:from-ipimBgDark dark:via-background dark:to-background">
      <div className="flex">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} items={items} />

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
            <div
              className={cn(
                "flex items-center justify-between phone:py-4 laptop:py-5",
                collapsed ? "phone:px-4 tablet:px-8" : "phone:px-3 tablet:px-10",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-ipimGreen/10 text-ipimGreen grid place-items-center">
                  {pageIcon}
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Área Administrativa
                  </p>
                  <p className="text-sm font-medium text-foreground">{pageTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden tablet:flex items-center gap-2 rounded-full border bg-background/70 px-3 py-2 text-sm text-foreground">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="max-w-[260px] truncate">{userEmail ?? "Usuário não identificado"}</span>
                </div>
                {onLogout && (
                  <Button
                    variant="outline"
                    onClick={onLogout}
                    className="border-destructive text-destructive bg-transparent hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden tablet:inline">Sair</span>
                  </Button>
                )}
              </div>
            </div>
          </header>

          <div
            className={cn(
              "phone:py-6 laptop:py-8",
              collapsed ? "phone:px-4 tablet:px-8" : "phone:px-3 tablet:px-10",
            )}
          >
            <div className="mx-auto w-full max-w-[1200px]">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
                <p className="text-sm text-muted-foreground">
                  Gerencie conteúdos e configurações do site da IPIM.
                </p>
              </div>
              <div className="phone:mt-6 laptop:mt-8">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
