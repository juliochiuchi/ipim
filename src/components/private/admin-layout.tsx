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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ipimWhiteSnow via-background to-background dark:from-[#0b0b0d] dark:via-[#0b0b0d] dark:to-black">
      <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100 dark:bg-[radial-gradient(900px_circle_at_20%_0%,rgba(0,150,131,0.18),transparent_50%),radial-gradient(700px_circle_at_80%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="relative z-10 flex">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} items={items} />

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55 dark:border-white/10 dark:bg-[#0f1012]/70 supports-[backdrop-filter]:dark:bg-[#0f1012]/55">
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
                <div className="hidden tablet:flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground dark:border-white/10 dark:bg-white/5">
                  <User className="h-4 w-4 text-muted-foreground dark:text-white/60" />
                  <span className="max-w-[260px] truncate">{userEmail ?? "Usuário não identificado"}</span>
                </div>
                {onLogout && (
                  <Button
                    variant="outline"
                    onClick={onLogout}
                    className="bg-transparent text-white border border-white/15 hover:border-rose-400/40 hover:text-rose-400 hover:bg-rose-500/10"
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
